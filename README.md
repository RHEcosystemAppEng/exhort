# crda-backend Project

## Dependencies

See the [application.properties](./src/main/resources/application.properties) for default values and configuration properties

- Trusted Content service: `api.trustedContent.gav.host`
- Trusted Content VEX stub: `api.trustedContent.vex.host`

### Third party dependencies

 - Snyk API
 - Tidelift API (currently disabled)

## Required parameters

- `api.snyk.token` Snyk API token for default authentication
- `api.tidelift.token` Tidelift API token for default authentication (currently ignored)

## OpenAPI and SwaggerUI

- OpenAPI Spec: There is an [openapi.yaml](./src/main/resources/META-INF/openapi.yaml) or publiehsed in the endpoint http://localhost:8080/q/openapi?format=json
- Swagger UI: Available at http://localhost:8080/q/swagger-ui for development or when enabled with the property `quarkus.swagger-ui.always-include=true` 

## Providers

Currently there are 2 available providers.

 - Snyk will provide a vulnerability report for your components or full dependency graph
 - Tidelift (Disabled) will provide a vulnerability report aggregated from independent requests taken from each individual dependency.

You can disable a given provider for the dependency graph analysis by using `api.<provider>.disabled=true` property at startup.

Providers should be defined as a multi-valued list in the `providers` Query Parameter. e.g. `/component-analysis/maven?providers=snyk&providers=tidelift`

## Package Managers

Only `maven` is currently supported.

## Dependency Graph Analysis `/api/v3/dependency-analysis/<pkgManager>`

With Maven it is possible to generate a [DOT graph](https://graphviz.org/doc/info/lang.html) with all the resolved dependencies.
The following command will generate a `dependencies.txt` file in the project target folder.

```bash
mvn --quiet clean -f "/path/to/project/pom.xml" && mvn --quiet -Dversion=3.5.0 dependency:tree -f "/path/to/project/pom.xml" -DoutputFile="/path/to/project/target/dependencies.txt" -DoutputType=dot
```

You can submit this file to the `/dependency-analysis/<pkgManager>` endpoint in order to get a dependency graph analysis backed from the selected provider. Make sure youre passing the
right `Content-Type` and a valid `pkgManager`

This is an example for `maven`:

```bash
$ http :8080/api/v3/dependency-analysis/maven Content-Type:"text/vnd.graphviz" @'./src/test/resources/dependencies.txt'
[
    {
      "ref": {
          "name": "io.quarkus:quarkus-hibernate-orm",
          "version": "2.13.5.Final"
      },
      ...
    }
]
```

### HTML Report

By default the response Content-Type will be `application/json` but if the `text/html` media type is requested instead, the response
will be processed and converted into HTML.

```bash
$ http :8080/api/v3/dependency-analysis/maven Content-Type:"text/vnd.graphviz" Accept:"text/html" @'./src/test/resources/dependencies.txt'

<html>
  ...
</html>
```

### Mime-Multipart response

It is also possible to get a MIME Multipart response containing a JSON report with the HTML attached.
For that, use the `Accept: multipart/mixed` request header.


```bash
http :8080/api/v3/dependency-analysis/maven Content-Type:"text/vnd.graphviz" Accept:"multipart/mixed" @'./target/dependencies.txt'
HTTP/1.1 200 OK
	boundary="----=_Part_2_2047647971.1682593849895"
Content-Type: multipart/mixed; 
MIME-Version: 1.0
Message-Id: <49857413.3.1682593849896@granada>
User-Agent: HTTPie/3.2.1
transfer-encoding: chunked
x-quarkus-hot-deployment-done: true

------=_Part_2_2047647971.1682593849895
Content-Type: application/json
Content-Transfer-Encoding: binary

{
    "summary": {
        "dependencies": {
            ...
        },
        "vulnerabilities": {
            ...
        }
    },
    "dependencies": [
        {
        "ref": {
            "name": "log4j:log4j",
            "version": "1.2.17"
        },
        ...
        }
    ]
}
------=_Part_2_2047647971.1682593849895
Content-Type: text/html
Content-Transfer-Encoding: 8bit
Content-Disposition: attachment; filename=report.html

<html>
    <header>
        <title>CRDA Stack Report</title>
    </header>
    <body>
        <h1>Stack Report</h1>
        <p>This is an example</p>
    </body>
</html>
------=_Part_2_2047647971.1682593849895--

```

## Component Analysis `/api/v3/component-analysis/<pkgManager>`

It is also possible to provide a list of packages in order to get a similar report. This method accepts a JSON object instead of a DOT graph.

Make sure you are providing a valid `pkgManager`

```bash
$ curl 'http://localhost:8080/api/v3/component-analysis/maven' \
--header 'Content-Type: application/json' \
--data '[
    {"name": "log4j:log4j", "version": "1.2.17"},
    {"name": "io.netty:netty-common", "version": "4.1.86"},
]'
...
{
    "summary": {
        "dependencies": {
            ...
        },
        "vulnerabilities": {
            ...
        }
    },
    "dependencies": [
        {
        "ref": {
            "name": "log4j:log4j",
            "version": "1.2.17"
        },
        ...
        }
    ]
}
```

## Deploy on OpenShift

The required parameters can be injected as environment variables through a secret. Create the `crda-secret` Secret before deploying the application.

```bash
oc create secret generic -n crda --from-literal=api-snyk-token=<snyk_api_token> --from-literal=api-tidelift-token=<tidelift_api_token> crda-secret
```

After that you can use the [crda-backend.yaml](./deploy/crda-backend.yaml)

```bash
oc apply -f deploy/crda-backend.yaml
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
