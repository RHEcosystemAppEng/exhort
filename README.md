# crda-backend Project

## Dependencies

See the [application.properties](./src/main/resources/application.properties) for default values and configuration properties

- Current CRDA v1.5
- Trusted Content service

## Required parameters

- `api.snyk.org` Snyk OrgId
- `api.snyk.token` Snyk API token for authentication

## Dependency Graph analysis

With Maven it is possible to generate a [DOT graph](https://graphviz.org/doc/info/lang.html) with all the resolved dependencies.
The following command will generate a `dependencies.txt` file in the project target folder.

```bash
mvn --quiet clean -f "/path/to/project/pom.xml" && mvn --quiet org.apache.maven.plugins:maven-dependency-plugin:3.5.0:tree -f "/path/to/project/pom.xml" -DoutputFile="/path/to/project/target/dependencies.txt" -DoutputType=dot -DappendOutput=true
```

You can submit this file to the `/graph-analysis` endpoint in order to get a dependency graph analysis backed by Snyk.

```bash
http :8080/api/v2/graph-analysis Content-Type:text/plain @'./src/test/resources/dependencies.txt'
```

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:
```shell script
./mvnw compile quarkus:dev
```

> **_NOTE:_**  Quarkus now ships with a Dev UI, which is available in dev mode only at http://localhost:8080/q/dev/.

## Packaging and running the application

The application can be packaged using:
```shell script
./mvnw package
```
It produces the `quarkus-run.jar` file in the `target/quarkus-app/` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/quarkus-app/lib/` directory.

The application is now runnable using `java -jar target/quarkus-app/quarkus-run.jar`.

If you want to build an _über-jar_, execute the following command:
```shell script
./mvnw package -Dquarkus.package.type=uber-jar
```

The application, packaged as an _über-jar_, is now runnable using `java -jar target/*-runner.jar`.

## Creating a native executable

You can create a native executable using: 
```shell script
./mvnw package -Pnative
```

Or, if you don't have GraalVM installed, you can run the native executable build in a container using: 
```shell script
./mvnw package -Pnative -Dquarkus.native.container-build=true
```

You can then execute your native executable with: `./target/crda-backend-1.0.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult https://quarkus.io/guides/maven-tooling.

## Provided Code

### RESTEasy Reactive

Easily start your Reactive RESTful Web Services

[Related guide section...](https://quarkus.io/guides/getting-started-reactive#reactive-jax-rs-resources)
