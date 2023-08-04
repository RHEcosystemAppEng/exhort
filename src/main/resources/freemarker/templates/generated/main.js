!function(){"use strict";var e={8906:function(e,t,i){var n,r=i(8963),a=i(3609),o=(i(3218),i(9559)),s=i(9361),l=i(7137),c=i(9714),u=i(4187);n={packagePath:"https://central.sonatype.com/artifact/",remediationPath:"https://maven.repository.redhat.com/ga/",issueVisibilityHelper:{providerData:null},vexPath:"https://tc-storage-mvp.s3.amazonaws.com/vexes/",report:{"oss-index":{status:{ok:!0,name:"oss-index",code:200,message:"OK"},summary:{dependencies:{scanned:10,transitive:301},vulnerabilities:{direct:2,total:18,critical:0,high:5,medium:10,low:3}},dependencies:[{ref:"pkg:maven/io.quarkus/quarkus-resteasy@2.13.5.Final",issues:[],transitive:[{ref:"pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final",issues:[{id:"CVE-2023-2974",title:"[CVE-2023-2974] CWE-Other",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"High",integrityImpact:"High",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"},cvssScore:8.1,severity:"HIGH",cves:["CVE-2023-2974"],unique:!1},{id:"CVE-2023-0044",title:"[CVE-2023-0044] CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"Required",scope:"Changed",confidentialityImpact:"Low",integrityImpact:"Low",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N"},cvssScore:6.1,severity:"MEDIUM",cves:["CVE-2023-0044"],unique:!1}],remediations:{"CVE-2023-0044":{issueRef:"CVE-2023-0044",mavenPackage:"pkg:maven/io.quarkus/quarkus-vertx-http@2.13.7.Final-redhat-00003",productStatus:"fixed"}},highestVulnerability:{id:"CVE-2023-2974",title:"[CVE-2023-2974] CWE-Other",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"High",integrityImpact:"High",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"},cvssScore:8.1,severity:"HIGH",cves:["CVE-2023-2974"],unique:!1}},{ref:"pkg:maven/org.jboss.resteasy/resteasy-core@4.7.7.Final",issues:[{id:"CVE-2023-0482",title:"[CVE-2023-0482] CWE-Other",cvss:{attackVector:"Local",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"High",integrityImpact:"None",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"},cvssScore:5.5,severity:"MEDIUM",cves:["CVE-2023-0482"],unique:!1}],remediations:{},highestVulnerability:{id:"CVE-2023-0482",title:"[CVE-2023-0482] CWE-Other",cvss:{attackVector:"Local",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"High",integrityImpact:"None",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"},cvssScore:5.5,severity:"MEDIUM",cves:["CVE-2023-0482"],unique:!1}}],recommendation:null,remediations:{},highestVulnerability:{id:"CVE-2023-2974",title:"[CVE-2023-2974] CWE-Other",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"High",integrityImpact:"High",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"},cvssScore:8.1,severity:"HIGH",cves:["CVE-2023-2974"],unique:!1}},{ref:"pkg:maven/io.quarkus/quarkus-hibernate-orm-deployment@2.0.2.Final",issues:[],transitive:[{ref:"pkg:maven/org.jsoup/jsoup@1.12.1",issues:[{id:"CVE-2021-37714",title:"[CVE-2021-37714] CWE-248: Uncaught Exception",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"None",integrityImpact:"None",availabilityImpact:"High",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"},cvssScore:7.5,severity:"HIGH",cves:["CVE-2021-37714"],unique:!1},{id:"CVE-2022-36033",title:"[CVE-2022-36033] CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"Required",scope:"Changed",confidentialityImpact:"Low",integrityImpact:"Low",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N"},cvssScore:6.1,severity:"MEDIUM",cves:["CVE-2022-36033"],unique:!1}],remediations:{},highestVulnerability:{id:"CVE-2021-37714",title:"[CVE-2021-37714] CWE-248: Uncaught Exception",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"None",integrityImpact:"None",availabilityImpact:"High",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"},cvssScore:7.5,severity:"HIGH",cves:["CVE-2021-37714"],unique:!1}},{ref:"pkg:maven/com.google.guava/guava@25.1-android",issues:[{id:"CVE-2023-2976",title:"[CVE-2023-2976] CWE-552: Files or Directories Accessible to External Parties",cvss:{attackVector:"Local",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"High",integrityImpact:"High",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"},cvssScore:7.1,severity:"HIGH",cves:["CVE-2023-2976"],unique:!1},{id:"CVE-2020-8908",title:"[CVE-2020-8908] CWE-379: Creation of Temporary File in Directory with Incorrect Permissions",cvss:{attackVector:"Local",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"Low",integrityImpact:"None",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N"},cvssScore:3.3,severity:"LOW",cves:["CVE-2020-8908"],unique:!1}],remediations:{},highestVulnerability:{id:"CVE-2023-2976",title:"[CVE-2023-2976] CWE-552: Files or Directories Accessible to External Parties",cvss:{attackVector:"Local",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"High",integrityImpact:"High",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"},cvssScore:7.1,severity:"HIGH",cves:["CVE-2023-2976"],unique:!1}},{ref:"pkg:maven/io.vertx/vertx-web@4.3.4",issues:[{id:"CVE-2023-24815",title:"[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"Low",integrityImpact:"None",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"},cvssScore:5.3,severity:"MEDIUM",cves:["CVE-2023-24815"],unique:!1}],remediations:{},highestVulnerability:{id:"CVE-2023-24815",title:"[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"Low",integrityImpact:"None",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"},cvssScore:5.3,severity:"MEDIUM",cves:["CVE-2023-24815"],unique:!1}},{ref:"pkg:maven/commons-io/commons-io@2.5",issues:[{id:"CVE-2021-29425",title:"[CVE-2021-29425] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"Low",integrityImpact:"None",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"},cvssScore:5.3,severity:"MEDIUM",cves:["CVE-2021-29425"],unique:!1}],remediations:{},highestVulnerability:{id:"CVE-2021-29425",title:"[CVE-2021-29425] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"Low",integrityImpact:"None",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"},cvssScore:5.3,severity:"MEDIUM",cves:["CVE-2021-29425"],unique:!1}},{ref:"pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0",issues:[{id:"CVE-2023-22006",title:"[CVE-2023-22006] CWE-noinfo",cvss:{attackVector:"Network",attackComplexity:"High",privilegesRequired:"None",userInteraction:"Required",scope:"Unchanged",confidentialityImpact:"None",integrityImpact:"Low",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"},cvssScore:3.1,severity:"LOW",cves:["CVE-2023-22006"],unique:!1}],remediations:{},highestVulnerability:{id:"CVE-2023-22006",title:"[CVE-2023-22006] CWE-noinfo",cvss:{attackVector:"Network",attackComplexity:"High",privilegesRequired:"None",userInteraction:"Required",scope:"Unchanged",confidentialityImpact:"None",integrityImpact:"Low",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"},cvssScore:3.1,severity:"LOW",cves:["CVE-2023-22006"],unique:!1}}],recommendation:null,remediations:{},highestVulnerability:{id:"CVE-2021-37714",title:"[CVE-2021-37714] CWE-248: Uncaught Exception",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"None",integrityImpact:"None",availabilityImpact:"High",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"},cvssScore:7.5,severity:"HIGH",cves:["CVE-2021-37714"],unique:!1}},{ref:"pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final",issues:[{id:"CVE-2023-2974",title:"[CVE-2023-2974] CWE-Other",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"High",integrityImpact:"High",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"},cvssScore:8.1,severity:"HIGH",cves:["CVE-2023-2974"],unique:!1},{id:"CVE-2023-0044",title:"[CVE-2023-0044] CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"Required",scope:"Changed",confidentialityImpact:"Low",integrityImpact:"Low",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N"},cvssScore:6.1,severity:"MEDIUM",cves:["CVE-2023-0044"],unique:!1}],transitive:[{ref:"pkg:maven/io.netty/netty-codec-haproxy@4.1.82.Final",issues:[{id:"CVE-2022-41881",title:"[CVE-2022-41881] CWE-674: Uncontrolled Recursion",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"None",integrityImpact:"None",availabilityImpact:"High",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"},cvssScore:7.5,severity:"HIGH",cves:["CVE-2022-41881"],unique:!1}],remediations:{},highestVulnerability:{id:"CVE-2022-41881",title:"[CVE-2022-41881] CWE-674: Uncontrolled Recursion",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"None",integrityImpact:"None",availabilityImpact:"High",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"},cvssScore:7.5,severity:"HIGH",cves:["CVE-2022-41881"],unique:!1}},{ref:"pkg:maven/io.netty/netty-codec@4.1.82.Final",issues:[{id:"CVE-2022-41915",title:"[CVE-2022-41915] CWE-113: Improper Neutralization of CRLF Sequences in HTTP Headers ('HTTP Response Splitting')",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"Low",integrityImpact:"Low",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N"},cvssScore:6.5,severity:"MEDIUM",cves:["CVE-2022-41915"],unique:!1}],remediations:{},highestVulnerability:{id:"CVE-2022-41915",title:"[CVE-2022-41915] CWE-113: Improper Neutralization of CRLF Sequences in HTTP Headers ('HTTP Response Splitting')",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"Low",integrityImpact:"Low",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N"},cvssScore:6.5,severity:"MEDIUM",cves:["CVE-2022-41915"],unique:!1}},{ref:"pkg:maven/io.netty/netty-handler@4.1.78.Final",issues:[{id:"CVE-2023-34462",title:"[CVE-2023-34462] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"None",integrityImpact:"None",availabilityImpact:"High",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"},cvssScore:6.5,severity:"MEDIUM",cves:["CVE-2023-34462"],unique:!1}],remediations:{},highestVulnerability:{id:"CVE-2023-34462",title:"[CVE-2023-34462] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"None",integrityImpact:"None",availabilityImpact:"High",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"},cvssScore:6.5,severity:"MEDIUM",cves:["CVE-2023-34462"],unique:!1}},{ref:"pkg:maven/io.vertx/vertx-web@4.3.4",issues:[{id:"CVE-2023-24815",title:"[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"Low",integrityImpact:"None",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"},cvssScore:5.3,severity:"MEDIUM",cves:["CVE-2023-24815"],unique:!1}],remediations:{},highestVulnerability:{id:"CVE-2023-24815",title:"[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"Low",integrityImpact:"None",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"},cvssScore:5.3,severity:"MEDIUM",cves:["CVE-2023-24815"],unique:!1}}],recommendation:null,remediations:{"CVE-2023-0044":{issueRef:"CVE-2023-0044",mavenPackage:"pkg:maven/io.quarkus/quarkus-vertx-http@2.13.7.Final-redhat-00003",productStatus:"fixed"}},highestVulnerability:{id:"CVE-2022-41881",title:"[CVE-2022-41881] CWE-674: Uncontrolled Recursion",cvss:{attackVector:"Network",attackComplexity:"Low",privilegesRequired:"None",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"None",integrityImpact:"None",availabilityImpact:"High",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"},cvssScore:7.5,severity:"HIGH",cves:["CVE-2022-41881"],unique:!1}},{ref:"pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.5.Final",issues:[],transitive:[{ref:"pkg:maven/org.postgresql/postgresql@42.5.0",issues:[{id:"CVE-2022-41946",title:"[CVE-2022-41946] CWE-668: Exposure of Resource to Wrong Sphere",cvss:{attackVector:"Local",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"High",integrityImpact:"None",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"},cvssScore:5.5,severity:"MEDIUM",cves:["CVE-2022-41946"],unique:!1}],remediations:{},highestVulnerability:{id:"CVE-2022-41946",title:"[CVE-2022-41946] CWE-668: Exposure of Resource to Wrong Sphere",cvss:{attackVector:"Local",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"High",integrityImpact:"None",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"},cvssScore:5.5,severity:"MEDIUM",cves:["CVE-2022-41946"],unique:!1}}],recommendation:null,remediations:{"CVE-2022-41946":{issueRef:"CVE-2022-41946",mavenPackage:"pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.7.Final-redhat-00003",productStatus:"fixed"}},highestVulnerability:{id:"CVE-2022-41946",title:"[CVE-2022-41946] CWE-668: Exposure of Resource to Wrong Sphere",cvss:{attackVector:"Local",attackComplexity:"Low",privilegesRequired:"Low",userInteraction:"None",scope:"Unchanged",confidentialityImpact:"High",integrityImpact:"None",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"},cvssScore:5.5,severity:"MEDIUM",cves:["CVE-2022-41946"],unique:!1}},{ref:"pkg:maven/io.quarkus/quarkus-hibernate-orm@2.13.5.Final",issues:[],transitive:[{ref:"pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0",issues:[{id:"CVE-2023-22006",title:"[CVE-2023-22006] CWE-noinfo",cvss:{attackVector:"Network",attackComplexity:"High",privilegesRequired:"None",userInteraction:"Required",scope:"Unchanged",confidentialityImpact:"None",integrityImpact:"Low",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"},cvssScore:3.1,severity:"LOW",cves:["CVE-2023-22006"],unique:!1}],remediations:{},highestVulnerability:{id:"CVE-2023-22006",title:"[CVE-2023-22006] CWE-noinfo",cvss:{attackVector:"Network",attackComplexity:"High",privilegesRequired:"None",userInteraction:"Required",scope:"Unchanged",confidentialityImpact:"None",integrityImpact:"Low",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"},cvssScore:3.1,severity:"LOW",cves:["CVE-2023-22006"],unique:!1}}],recommendation:null,remediations:{},highestVulnerability:{id:"CVE-2023-22006",title:"[CVE-2023-22006] CWE-noinfo",cvss:{attackVector:"Network",attackComplexity:"High",privilegesRequired:"None",userInteraction:"Required",scope:"Unchanged",confidentialityImpact:"None",integrityImpact:"Low",availabilityImpact:"None",exploitCodeMaturity:null,remediationLevel:null,reportConfidence:null,cvss:"CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"},cvssScore:3.1,severity:"LOW",cves:["CVE-2023-22006"],unique:!1}},{ref:"pkg:maven/jakarta.validation/jakarta.validation-api@2.0.2",issues:[],transitive:[],recommendation:"pkg:maven/jakarta.validation/jakarta.validation-api@2.0.2.redhat-00001",remediations:{},highestVulnerability:null}]},snyk:{status:{ok:!1,name:"snyk",code:403,message:"Forbidden: The provided credentials don't have the required permissions."},summary:{dependencies:{scanned:null,transitive:null},vulnerabilities:{direct:null,total:null,critical:null,high:null,medium:null,low:null}},dependencies:[]}},ossIndexIssueLinkFormatter:{issuePathRegex:"http://ossindex.sonatype.org/vulnerability/%s"},snykIssueLinkFormatter:{issuePathRegex:"https://security.snyk.io/vuln/%s?utm_medium=Partner&utm_source=RedHat&utm_campaign=Code-Ready-Analytics-2020&utm_content=vuln/%s"},sbomPath:"https://tc-storage-mvp.s3.amazonaws.com/sboms/sbom.json",snykSignup:"https://app.snyk.io/login?utm_campaign=Code-Ready-Analytics-2020&utm_source=code_ready&code_ready=FF1B53D9-57BE-4613-96D7-1D06066C38C9",dependencyHelper:{}};var d=i(8437),p=i(6798),v=i(2996),m=i(6363),C=i(4223),g=i(7987),h=i(1858),y=i(3020),N=i(493),I=i(7941),x=i(2355),V=i(9092),f=i(3278),L=i(2468),S=i(4350),E=i(6615),k=i(3873),j=i(8375),b=i(5859),U=function(){var e=Ie(),t=Object.values(e.report)[0];return(0,b.jsxs)(d.Z,{isFlat:!0,isFullHeight:!0,children:[(0,b.jsx)(p.O,{children:(0,b.jsx)(v.l,{children:"Summary of the stack"})}),(0,b.jsx)(m.i,{}),(0,b.jsx)(C.e,{children:(0,b.jsxs)(g.o,{columnModifier:{default:"2Col"},children:[(0,b.jsxs)(h.g,{children:[(0,b.jsx)(y.M,{icon:(0,b.jsx)(L.ZP,{}),children:"Dependency details"}),(0,b.jsx)(N.b,{children:(0,b.jsxs)(I.aV,{isPlain:!0,children:[(0,b.jsxs)(x.H,{children:["Analyzed dependencies: ",t.summary.dependencies.scanned]}),(0,b.jsxs)(x.H,{children:["Transitive dependencies: ",t.summary.dependencies.transitive]})]})})]}),(0,b.jsxs)(h.g,{children:[(0,b.jsx)(y.M,{icon:(0,b.jsx)(j.ZP,{}),children:"Security issues"}),(0,b.jsx)(N.b,{children:(0,b.jsxs)(I.aV,{isPlain:!0,children:[(0,b.jsxs)(x.H,{children:["Total vulnerabilities: ",t.summary.vulnerabilities.total]}),(0,b.jsxs)(x.H,{children:["Direct dependencies: ",t.summary.vulnerabilities.direct]})]})})]})]})}),(0,b.jsx)(m.i,{}),(0,b.jsx)(C.e,{children:(0,b.jsx)(g.o,{columnModifier:{default:"2Col"},children:(0,b.jsxs)(h.g,{children:[(0,b.jsx)(y.M,{icon:(0,b.jsx)(E.ZP,{}),children:"Provider status"}),(0,b.jsx)(N.b,{children:(0,b.jsx)(I.aV,{children:(0,b.jsxs)(x.H,{children:[t.status.name," ",t.status.ok?(0,b.jsx)(k.ZP,{color:V.l.value}):(0,b.jsx)(S.ZP,{color:f.Q.value})]})})})]})})})]})},P=i(2570),w=i(1844),R=i(2862),A=function(){var e=Ie(),t=Object.values(e.report)[0];return(0,b.jsxs)(d.Z,{isFlat:!0,isFullHeight:!0,children:[(0,b.jsx)(p.O,{children:(0,b.jsx)(v.l,{children:"".concat(t.summary.vulnerabilities.total," vulnerabilities in ").concat(t.dependencies.length," dependencies")})}),(0,b.jsx)(m.i,{}),(0,b.jsx)(C.e,{children:(0,b.jsx)(P.b,{children:(0,b.jsx)("div",{style:{height:"230px",width:"350px"},children:(0,b.jsx)(w.HS,{constrainToVisibleArea:!0,data:[{x:"High",y:t.summary.vulnerabilities.high},{x:"Medium",y:t.summary.vulnerabilities.medium},{x:"Low",y:t.summary.vulnerabilities.low}],labels:function(e){var t=e.datum;return"".concat(t.x,": ").concat(t.y,"%")},legendData:[{name:"High: ".concat(t.summary.vulnerabilities.high)},{name:"Medium: ".concat(t.summary.vulnerabilities.medium)},{name:"Low: ".concat(t.summary.vulnerabilities.low)}],legendOrientation:"vertical",legendPosition:"right",padding:{bottom:20,left:20,right:140,top:20},subTitle:"Vulnerabilities",title:"".concat(t.summary.vulnerabilities.total),width:350,themeColor:R.nz.orange})})})})]})},H=i(1413),q=i(885),M=i(6989),T=i(8395),D=i(3647),W=i(5644),O=i(8573),F=i(6647),Z=i(736),B=i(2449),_=i(7594),G=i(3610),z=i(7990),Y=i(711),K=i(6056),Q=i(1915),$=i(1178),J=i(7942),X=i(7102),ee=i(2982),te=i(1917),ie=function(e){return e[e.SET_PAGE=0]="SET_PAGE",e[e.SET_SORT_BY=1]="SET_SORT_BY",e}(ie||{}),ne={changed:!1,currentPage:{page:1,perPage:10},sortBy:void 0},re=function(e,t){switch(t.type){case ie.SET_PAGE:var i=t.payload;return(0,H.Z)((0,H.Z)({},e),{},{changed:!0,currentPage:{page:i.page,perPage:i.perPage}});case ie.SET_SORT_BY:var n=t.payload;return(0,H.Z)((0,H.Z)({},e),{},{changed:!0,sortBy:{index:n.index,direction:n.direction}});default:return e}},ae=i(9809),oe=i(7554),se=i(3442),le=i(2e3),ce=i(4794),ue=i(5020),de=i(8649),pe=i(7514),ve=function(e){var t=e.numRenderedColumns,i=e.isLoading,n=void 0!==i&&i,r=e.isError,a=void 0!==r&&r,o=e.isNoData,s=void 0!==o&&o,l=e.errorEmptyState,c=void 0===l?null:l,u=e.noDataEmptyState,d=void 0===u?null:u,p=e.children,v=(0,b.jsxs)(ae.u,{variant:ae.I.sm,children:[(0,b.jsx)(oe.k,{icon:de.ZP,color:pe.a.value}),(0,b.jsx)(se.D,{headingLevel:"h2",size:"lg",children:"Unable to connect"}),(0,b.jsx)(le.B,{children:"There was an error retrieving data. Check your connection and try again."})]}),m=(0,b.jsxs)(ae.u,{variant:ae.I.sm,children:[(0,b.jsx)(oe.k,{icon:ue.ZP}),(0,b.jsx)(se.D,{headingLevel:"h2",size:"lg",children:"No data available"}),(0,b.jsx)(le.B,{children:"No data available to be shown here."})]});return(0,b.jsx)(b.Fragment,{children:n?(0,b.jsx)(K.p,{children:(0,b.jsx)(z.Tr,{children:(0,b.jsx)(Q.Td,{colSpan:t,children:(0,b.jsx)(P.b,{children:(0,b.jsx)(ce.$,{size:"xl"})})})})}):a?(0,b.jsx)(K.p,{"aria-label":"Table error",children:(0,b.jsx)(z.Tr,{children:(0,b.jsx)(Q.Td,{colSpan:t,children:(0,b.jsx)(P.b,{children:c||v})})})}):s?(0,b.jsx)(K.p,{"aria-label":"Table no data",children:(0,b.jsx)(z.Tr,{children:(0,b.jsx)(Q.Td,{colSpan:t,children:(0,b.jsx)(P.b,{children:d||m})})})}):p})},me=i(9960),Ce=i(500),ge=function(e){var t,i=e.count,n=e.params,r=e.isTop,a=e.isCompact,o=e.perPageOptions,s=e.onChange,l=function(){return n.perPage||10};return(0,b.jsx)(me.t,{itemCount:i,page:n.page||1,perPage:l(),onPageInput:function(e,t){s({page:t,perPage:l()})},onSetPage:function(e,t){s({page:t,perPage:l()})},onPerPageSelect:function(e,t){s({page:1,perPage:t})},isCompact:r||a,widgetId:"pagination-options-menu",variant:r?me.a.top:me.a.bottom,perPageOptions:(t=o||[10,20,50,100],t.map((function(e){return{title:String(e),value:e}}))),toggleTemplate:function(e){return(0,b.jsx)(Ce.v,(0,H.Z)({},e))}})},he=function(){var e=Ie(),t=Object.entries(e.report)[0],i=t[0],n=t[1],a=(0,r.useState)(""),o=(0,q.Z)(a,2),s=o[0],l=o[1],c=function(e){var t=e.items,i=e.initialSelected,n=void 0===i?[]:i,a=e.isEqual,o=void 0===a?function(e,t){return e===t}:a,s=e.isItemSelectable,l=void 0===s?function(){return!0}:s,c=e.externalState,u=r.useState(n),d=c||u,p=(0,q.Z)(d,2),v=p[0],m=p[1],C=r.useMemo((function(){return t.filter(l)}),[t,l]),g=r.useCallback((function(e){return v.some((function(t){return o(e,t)}))}),[o,v]);r.useEffect((function(){v.every(l)||m(v.filter(l))}),[l,v,m]);var h=r.useCallback((function(e){(arguments.length>1&&void 0!==arguments[1]?arguments[1]:!g(e))&&l(e)?m([].concat((0,ee.Z)(v),[e])):m(v.filter((function(t){return!o(t,e)})))}),[o,l,g,v,m]),y=r.useCallback((function(e,t){var i=v.filter((function(t){return!e.some((function(e){return o(t,e)}))})),n=e.filter(l);m(t?[].concat((0,ee.Z)(i),(0,ee.Z)(n)):i)}),[o,l,v,m]),N=r.useCallback((function(){return m(arguments.length>0&&void 0!==arguments[0]&&!arguments[0]?[]:C)}),[C,m]),I=v.length===C.length;return{selectedItems:r.useMemo((function(){return I?C:v.length>0?C.filter(g):[]}),[I,g,C,v.length]),isItemSelected:g,isItemSelectable:l,toggleItemSelected:h,selectMultiple:y,areAllSelected:I,selectAll:N,setSelectedItems:m}}({items:n.dependencies,isEqual:function(e,t){return e.ref===t.ref}}),u=c.isItemSelected,V=c.toggleItemSelected,f=function(e){var t=(0,r.useReducer)(re,(0,H.Z)((0,H.Z)({},ne),{},{currentPage:e&&e.page?(0,H.Z)({},e.page):(0,H.Z)({},ne.currentPage),sortBy:e&&e.sortBy?(0,H.Z)({},e.sortBy):ne.sortBy})),i=(0,q.Z)(t,2),n=i[0],a=i[1],o=(0,r.useCallback)((function(e){var t;a({type:ie.SET_PAGE,payload:{page:e.page>=1?e.page:1,perPage:null!==(t=e.perPage)&&void 0!==t?t:ne.currentPage.perPage}})}),[]),s=(0,r.useCallback)((function(e,t,i,n){a({type:ie.SET_SORT_BY,payload:{index:t,direction:i}})}),[]);return{page:n.currentPage,sortBy:n.sortBy,changePage:o,changeSortBy:s}}(),L=f.page,S=f.sortBy,E=f.changePage,k=f.changeSortBy,j=function(e){var t=e.items,i=e.currentSortBy,n=e.currentPage,a=e.filterItem,o=e.compareToByColumn;return(0,r.useMemo)((function(){var e,r=(0,ee.Z)(t||[]).filter(a),s=!1;return e=(0,ee.Z)(r).sort((function(e,t){var n=o(e,t,null===i||void 0===i?void 0:i.index);return 0!==n&&(s=!0),n})),s&&(null===i||void 0===i?void 0:i.direction)===te.B.desc&&(e=e.reverse()),{pageItems:e.slice((n.page-1)*n.perPage,n.page*n.perPage),filteredItems:r}}),[t,n,i,o,a])}({items:n.dependencies,currentPage:L,currentSortBy:S,compareToByColumn:function(e,t,i){return 1===i?e.ref.localeCompare(t.ref):0},filterItem:function(e){var t=!0;return s&&s.trim().length>0&&(t=-1!==e.ref.toLowerCase().indexOf(s.toLowerCase())),t}}),U=j.pageItems,P=j.filteredItems;return(0,b.jsxs)(d.Z,{children:[(0,b.jsx)(p.O,{children:(0,b.jsx)(v.l,{children:"Commonly Known Vulnerabilities"})}),(0,b.jsx)(m.i,{}),(0,b.jsx)(C.e,{children:(0,b.jsxs)("div",{style:{backgroundColor:"var(--pf-v5-global--BackgroundColor--100)"},children:[(0,b.jsx)(M.o,{children:(0,b.jsxs)(T.c,{children:[(0,b.jsx)(D.R,{toggleIcon:(0,b.jsx)(X.ZP,{}),breakpoint:"xl",children:(0,b.jsx)(W.E,{variant:"search-filter",children:(0,b.jsx)(O.M,{value:s,onChange:function(e,t){return l(t)},onClear:function(){return l("")}})})}),(0,b.jsx)(W.E,{variant:W.A.pagination,align:{default:"alignRight"},children:(0,b.jsx)(ge,{count:P.length,params:L,onChange:E})})]})}),(0,b.jsxs)(_.i,{isExpandable:!0,children:[(0,b.jsx)(G.h,{children:(0,b.jsxs)(z.Tr,{children:[(0,b.jsx)(Y.Th,{}),(0,b.jsx)(Y.Th,{sort:{columnIndex:1,sortBy:(0,H.Z)({},S),onSort:k},children:"Dependency"}),(0,b.jsx)(Y.Th,{children:"Direct"}),(0,b.jsx)(Y.Th,{children:"Transitive"}),(0,b.jsx)(Y.Th,{children:"Highest CVSS"}),(0,b.jsx)(Y.Th,{children:"Highest Severity"}),(0,b.jsx)(Y.Th,{children:"Red Hat remediation available"})]})}),(0,b.jsx)(ve,{isNoData:0===P.length,numRenderedColumns:8,children:null===U||void 0===U?void 0:U.map((function(e,t){var n,r,a,o;return(0,b.jsxs)(K.p,{isExpanded:u(e),children:[(0,b.jsxs)(z.Tr,{children:[(0,b.jsx)(Q.Td,{expand:{rowIndex:t,isExpanded:u(e),onToggle:function(){return V(e)}}}),(0,b.jsx)(Q.Td,{children:e.ref}),(0,b.jsx)(Q.Td,{children:e.issues.length}),(0,b.jsx)(Q.Td,{children:"NaN"}),(0,b.jsx)(Q.Td,{children:(0,b.jsx)(F.E,{value:80,size:F.L.sm,variant:Z.n9.warning,measureLocation:Z.nK.none})}),(0,b.jsx)(Q.Td,{children:"NaN"}),(0,b.jsx)(Q.Td,{children:"NaN"})]}),u(e)?(0,b.jsxs)(z.Tr,{isExpanded:!0,children:[(0,b.jsx)(Q.Td,{}),(0,b.jsx)(Q.Td,{className:J.Z.pyLg,children:(0,b.jsx)($.G,{children:(0,b.jsxs)(d.Z,{children:[(0,b.jsx)(p.O,{children:(0,b.jsx)(v.l,{children:"Highest vulnerability"})}),(0,b.jsx)(C.e,{children:(0,b.jsxs)(g.o,{columnModifier:{lg:"3Col"},children:[(0,b.jsxs)(h.g,{children:[(0,b.jsx)(y.M,{children:"Title"}),(0,b.jsx)(N.b,{children:null===(n=e.highestVulnerability)||void 0===n?void 0:n.title})]}),(0,b.jsxs)(h.g,{children:[(0,b.jsx)(y.M,{children:"Source"}),(0,b.jsx)(N.b,{children:i})]}),(0,b.jsxs)(h.g,{children:[(0,b.jsx)(y.M,{children:"CVEs"}),(0,b.jsx)(N.b,{children:(0,b.jsx)(I.aV,{children:null===(r=e.highestVulnerability)||void 0===r?void 0:r.cves.map((function(e,t){return(0,b.jsx)(x.H,{children:e},t)}))})})]}),(0,b.jsxs)(h.g,{children:[(0,b.jsx)(y.M,{children:"Severity"}),(0,b.jsxs)(N.b,{children:[null===(a=e.highestVulnerability)||void 0===a?void 0:a.severity," ",(0,b.jsx)(B._,{children:null===(o=e.highestVulnerability)||void 0===o?void 0:o.cvssScore})]})]})]})})]})})})]}):null]},t)}))})]}),(0,b.jsx)(ge,{count:P.length,params:L,onChange:E,isTop:!0})]})})]})},ye=window.sbomb||n,Ne=(0,r.createContext)(ye),Ie=function(){return(0,r.useContext)(Ne)};var xe=function(){return(0,b.jsxs)(Ne.Provider,{value:ye,children:[(0,b.jsx)(o.NP,{variant:o.Dk.light,children:(0,b.jsxs)(s.D,{children:[(0,b.jsx)(l.x,{component:"h1",children:ye.packagePath}),(0,b.jsx)(l.x,{component:"p",children:ye.sbomPath})]})}),(0,b.jsx)(o.NP,{variant:o.Dk.light,children:(0,b.jsxs)(c.r,{hasGutter:!0,children:[(0,b.jsx)(u.P,{md:6,children:(0,b.jsx)(U,{})}),(0,b.jsx)(u.P,{md:6,children:(0,b.jsx)(A,{})})]})}),(0,b.jsx)(o.NP,{variant:o.Dk.default,children:(0,b.jsx)(he,{})})]})},Ve=function(e){e&&e instanceof Function&&i.e(736).then(i.bind(i,599)).then((function(t){var i=t.getCLS,n=t.getFID,r=t.getFCP,a=t.getLCP,o=t.getTTFB;i(e),n(e),r(e),a(e),o(e)}))};a.createRoot(document.getElementById("root")).render((0,b.jsx)(r.StrictMode,{children:(0,b.jsx)(xe,{})})),Ve()}},t={};function i(n){var r=t[n];if(void 0!==r)return r.exports;var a=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.loaded=!0,a.exports}i.m=e,function(){var e=[];i.O=function(t,n,r,a){if(!n){var o=1/0;for(u=0;u<e.length;u++){n=e[u][0],r=e[u][1],a=e[u][2];for(var s=!0,l=0;l<n.length;l++)(!1&a||o>=a)&&Object.keys(i.O).every((function(e){return i.O[e](n[l])}))?n.splice(l--,1):(s=!1,a<o&&(o=a));if(s){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,r,a]}}(),i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,{a:t}),t},i.d=function(e,t){for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.e=function(){return Promise.resolve()},i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},function(){var e={179:0};i.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,a,o=n[0],s=n[1],l=n[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(r in s)i.o(s,r)&&(i.m[r]=s[r]);if(l)var u=l(i)}for(t&&t(n);c<o.length;c++)a=o[c],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(u)},n=self.webpackChunkui=self.webpackChunkui||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=i.O(void 0,[736],(function(){return i(8906)}));n=i.O(n)}();