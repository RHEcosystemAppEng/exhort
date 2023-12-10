/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.redhat.exhort.integration.trustedcontent;

import static com.redhat.exhort.integration.trustedcontent.TcResponseHandlerTest.REDHAT_REPOSITORY_SUFFIX;
import static org.junit.jupiter.api.Assertions.*;

import java.util.*;

import org.apache.camel.*;
import org.apache.camel.spi.*;
import org.apache.camel.support.DefaultExchange;
import org.apache.camel.support.DefaultMessage;
import org.apache.camel.support.jsse.SSLContextParameters;
import org.apache.camel.vault.VaultConfiguration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.v4.*;

class TcResponseAggregationTest {

  private AnalysisReport analysisReport;

  private Map<String, String> recommendations;

  @BeforeEach
  void setUp() {

    this.analysisReport = new AnalysisReport();

    ProviderReport dummyProviderReport = new ProviderReport();
    Map<String, ProviderReport> providers = new HashMap<>();

    Source dummySource = new Source();
    Map<String, Source> sources = new HashMap<>();
    DependencyReport dependency = buildDependency("pkg:mgr/io.group/packagename@1.0.0", 1);
    DependencyReport dependency2 = buildDependency("pkg:mgr/io.group/packagename2@1.1.1", 3);
    DependencyReport dependency3 = buildDependency("pkg:mgr/io.group/packagename3@1.1.2", 4);
    DependencyReport dependency4 = buildDependency("pkg:mgr/io.group/packagename4@2.0.5", 2);
    //        dummySource.setDependencies(List.of(dependency, dependency2, dependency3,
    // dependency4).stream().toList());
    ArrayList<DependencyReport> dependenciesReports = new ArrayList<>();
    dependenciesReports.addAll(List.of(dependency, dependency2, dependency3, dependency4));
    dummySource.setDependencies(dependenciesReports);
    dummySource.setSummary(
        new SourceSummary()
            .dependencies(4)
            .total(4)
            .direct(4)
            .critical(0)
            .high(1)
            .medium(2)
            .low(7)
            .recommendations(0));
    sources.put("dummy-source", dummySource);
    dummyProviderReport.setSources(sources);
    this.analysisReport.setProviders(Map.of("dummy-provider", dummyProviderReport));

    this.recommendations = new HashMap<>();
    this.recommendations.put(
        "pkg:mgr/io.group/packagename@1.0.0",
        "pkg:mgr/io.group/packagename@1.0.0-redhat-00001?" + REDHAT_REPOSITORY_SUFFIX);
    this.recommendations.put(
        "pkg:mgr/io.group/packagename2@1.1.1",
        "pkg:mgr/io.group/packagename2@1.1.1-redhat-00003?" + REDHAT_REPOSITORY_SUFFIX);
    this.recommendations.put(
        "pkg:mgr/io.group/packagename3@1.1.2",
        "pkg:mgr/io.group/packagename3@1.1.2-redhat-00004?" + REDHAT_REPOSITORY_SUFFIX);
    this.recommendations.put(
        "pkg:mgr/io.group/packagename4@2.0.5",
        "pkg:mgr/io.group/packagename4@2.0.5-redhat-00002?" + REDHAT_REPOSITORY_SUFFIX);
    this.recommendations.put(
        "pkg:mgr/io.group/nonvulnerablePackage@0.5.0",
        "pkg:mgr/io.group/nonvulnerablePackage@0.5.0-redhat-00001?" + REDHAT_REPOSITORY_SUFFIX);
  }

  private static DependencyReport buildDependency(String purlName, int numOfIssues) {
    DependencyReport dependencyReport = new DependencyReport();
    dependencyReport.setRef(new PackageRef(purlName));
    dependencyReport.setIssues(buildIssues(purlName, numOfIssues));
    return dependencyReport;
  }

  private static List<Issue> buildIssues(String packageName, int numberOfIssues) {
    ArrayList<Issue> issues = new ArrayList<>();
    for (int i = 0; i < numberOfIssues; i++) {
      issues.add(buildIssue(packageName, (float) i));
    }
    return issues;
  }

  @Test
  void Check_Integration_With_Empty_Map_Of_Recommendations() {
    TcResponseAggregation tcResponseAggregation = new TcResponseAggregation();
    Exchange originalMessage = new DefaultExchange(getDummyCamelContext());
    originalMessage.setMessage(new DefaultMessage(originalMessage));
    originalMessage.getMessage().setBody(this.analysisReport);

    Exchange newMessageWithRecommendations = new DefaultExchange(getDummyCamelContext());
    newMessageWithRecommendations.setMessage(new DefaultMessage(newMessageWithRecommendations));
    newMessageWithRecommendations.getMessage().setBody(Map.of());
    int hashCodeBefore = analysisReport.hashCode();
    Exchange aggregate =
        tcResponseAggregation.aggregate(originalMessage, newMessageWithRecommendations);

    int hashCodeAfter = aggregate.getMessage().getBody().hashCode();
    // Empty recommendations list must not touch AnalysisReport instance and let it remain the same.
    assertEquals(hashCodeBefore, hashCodeAfter);
  }

  @Test
  void Check_Integration_With_Map_Of_Recommendations() {
    TcResponseAggregation tcResponseAggregation = new TcResponseAggregation();
    Exchange originalMessage = new DefaultExchange(getDummyCamelContext());
    originalMessage.setMessage(new DefaultMessage(originalMessage));
    originalMessage.getMessage().setBody(this.analysisReport);

    Exchange newMessageWithRecommendations = new DefaultExchange(getDummyCamelContext());
    newMessageWithRecommendations.setMessage(new DefaultMessage(newMessageWithRecommendations));
    newMessageWithRecommendations.getMessage().setBody(this.recommendations);
    Exchange aggregate =
        tcResponseAggregation.aggregate(originalMessage, newMessageWithRecommendations);
    AnalysisReport result = (AnalysisReport) aggregate.getMessage().getBody();
    Source resultDummySourceRef =
        result.getProviders().get("dummy-provider").getSources().get("dummy-source");
    assertEquals(5, resultDummySourceRef.getSummary().getRecommendations());
    assertEquals(
        4,
        resultDummySourceRef.getDependencies().stream()
            .filter(dep -> dep.getIssues() != null)
            .count());
    assertEquals(
        1,
        resultDummySourceRef.getDependencies().stream()
            .filter(dep -> dep.getIssues() == null)
            .count());

    //    assertEquals();

    //    try {
    //      String s = new
    // ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(result);
    //      System.out.println(s);
    //
    //    } catch (JsonProcessingException e) {
    //      throw new RuntimeException(e);
    //    }

  }

  private static CamelContext getDummyCamelContext() {
    return new CamelContext() {
      @Override
      public ExtendedCamelContext getCamelContextExtension() {
        return null;
      }

      @Override
      public boolean isVetoStarted() {
        return false;
      }

      @Override
      public String getName() {
        return null;
      }

      @Override
      public String getDescription() {
        return null;
      }

      @Override
      public CamelContextNameStrategy getNameStrategy() {
        return null;
      }

      @Override
      public void setNameStrategy(CamelContextNameStrategy nameStrategy) {}

      @Override
      public ManagementNameStrategy getManagementNameStrategy() {
        return null;
      }

      @Override
      public void setManagementNameStrategy(ManagementNameStrategy nameStrategy) {}

      @Override
      public String getManagementName() {
        return null;
      }

      @Override
      public void setManagementName(String name) {}

      @Override
      public String getVersion() {
        return null;
      }

      @Override
      public String getUptime() {
        return null;
      }

      @Override
      public long getUptimeMillis() {
        return 0;
      }

      @Override
      public Date getStartDate() {
        return null;
      }

      @Override
      public void addService(Object object) throws Exception {}

      @Override
      public void addService(Object object, boolean stopOnShutdown) throws Exception {}

      @Override
      public void addService(Object object, boolean stopOnShutdown, boolean forceStart)
          throws Exception {}

      @Override
      public void addPrototypeService(Object object) throws Exception {}

      @Override
      public boolean removeService(Object object) throws Exception {
        return false;
      }

      @Override
      public boolean hasService(Object object) {
        return false;
      }

      @Override
      public <T> T hasService(Class<T> type) {
        return null;
      }

      @Override
      public <T> Set<T> hasServices(Class<T> type) {
        return null;
      }

      @Override
      public void deferStartService(Object object, boolean stopOnShutdown) throws Exception {}

      @Override
      public void addStartupListener(StartupListener listener) throws Exception {}

      @Override
      public void addComponent(String componentName, Component component) {}

      @Override
      public Component hasComponent(String componentName) {
        return null;
      }

      @Override
      public Component getComponent(String componentName) {
        return null;
      }

      @Override
      public Component getComponent(String name, boolean autoCreateComponents) {
        return null;
      }

      @Override
      public Component getComponent(String name, boolean autoCreateComponents, boolean autoStart) {
        return null;
      }

      @Override
      public <T extends Component> T getComponent(String name, Class<T> componentType) {
        return null;
      }

      @Override
      public Set<String> getComponentNames() {
        return null;
      }

      @Override
      public Component removeComponent(String componentName) {
        return null;
      }

      @Override
      public EndpointRegistry<? extends ValueHolder<String>> getEndpointRegistry() {
        return null;
      }

      @Override
      public Endpoint getEndpoint(String uri) {
        return null;
      }

      @Override
      public Endpoint getEndpoint(String uri, Map<String, Object> parameters) {
        return null;
      }

      @Override
      public <T extends Endpoint> T getEndpoint(String name, Class<T> endpointType) {
        return null;
      }

      @Override
      public Collection<Endpoint> getEndpoints() {
        return null;
      }

      @Override
      public Endpoint hasEndpoint(String uri) {
        return null;
      }

      @Override
      public Endpoint addEndpoint(String uri, Endpoint endpoint) throws Exception {
        return null;
      }

      @Override
      public void removeEndpoint(Endpoint endpoint) throws Exception {}

      @Override
      public Collection<Endpoint> removeEndpoints(String pattern) throws Exception {
        return null;
      }

      @Override
      public GlobalEndpointConfiguration getGlobalEndpointConfiguration() {
        return null;
      }

      @Override
      public void setRouteController(RouteController routeController) {}

      @Override
      public RouteController getRouteController() {
        return null;
      }

      @Override
      public List<Route> getRoutes() {
        return null;
      }

      @Override
      public int getRoutesSize() {
        return 0;
      }

      @Override
      public Route getRoute(String id) {
        return null;
      }

      @Override
      public Processor getProcessor(String id) {
        return null;
      }

      @Override
      public <T extends Processor> T getProcessor(String id, Class<T> type) {
        return null;
      }

      @Override
      public void addRoutes(RoutesBuilder builder) throws Exception {}

      @Override
      public void addTemplatedRoutes(RoutesBuilder builder) throws Exception {}

      @Override
      public void addRoutesConfigurations(RouteConfigurationsBuilder builder) throws Exception {}

      @Override
      public boolean removeRoute(String routeId) throws Exception {
        return false;
      }

      @Override
      public String addRouteFromTemplate(
          String routeId, String routeTemplateId, Map<String, Object> parameters) throws Exception {
        return null;
      }

      @Override
      public String addRouteFromTemplate(
          String routeId, String routeTemplateId, String prefixId, Map<String, Object> parameters)
          throws Exception {
        return null;
      }

      @Override
      public String addRouteFromTemplate(
          String routeId,
          String routeTemplateId,
          String prefixId,
          RouteTemplateContext routeTemplateContext)
          throws Exception {
        return null;
      }

      @Override
      public void removeRouteTemplates(String pattern) throws Exception {}

      @Override
      public void addRoutePolicyFactory(RoutePolicyFactory routePolicyFactory) {}

      @Override
      public List<RoutePolicyFactory> getRoutePolicyFactories() {
        return null;
      }

      @Override
      public void setRestConfiguration(RestConfiguration restConfiguration) {}

      @Override
      public RestConfiguration getRestConfiguration() {
        return null;
      }

      @Override
      public void setVaultConfiguration(VaultConfiguration vaultConfiguration) {}

      @Override
      public VaultConfiguration getVaultConfiguration() {
        return null;
      }

      @Override
      public RestRegistry getRestRegistry() {
        return null;
      }

      @Override
      public void setRestRegistry(RestRegistry restRegistry) {}

      @Override
      public TypeConverter getTypeConverter() {
        return null;
      }

      @Override
      public TypeConverterRegistry getTypeConverterRegistry() {
        return null;
      }

      @Override
      public void setTypeConverterRegistry(TypeConverterRegistry typeConverterRegistry) {}

      @Override
      public Registry getRegistry() {
        return null;
      }

      @Override
      public <T> T getRegistry(Class<T> type) {
        return null;
      }

      @Override
      public Injector getInjector() {
        return null;
      }

      @Override
      public void setInjector(Injector injector) {}

      @Override
      public List<LifecycleStrategy> getLifecycleStrategies() {
        return null;
      }

      @Override
      public void addLifecycleStrategy(LifecycleStrategy lifecycleStrategy) {}

      @Override
      public Language resolveLanguage(String language) throws NoSuchLanguageException {
        return null;
      }

      @Override
      public String resolvePropertyPlaceholders(String text) {
        return null;
      }

      @Override
      public PropertiesComponent getPropertiesComponent() {
        return null;
      }

      @Override
      public void setPropertiesComponent(PropertiesComponent propertiesComponent) {}

      @Override
      public Set<String> getLanguageNames() {
        return null;
      }

      @Override
      public ProducerTemplate createProducerTemplate() {
        return null;
      }

      @Override
      public ProducerTemplate createProducerTemplate(int maximumCacheSize) {
        return null;
      }

      @Override
      public FluentProducerTemplate createFluentProducerTemplate() {
        return null;
      }

      @Override
      public FluentProducerTemplate createFluentProducerTemplate(int maximumCacheSize) {
        return null;
      }

      @Override
      public ConsumerTemplate createConsumerTemplate() {
        return null;
      }

      @Override
      public ConsumerTemplate createConsumerTemplate(int maximumCacheSize) {
        return null;
      }

      @Override
      public DataFormat resolveDataFormat(String name) {
        return null;
      }

      @Override
      public DataFormat createDataFormat(String name) {
        return null;
      }

      @Override
      public Set<String> getDataFormatNames() {
        return null;
      }

      @Override
      public Transformer resolveTransformer(String name) {
        return null;
      }

      @Override
      public Transformer resolveTransformer(DataType from, DataType to) {
        return null;
      }

      @Override
      public TransformerRegistry getTransformerRegistry() {
        return null;
      }

      @Override
      public Validator resolveValidator(DataType type) {
        return null;
      }

      @Override
      public ValidatorRegistry getValidatorRegistry() {
        return null;
      }

      @Override
      public void setGlobalOptions(Map<String, String> globalOptions) {}

      @Override
      public Map<String, String> getGlobalOptions() {
        return null;
      }

      @Override
      public String getGlobalOption(String key) {
        return null;
      }

      @Override
      public ClassResolver getClassResolver() {
        return null;
      }

      @Override
      public void setClassResolver(ClassResolver resolver) {}

      @Override
      public ManagementStrategy getManagementStrategy() {
        return null;
      }

      @Override
      public void setManagementStrategy(ManagementStrategy strategy) {}

      @Override
      public void disableJMX() throws IllegalStateException {}

      @Override
      public InflightRepository getInflightRepository() {
        return null;
      }

      @Override
      public void setInflightRepository(InflightRepository repository) {}

      @Override
      public ClassLoader getApplicationContextClassLoader() {
        return null;
      }

      @Override
      public void setApplicationContextClassLoader(ClassLoader classLoader) {}

      @Override
      public ShutdownStrategy getShutdownStrategy() {
        return null;
      }

      @Override
      public void setShutdownStrategy(ShutdownStrategy shutdownStrategy) {}

      @Override
      public ExecutorServiceManager getExecutorServiceManager() {
        return null;
      }

      @Override
      public void setExecutorServiceManager(ExecutorServiceManager executorServiceManager) {}

      @Override
      public MessageHistoryFactory getMessageHistoryFactory() {
        return null;
      }

      @Override
      public void setMessageHistoryFactory(MessageHistoryFactory messageHistoryFactory) {}

      @Override
      public Debugger getDebugger() {
        return null;
      }

      @Override
      public void setDebugger(Debugger debugger) {}

      @Override
      public Tracer getTracer() {
        return null;
      }

      @Override
      public void setTracer(Tracer tracer) {}

      @Override
      public void setTracingStandby(boolean tracingStandby) {}

      @Override
      public boolean isTracingStandby() {
        return false;
      }

      @Override
      public void setBacklogTracingStandby(boolean backlogTracingStandby) {}

      @Override
      public boolean isBacklogTracingStandby() {
        return false;
      }

      @Override
      public void setBacklogTracingTemplates(boolean backlogTracingTemplates) {}

      @Override
      public boolean isBacklogTracingTemplates() {
        return false;
      }

      @Override
      public UuidGenerator getUuidGenerator() {
        return null;
      }

      @Override
      public void setUuidGenerator(UuidGenerator uuidGenerator) {}

      @Override
      public Boolean isLoadTypeConverters() {
        return null;
      }

      @Override
      public void setLoadTypeConverters(Boolean loadTypeConverters) {}

      @Override
      public Boolean isLoadHealthChecks() {
        return null;
      }

      @Override
      public void setLoadHealthChecks(Boolean loadHealthChecks) {}

      @Override
      public Boolean isSourceLocationEnabled() {
        return null;
      }

      @Override
      public void setSourceLocationEnabled(Boolean sourceLocationEnabled) {}

      @Override
      public Boolean isModeline() {
        return null;
      }

      @Override
      public void setModeline(Boolean modeline) {}

      @Override
      public Boolean isDevConsole() {
        return null;
      }

      @Override
      public void setDevConsole(Boolean loadDevConsoles) {}

      @Override
      public Boolean isTypeConverterStatisticsEnabled() {
        return null;
      }

      @Override
      public void setTypeConverterStatisticsEnabled(Boolean typeConverterStatisticsEnabled) {}

      @Override
      public Boolean isUseMDCLogging() {
        return null;
      }

      @Override
      public void setUseMDCLogging(Boolean useMDCLogging) {}

      @Override
      public String getMDCLoggingKeysPattern() {
        return null;
      }

      @Override
      public void setMDCLoggingKeysPattern(String pattern) {}

      @Override
      public String getTracingLoggingFormat() {
        return null;
      }

      @Override
      public void setTracingLoggingFormat(String format) {}

      @Override
      public void setTracingTemplates(boolean tracingTemplates) {}

      @Override
      public boolean isTracingTemplates() {
        return false;
      }

      @Override
      public String getDumpRoutes() {
        return null;
      }

      @Override
      public void setDumpRoutes(String format) {}

      @Override
      public Boolean isUseDataType() {
        return true;
      }

      @Override
      public void setUseDataType(Boolean useDataType) {}

      @Override
      public Boolean isUseBreadcrumb() {
        return true;
      }

      @Override
      public void setUseBreadcrumb(Boolean useBreadcrumb) {}

      @Override
      public StreamCachingStrategy getStreamCachingStrategy() {
        return null;
      }

      @Override
      public void setStreamCachingStrategy(StreamCachingStrategy streamCachingStrategy) {}

      @Override
      public RuntimeEndpointRegistry getRuntimeEndpointRegistry() {
        return null;
      }

      @Override
      public void setRuntimeEndpointRegistry(RuntimeEndpointRegistry runtimeEndpointRegistry) {}

      @Override
      public void setSSLContextParameters(SSLContextParameters sslContextParameters) {}

      @Override
      public SSLContextParameters getSSLContextParameters() {
        return null;
      }

      @Override
      public void setStartupSummaryLevel(StartupSummaryLevel startupSummaryLevel) {}

      @Override
      public StartupSummaryLevel getStartupSummaryLevel() {
        return null;
      }

      @Override
      public void start() {}

      @Override
      public void stop() {}

      @Override
      public boolean isStarted() {
        return false;
      }

      @Override
      public boolean isStarting() {
        return false;
      }

      @Override
      public boolean isStopping() {
        return false;
      }

      @Override
      public boolean isStopped() {
        return false;
      }

      @Override
      public boolean isSuspending() {
        return false;
      }

      @Override
      public boolean isSuspended() {
        return false;
      }

      @Override
      public boolean isRunAllowed() {
        return false;
      }

      @Override
      public void build() {}

      @Override
      public void init() {}

      @Override
      public void suspend() {}

      @Override
      public void resume() {}

      @Override
      public void shutdown() {}

      @Override
      public void close() throws Exception {}

      @Override
      public ServiceStatus getStatus() {
        return null;
      }

      @Override
      public void setStreamCaching(Boolean cache) {}

      @Override
      public Boolean isStreamCaching() {
        return null;
      }

      @Override
      public void setTracing(Boolean tracing) {}

      @Override
      public Boolean isTracing() {
        return null;
      }

      @Override
      public String getTracingPattern() {
        return null;
      }

      @Override
      public void setTracingPattern(String tracePattern) {}

      @Override
      public void setBacklogTracing(Boolean backlogTrace) {}

      @Override
      public Boolean isBacklogTracing() {
        return null;
      }

      @Override
      public void setDebugging(Boolean debugging) {}

      @Override
      public Boolean isDebugging() {
        return null;
      }

      @Override
      public void setMessageHistory(Boolean messageHistory) {}

      @Override
      public Boolean isMessageHistory() {
        return null;
      }

      @Override
      public void setLogMask(Boolean logMask) {}

      @Override
      public Boolean isLogMask() {
        return null;
      }

      @Override
      public void setLogExhaustedMessageBody(Boolean logExhaustedMessageBody) {}

      @Override
      public Boolean isLogExhaustedMessageBody() {
        return null;
      }

      @Override
      public void setDelayer(Long delay) {}

      @Override
      public Long getDelayer() {
        return null;
      }

      @Override
      public void setAutoStartup(Boolean autoStartup) {}

      @Override
      public Boolean isAutoStartup() {
        return null;
      }

      @Override
      public void setShutdownRoute(ShutdownRoute shutdownRoute) {}

      @Override
      public ShutdownRoute getShutdownRoute() {
        return null;
      }

      @Override
      public void setShutdownRunningTask(ShutdownRunningTask shutdownRunningTask) {}

      @Override
      public ShutdownRunningTask getShutdownRunningTask() {
        return null;
      }

      @Override
      public void setAllowUseOriginalMessage(Boolean allowUseOriginalMessage) {}

      @Override
      public Boolean isAllowUseOriginalMessage() {
        return null;
      }

      @Override
      public Boolean isCaseInsensitiveHeaders() {
        return null;
      }

      @Override
      public void setCaseInsensitiveHeaders(Boolean caseInsensitiveHeaders) {}

      @Override
      public Boolean isAutowiredEnabled() {
        return null;
      }

      @Override
      public void setAutowiredEnabled(Boolean autowiredEnabled) {}
    };
  }

  private static Issue buildIssue(String id, Float score) {
    return new Issue()
        .id(String.format("ISSUE-00-%s", id))
        .title(String.format("ISSUE Example 00-%s", id))
        .source("dummy-source")
        .severity(SeverityUtils.fromScore(score))
        .cves(List.of(String.format("CVE-00-%s", id)))
        .cvssScore(score);
  }
}
