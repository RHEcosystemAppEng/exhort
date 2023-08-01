import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Nav,
  NavItem,
  NavList,
  Page,
  PageSection,
  PageSidebar,
  PageSidebarBody,
  SkipToContent,
  Text,
  TextContent,
} from "@patternfly/react-core";
import DashboardHeader from "./DashboardHeader";
import { Command } from "./Command";

export const DashboardBreadcrumb = (
  <Breadcrumb>
    <BreadcrumbItem>Section home</BreadcrumbItem>
    <BreadcrumbItem to="#">Section title</BreadcrumbItem>
    <BreadcrumbItem to="#">Section title</BreadcrumbItem>
    <BreadcrumbItem to="#" isActive>
      Section landing
    </BreadcrumbItem>
  </Breadcrumb>
);

export const PageTemplateTitle = (
  <PageSection variant="light">
    <TextContent>
      <Text component="h1">React.js + PatternFly 5</Text>
      <Text component="p">
        This is a demo to showcase that we can build out a regular CRA
        application with PatternFly 5, and consume it server-side in the
        freemarker template.
      </Text>
      <Text component="h2">Start mvn server</Text>
      <Command>
        mvn quarkus:dev -Dquarkus.http.port=8080 -Dapi.snyk.token=TOKEN
        -Dapi.trustedContent.vex.host=http://tc-vex-stub-trusted-content.apps.cn-lab2-eu.lue0.p1.openshiftapps.com
        -Dapi.trustedContent.gav.host=http://swio-trusted-content.apps.cn-lab2-eu.lue0.p1.openshiftapps.com
      </Command>
      <Text component="h2">Start UI in dev mode</Text>
      <Command>
        {`cd ui
# first time
yarn install
yarn start
`}
      </Command>
      <Text component="h2">Build UI and copy resources to freemarker dir</Text>
      <Command>yarn build</Command>
      <Text component="h2">Get a HTML report</Text>
      <Command>
        {`http :8080/api/v3/analysis Content-Type:"application/vnd.cyclonedx+json" Accept:"text/html" @'target/project-bom.json' ex-snyk-token:TOKEN ex-oss-index-user:user@redhat.com 'ex-oss-index-token:TOKEN' > report.html`}
      </Command>
      <Text component="h2">Using FTL template syntax (example)</Text>
      <Command>
        {`<div>
        Total Vulnerabilities:
        $&#123;body.report.getSummary().getVulnerabilities().getTotal()&#125;
      </div>`}
      </Command>
      <Text component="h3">Result:</Text>
      <div>
        Total Vulnerabilities:
        $&#123;body.report.getSummary().getVulnerabilities().getTotal()&#125;
      </div>
    </TextContent>
  </PageSection>
);

export default class DashboardWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 1,
    };

    this.onNavSelect = (_event, result) => {
      this.setState({
        activeItem: result.itemId,
      });
    };
  }

  render() {
    const { activeItem } = this.state;
    const {
      children,
      mainContainerId,
      breadcrumb,
      header,
      sidebar,
      sidebarNavOpen,
      onPageResize = () => {},
      hasNoBreadcrumb,
      notificationDrawer,
      isNotificationDrawerExpanded,
      hasPageTemplateTitle,
      ...pageProps
    } = this.props;

    let renderedBreadcrumb;
    if (!hasNoBreadcrumb) {
      renderedBreadcrumb =
        breadcrumb !== undefined ? breadcrumb : DashboardBreadcrumb;
    }

    const PageNav = (
      <Nav onSelect={this.onNavSelect} aria-label="Nav">
        <NavList>
          <NavItem itemId={0} isActive={activeItem === 0} to="#system-panel">
            System panel
          </NavItem>
          <NavItem itemId={1} isActive={activeItem === 1} to="#policy">
            Policy
          </NavItem>
          <NavItem itemId={2} isActive={activeItem === 2} to="#auth">
            Authentication
          </NavItem>
          <NavItem itemId={3} isActive={activeItem === 3} to="#network">
            Network services
          </NavItem>
          <NavItem itemId={4} isActive={activeItem === 4} to="#server">
            Server
          </NavItem>
        </NavList>
      </Nav>
    );

    const _sidebar = (
      <PageSidebar isSidebarOpen={sidebarNavOpen || false}>
        <PageSidebarBody>{PageNav}</PageSidebarBody>
      </PageSidebar>
    );
    const PageSkipToContent = (
      <SkipToContent
        href={`#${
          mainContainerId
            ? mainContainerId
            : "main-content-page-layout-default-nav"
        }`}
      >
        Skip to content
      </SkipToContent>
    );

    return (
      <Page
        header={header !== undefined ? header : <DashboardHeader />}
        sidebar={sidebar !== undefined ? sidebar : _sidebar}
        isManagedSidebar
        skipToContent={PageSkipToContent}
        breadcrumb={renderedBreadcrumb}
        mainContainerId={
          mainContainerId
            ? mainContainerId
            : "main-content-page-layout-default-nav"
        }
        notificationDrawer={notificationDrawer}
        isNotificationDrawerExpanded={isNotificationDrawerExpanded}
        {...(typeof onPageResize === "function" && {
          onPageResize: (event, resizeObject) =>
            onPageResize(event, resizeObject),
        })}
        {...pageProps}
      >
        {hasPageTemplateTitle && PageTemplateTitle}
        {children}
      </Page>
    );
  }
}
