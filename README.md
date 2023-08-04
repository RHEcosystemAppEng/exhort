# Exhort

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![CI](https://github.com/RHEcosystemAppEng/exhort/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/RHEcosystemAppEng/exhort/actions/workflows/ci.yaml)

## Dependencies

See the [application.properties](./src/main/resources/application.properties) for default values and configuration properties

- Trusted Content service: `api.trustedContent.gav.host`
- Trusted Content VEX stub: `api.trustedContent.vex.host`

### Third party dependencies

- Snyk API
- OSS Index

## Required parameters

- `api.snyk.token` Snyk API token for default authentication

## OpenAPI and SwaggerUI

- OpenAPI Spec: There is an [openapi.yaml](./api-spec/v3/openapi.yaml) or publiehsed in the endpoint http://localhost:8080/q/openapi?format=json
- Swagger UI: Available at http://localhost:8080/q/swagger-ui for development or when enabled with the property `quarkus.swagger-ui.always-include=true`

## Providers

Currently there are 2 available providers that will provide a vulnerability report for your components or full dependency graph.

- Snyk (`snyk`)
- OSS Index (`oss-index`)

You can disable a given provider for the dependency graph analysis by using `api.<provider>.disabled=true` property at startup.

Providers should be defined as a multi-valued list in the `providers` Query Parameter. e.g. `/analysis?providers=snyk&providers=oss-index`

## Package Managers

The following Package Managers are currently supported:

- Maven (`maven`)
- Gradle (`gradle`)
- NPM (`npm`)
- Go Modules (`gomodules`)
- Pip (`pip`)

## Dependency Analysis `/api/v3/analysis`

The expected input data format is a Software Bill of Materials (SBOM) containing the aggregate of all direct and transitive
dependencies of a project.

The `Content-Type` HTTP header will allow Exhort distinguish between the different supported SBOM formats.

- [CycloneDX](https://cyclonedx.org/specification/overview/): `application/vnd.cyclonedx+json`
- [SPDX](https://spdx.dev/specifications/): `application/vnd.spdx+json`

### Example

You can generate a CycloneDx JSON SBOM with the following command:

```bash
mvn org.cyclonedx:cyclonedx-maven-plugin:2.7.6:makeBom -DoutputFormat=json -DexcludeTestProject
```

The generated file will be located under `./target/bom.json`. Make sure the request `Content-Type` is set to `application/vnd.cyclonedx+json`.
Then you can analyise the vulnerabilities with the following command:

```bash
$ http :8080/api/v3/analysis Content-Type:"application/vnd.cyclonedx+json" Accept:"application/json" @'target/bom.json'
```

### Verbose Mode

When the Dependency Graph Analysis returns a JSON report it contains all vulnerability data by default. The _Verbose mode_ can be disabled
in order to retrieve just a Summary. Use the `verbose=false` Query parameter to disable it.

```bash
$ http :8080/api/v3/analysis Content-Type:"application/vnd.cyclonedx+json" Accept:"application/json" @'target/sbom.json' verbose==false

{
    "snyk": {
        "status": {
            "name": "snyk",
            "code": 200,
            "message": "OK",
            "ok": true
        }
        "dependencies": [
            ...
        ],
        "summary": {
            "dependencies": {
                "scanned": 11,
                "transitive": 217
            },
            "vulnerabilities": {
                "critical": 1,
                "direct": 6,
                "high": 4,
                "low": 5,
                "medium": 10,
                "total": 20
            }
        }
    }
}
```

### Client Token Authentication

If clients don't provide the token to authenticate against the Vulnerability Provider the default one will be used instead but vulnerabilities unique to
that specific provider will not show all the details.

To provide the client authentication tokens use HTTP Headers in the request. The format for the tokens Headers is `ex-provider-token`. e.g. `ex-snyk-token`:

```bash
http :8080/api/v3/analysis Content-Type:"application/vnd.cyclonedx+json" Accept:"text/html" @'target/sbom.json' ex-snyk-token:the-client-token
```

In case the vulnerability provider requires of Basic Authentication the headers will be `ex-provider-user` and `ex-provider-token`.

```bash
http :8080/api/v3/analysis Content-Type:"application/vnd.cyclonedx+json" Accept:"text/html" @'target/sbom.json' ex-oss-index-user:the-client-username ex-oss-index-token:the-client-token
```

### HTML Report

By default the response Content-Type will be `application/json` but if the `text/html` media type is requested instead, the response
will be processed and converted into HTML.

The HTML report will show limited information:

- Public vulnerabilities retrieved with the default token will not show the _Exploit Maturity_
- Private vulnerabilities (i.e. vulnerabilities reported by the provider) will not be displayed.

```bash
$ http :8080/api/v3/analysis Content-Type:"application/vnd.cyclonedx+json" Accept:"text/html" @'target/sbom.json'

<html>
...
</html>
```

### Mime-Multipart response

It is also possible to get a MIME Multipart response containing a JSON report with the HTML attached.
For that, use the `Accept: multipart/mixed` request header.


```bash
http :8080/api/v3/analysis Content-Type:"application/vnd.cyclonedx+json" Accept:"multipart/mixed" @'target/sbom.json'
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
    "snyk": {
        "status": {
            ...
        }
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
}
------=_Part_2_2047647971.1682593849895
Content-Type: text/html
Content-Transfer-Encoding: 8bit
Content-Disposition: attachment; filename=report.html

<html>
    <header>
        <title>Exhort Dependency Report</title>
    </header>
    <body>
        <h1>Dependency Report</h1>
        <p>This is an example</p>
    </body>
</html>
------=_Part_2_2047647971.1682593849895--

```

## Token validation

Clients are allowed to validate the vulnerability provider token with a specific endpoint. That will allow IDEs and the CLI to persist the different
tokens and validate them when saving them.

The request will be a GET to the `/token` path containing the HTTP header with the token. The header format will follow the same rules as for the
other HTTP requests. i.e. `ex-<provider>-token`

```bash
http -v :8080/api/v3/token ex-snyk-token==example-token
```

The possible responses are:

- 200 - Token validated successfully
- 400 - Missing authentication header
- 401 - Invalid auth token provided
- 403 - The token is not authorized
- 429 - Rate limit exceeded
- 500 - Server error

## Deploy on OpenShift

The required parameters can be injected as environment variables through a secret. Create the `exhort-secret` Secret before deploying the application.

```bash
oc create secret generic -n exhort --from-literal=api-snyk-token=<snyk_api_token> exhort-secret
```

After that you can use the [exhort.yaml](./deploy/exhort.yaml)

```bash
oc apply -f deploy/exhort.yaml
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

You can then execute your native executable with: `./target/exhort-0.0.1-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult https://quarkus.io/guides/maven-tooling.
