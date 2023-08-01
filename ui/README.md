# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified.

Additionally, the output files (`main.js` / `main.css`) are copied to the `/src/main/resources/freemarker/templates/generated` dir.

# Dev and build

## Start mvn server

```
mvn quarkus:dev -Dquarkus.http.port=8080 -Dapi.snyk.token=TOKEN -Dapi.trustedContent.vex.host=http://tc-vex-stub-trusted-content.apps.cn-lab2-eu.lue0.p1.openshiftapps.com -Dapi.trustedContent.gav.host=http://swio-trusted-content.apps.cn-lab2-eu.lue0.p1.openshiftapps.com
```

## Start UI in dev mode

```
cd ui

# first time only
yarn install

yarn start
```

## Build UI and copy resources to freemarker dir

```
yarn build
```

## Get a HTML report

```
http :8080/api/v3/analysis Content-Type:"application/vnd.cyclonedx+json" Accept:"text/html" @'target/project-bom.json' ex-snyk-token:TOKEN ex-oss-index-user:user@redhat.com 'ex-oss-index-token:TOKEN' > report.html
```

## Using FTL template syntax (example)

```
<div>
  Total Vulnerabilities:
  $&#123;body.report.getSummary().getVulnerabilities().getTotal()&#125;
</div>
```
