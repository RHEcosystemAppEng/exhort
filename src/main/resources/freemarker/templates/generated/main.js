!function(){"use strict";var e={7566:function(e,n,r){var i=r(8963),t=r(3609),a=(r(3218),r(9559)),s=r(9714),c=r(4187),o=r(3442),l=r(3324),d=r(6363),u=r(8437),h=r(6798),g=r(2996),v=r(3020),x=r(4223),p=r(1858),j=r(493),m=r(7065),f=r(7941),y=r(2355),I=r(8485),C=r(9090),b=r(2570),M=r(7806),T=r(5859),A=["#800000","#FF0000","#FFA500","#5BA352"],w=function(e){var n,r,i,t,a,s=e.summary,c=null!==(n=null===s||void 0===s?void 0:s.critical)&&void 0!==n?n:0,o=null!==(r=null===s||void 0===s?void 0:s.high)&&void 0!==r?r:0,l=null!==(i=null===s||void 0===s?void 0:s.medium)&&void 0!==i?i:0,d=null!==(t=null===s||void 0===s?void 0:s.low)&&void 0!==t?t:0,u=null!==(a=null===s||void 0===s?void 0:s.total)&&void 0!==a?a:0,h=c+o+l+d>0,g=h?A:["#D5F5E3"],v=[{name:"Critical: ".concat(c),symbol:{type:"square",fill:A[0]}},{name:"High: ".concat(o),symbol:{type:"square",fill:A[1]}},{name:"Medium: ".concat(l),symbol:{type:"square",fill:A[2]}},{name:"Low: ".concat(d),symbol:{type:"square",fill:A[3]}}];return(0,T.jsx)("div",{children:(0,T.jsx)(x.e,{style:{paddingBottom:"inherit",padding:"0"},children:(0,T.jsx)(b.b,{children:(0,T.jsx)("div",{style:{height:"230px",width:"350px"},children:(0,T.jsx)(M.H,{constrainToVisibleArea:!0,data:h?[{x:"Critical",y:c},{x:"High",y:o},{x:"Medium",y:l},{x:"Low",y:d}]:[{x:"Empty",y:1e-10}],labels:function(e){var n=e.datum;return"".concat(n.x,": ").concat(n.y)},legendData:v,legendOrientation:"vertical",legendPosition:"right",padding:{left:20,right:140},subTitle:"Unique vulnerabilities",title:"".concat(u),width:350,colorScale:g})})})})})},S=r(5671),D=r(3144),N="maven",P="https://pkg.go.dev/",k="https://www.npmjs.com/package/",O="https://pypi.org/project/",Z="__ISSUE_ID__",L="pkg:",z=["oss-index"],E="https://maven.repository.redhat.com/ga/",B=function(e){return"oss-index"===e?"https://ossindex.sonatype.org/user/register":""},F=function(e,n){var r=J.fromString(e),i=function(e){var n="";return e.namespace&&(n=e.type===N?"".concat(e.namespace,":"):"".concat(e.namespace,"/")),n+"".concat(e.name)}(r);return n?i+"@".concat(r.version):i},R=function(e){var n=J.fromString(e),r=E;if(n.namespace){var i,t=null===(i=n.namespace)||void 0===i?void 0:i.replace(/\./g,"/");return"".concat(E).concat(t,"/").concat(n.name,"/").concat(n.version)}return r},G=function(e){var n=J.fromString(e);switch(n.type){case N:var r=n.version;if(null!==r&&void 0!==r&&r.includes("redhat")){var i,t=null===(i=n.namespace)||void 0===i?void 0:i.replace(/\./g,"/");return"".concat(E).concat(t,"/").concat(n.name,"/").concat(n.version)}return"".concat("https://central.sonatype.com/artifact/").concat(n.namespace,"/").concat(n.name,"/").concat(n.version);case"golang":var a=n.version;return null!==a&&void 0!==a&&a.match(/v\d\.\d.\d-\d{14}-\w{12}/)?"".concat(P).concat(n.namespace,"/").concat(n.name):"".concat(P).concat(n.namespace,"/").concat(n.name,"@").concat(n.version);case"npm":return n.namespace?"".concat(k).concat(n.namespace,"/").concat(n.name,"/v/").concat(n.version):"".concat(k).concat(n.name,"/v/").concat(n.version);case"pypi":return n.namespace?"".concat(O).concat(n.namespace,"/").concat(n.name,"/").concat(n.version):"".concat(O).concat(n.name,"/").concat(n.version);default:return n.toString()}},H=function(e){var n=J.fromString(e).version;return n||""},U=function(e,n,r){switch(e){case"snyk":return r.snykIssueTemplate.replace(Z,n);case"oss-index":return r.ossIssueTemplate.replace(Z,n);case"osv-nvd":return r.nvdIssueTemplate.replace(Z,n)}},Y=function(e){return e.toLowerCase().replace(/./,(function(e){return e.toUpperCase()}))},J=function(){function e(n,r,i,t){(0,S.Z)(this,e),this.type=void 0,this.namespace=void 0,this.name=void 0,this.version=void 0,this.type=n,this.namespace=r,this.name=i,this.version=t}return(0,D.Z)(e,[{key:"toString",value:function(){var e=this.name;return this.version&&(e+="@".concat(this.version)),this.namespace?"".concat(L).concat(this.type,"/").concat(this.namespace,"/").concat(e):"".concat(L).concat(this.type,"/").concat(e)}}],[{key:"fromString",value:function(n){var r=n.replace(L,""),i=r.indexOf("?");-1!==i&&(r=r.substring(0,i));var t,a,s=r.substring(0,r.indexOf("/")),c=r.split("/");c.length>2&&(t=c.slice(1,c.length-1).join("/")),-1!==r.indexOf("@")&&(a=r.substring(r.indexOf("@")+1));var o=c[c.length-1];return a&&(o=o.substring(0,o.indexOf("@"))),new e(s,t,o,a)}}]),e}();function _(e){var n=[];return Object.keys(e.providers).forEach((function(r){var i=e.providers[r].sources;void 0!==i&&Object.keys(i).length>0?Object.keys(i).forEach((function(e){n.push({provider:r,source:e,report:i[e]})})):"trusted-content"!==r&&n.push({provider:r,source:r,report:{}})})),n.sort((function(e,n){return 0===Object.keys(e.report).length&&0===Object.keys(n.report).length?""===B(e.provider)?""===B(n.provider)?0:-1:1:Object.keys(n.report).length-Object.keys(e.report).length}))}function V(e){return void 0===e?"unknown":e.provider!==e.source?"$item.provider/$item.source":e.provider}function W(e){var n;return!(!e.remediation||!(e.remediation.fixedIn||null!==(n=e.remediation)&&void 0!==n&&n.trustedContent))}function Q(e){var n=[];return e.map((function(e){return{dependencyRef:e.ref,vulnerabilities:e.issues||[]}})).forEach((function(e){var r;null===(r=e.vulnerabilities)||void 0===r||r.forEach((function(r){r.cves&&r.cves.length>0?r.cves.forEach((function(i){n.push({id:i,dependencyRef:e.dependencyRef,vulnerability:r})})):n.push({id:r.id,dependencyRef:e.dependencyRef,vulnerability:r})}))})),n.sort((function(e,n){return n.vulnerability.cvssScore-e.vulnerability.cvssScore}))}var K=r(6155),q="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMTIgMTMiIGlkPSJTZWN1cml0eUNoZWNrSWNvbiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDx0aXRsZT5Db21iaW5lZCBTaGFwZTwvdGl0bGU+CiAgICA8ZyBpZD0iTXVsdGktdmVuZG9yIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iT3ZlcnZpZXctQ29weSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyMDcsIC05OTMpIiBmaWxsPSIjM0U4NjM1Ij4KICAgICAgICAgICAgPGcgaWQ9IkRldGFpbHMtb2YtZGVwZW5kZW5jeS1jb20uZ2l0aHViIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MjcsIDgxOSkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IkRlcGVuZGVuY3ktMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwgMTQ0KSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc4MC4xNzI4LCAyNCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwgMy4yKSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iSWNvbnMvMi4tU2l6ZS1zbS9BY3Rpb25zL2NoZWNrIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLCAyLjgpIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAuNTU2NTc4OSwwIEMxMC43OTA2MjQ5LDAgMTAuOTc5MzMyMiwwLjE4MTU0Mjk2OSAxMC45NzkzMzIyLDAuNDA2MjUgTDEwLjk3OTMzMjIsNS43NDA4MjAzMSBDMTAuOTc5MzMyMiw5Ljc1IDYuMjQwODE5MDcsMTMgNS40OTU3OTI5NiwxMyBDNC43NTA3NjY4NCwxMyAwLDkuNzUgMCw1LjczOTU1MDc4IEwwLDAuNDA2MjUgQzAsMC4xODE1NDI5NjkgMC4xODg3MDcyNzIsMCAwLjQyMjc1MzMwNCwwIFogTTguNTQyNzc4ODMsMy4xMTc4MjY2NyBMNC43OTEyOTYxLDYuODkwODczNTMgTDMuMDM5ODEzMzgsNS4xMjkzMjQ0IEMyLjg4MzYwOSw0Ljk3MjIwNjgzIDIuNjMwMzI4MTIsNC45NzIyMDY4MyAyLjQ3NDEyMzc1LDUuMTI5MzI0NCBMMS45MDg0NDkzOCw1LjY5ODI2NTU2IEMxLjc1MjI0NTAxLDUuODU1MzgzMTIgMS43NTIyNDUwMSw2LjExMDEwNDQ5IDEuOTA4NDQ5MzgsNi4yNjcyMDY3MSBMNC41MDg0NTc5Nyw4Ljg4MjE1OTkxIEM0LjY2NDY0NzA4LDkuMDM5Mjc3NDcgNC45MTc5MTI3LDkuMDM5Mjc3NDcgNS4wNzQxMzIzMyw4Ljg4MjE3NTI1IEw5LjY3NDE0MjgyLDQuMjU1NzA4OTggQzkuODMwMzQ3Miw0LjA5ODU5MTQxIDkuODMwMzQ3MiwzLjg0Mzg3MDA0IDkuNjc0MTQyODIsMy42ODY3Njc4MiBMOS4xMDg0Njg0NiwzLjExNzgyNjY3IEM4Ljk1MjI2NDA4LDIuOTYwNzI0NDQgOC42OTg5ODMyLDIuOTYwNzI0NDQgOC41NDI3Nzg4MywzLjExNzgyNjY3IFoiIGlkPSJDb21iaW5lZC1TaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",X=function(){var e=ln();return(0,T.jsxs)(s.r,{hasGutter:!0,children:[(0,T.jsxs)(o.D,{headingLevel:"h3",size:o.H["2xl"],style:{paddingLeft:"15px"},children:[(0,T.jsx)(l.J,{isInline:!0,status:"info",children:(0,T.jsx)(C.ZP,{style:{fill:"#f0ab00"}})}),"\xa0Red Hat Overview of security Issues"]}),(0,T.jsx)(d.i,{}),(0,T.jsx)(c.P,{children:(0,T.jsxs)(u.Z,{isFlat:!0,isFullHeight:!0,children:[(0,T.jsx)(h.O,{children:(0,T.jsx)(g.l,{children:(0,T.jsx)(v.M,{style:{fontSize:"large"},children:"Vendor Issues"})})}),(0,T.jsxs)(x.e,{children:[(0,T.jsx)(p.g,{children:(0,T.jsx)(j.b,{children:(0,T.jsx)(v.M,{children:"Below is a list of dependencies affected with CVE."})})}),(0,T.jsx)(m.o,{isAutoFit:!0,style:{paddingTop:"10px"},children:_(e.report).map((function(e,n){return(0,T.jsxs)(p.g,{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,T.jsx)(T.Fragment,{children:(0,T.jsx)(v.M,{style:{fontSize:"large"},children:V(e)})}),(0,T.jsx)(j.b,{children:(0,T.jsx)(w,{summary:e.report.summary})})]},n)}))})]}),(0,T.jsx)(d.i,{})]})}),(0,T.jsxs)(c.P,{md:6,children:[(0,T.jsx)(u.Z,{isFlat:!0,children:(0,T.jsxs)(p.g,{children:[(0,T.jsx)(g.l,{component:"h4",children:(0,T.jsxs)(v.M,{style:{fontSize:"large"},children:[(0,T.jsx)(l.J,{isInline:!0,status:"info",children:(0,T.jsx)(K.ZP,{style:{fill:"#cc0000"}})}),"\xa0 Red Hat Remediations"]})}),(0,T.jsx)(x.e,{children:(0,T.jsx)(j.b,{children:(0,T.jsx)(f.aV,{isPlain:!0,children:_(e.report).map((function(e,n){return Object.keys(e.report).length>0?(0,T.jsxs)(y.H,{children:[(0,T.jsx)(l.J,{isInline:!0,status:"success",children:(0,T.jsx)("img",{src:q,alt:"Security Check Icon"})}),"\xa0",e.report.summary.remediations," remediations are available from Red Hat for ",e.provider]}):(0,T.jsxs)(y.H,{children:[(0,T.jsx)(l.J,{isInline:!0,status:"success",children:(0,T.jsx)("img",{src:q,alt:"Security Check Icon"})}),"\xa0 There are no available Red Hat remediations for your SBOM at this time for ",e.provider]})}))})})})]})}),"\xa0"]}),(0,T.jsxs)(c.P,{md:6,children:[(0,T.jsx)(u.Z,{isFlat:!0,children:(0,T.jsxs)(p.g,{children:[(0,T.jsx)(g.l,{component:"h4",children:(0,T.jsx)(v.M,{style:{fontSize:"large"},children:"Join to explore Red Hat TPA"})}),(0,T.jsx)(x.e,{children:(0,T.jsx)(j.b,{children:(0,T.jsxs)(f.aV,{isPlain:!0,children:[(0,T.jsx)(y.H,{children:"Check out our new Trusted Profile Analyzer to get visibility and insight into your software risk profile, for instance by exploring vulnerabilites or analyzing SBOMs."}),(0,T.jsx)(y.H,{children:(0,T.jsx)("a",{href:"https://console.redhat.com/application-services/trusted-content",target:"_blank",rel:"noopener noreferrer",children:(0,T.jsx)(I.zx,{variant:"primary",size:"sm",children:"Take me there"})})})]})})})]})}),"\xa0"]})]})},$=r(2933),ee=function(){var e=ln(),n=Object.keys(e.report.providers).map((function(n){return e.report.providers[n].status})).filter((function(e){return!e.ok&&!(!(n=e).ok&&401===n.code&&"Unauthenticated"===n.message&&z.includes(n.name));var n}));return(0,T.jsx)(T.Fragment,{children:n.map((function(e,n){return(0,T.jsx)($.b,{variant:e.code>=500?$.U.danger:e.code>=400?$.U.warning:void 0,title:"".concat(Y(e.name),": ").concat(e.message)},n)}))})},ne=r(885),re=r(6081),ie=r(4817),te=r(6467),ae=r(1413),se=r(9809),ce=r(382),oe=r(8521),le=r(2e3),de=r(6989),ue=r(2401),he=r(6496),ge=r(8987),ve=r(9623),xe=r(9626),pe=r(205),je=r(3610),me=r(7990),fe=r(5091),ye=r(6056),Ie=r(1915),Ce=r(1178),be=r(7102),Me=r(2982),Te=r(1917),Ae=function(e){return e[e.SET_PAGE=0]="SET_PAGE",e[e.SET_SORT_BY=1]="SET_SORT_BY",e}(Ae||{}),we={changed:!1,currentPage:{page:1,perPage:10},sortBy:void 0},Se=function(e,n){switch(n.type){case Ae.SET_PAGE:var r=n.payload;return(0,ae.Z)((0,ae.Z)({},e),{},{changed:!0,currentPage:{page:r.page,perPage:r.perPage}});case Ae.SET_SORT_BY:var i=n.payload;return(0,ae.Z)((0,ae.Z)({},e),{},{changed:!0,sortBy:{index:i.index,direction:i.direction}});default:return e}},De=r(9960),Ne=r(500),Pe=function(e){var n,r=e.count,i=e.params,t=e.isTop,a=(e.isCompact,e.perPageOptions),s=e.onChange,c=function(){return i.perPage||10};return(0,T.jsx)(De.t,{itemCount:r,page:i.page||1,perPage:c(),onPageInput:function(e,n){s({page:n,perPage:c()})},onSetPage:function(e,n){s({page:n,perPage:c()})},onPerPageSelect:function(e,n){s({page:1,perPage:n})},widgetId:"pagination-options-menu",variant:t?De.a.top:De.a.bottom,perPageOptions:(n=a||[10,20,50,100],n.map((function(e){return{title:String(e),value:e}}))),toggleTemplate:function(e){return(0,T.jsx)(Ne.v,(0,ae.Z)({},e))}})},ke=function(e){var n=e.name,r=e.showVersion,i=void 0!==r&&r;return(0,T.jsx)(T.Fragment,{children:(0,T.jsx)("a",{href:G(n),target:"_blank",rel:"noreferrer",children:F(n,i)})})},Oe=r(164),Ze=r(5020),Le=r(8649),ze=r(7514),Ee=function(e){var n=e.numRenderedColumns,r=e.isLoading,i=void 0!==r&&r,t=e.isError,a=void 0!==t&&t,s=e.isNoData,c=void 0!==s&&s,l=e.errorEmptyState,d=void 0===l?null:l,u=e.noDataEmptyState,h=void 0===u?null:u,g=e.children,v=(0,T.jsxs)(se.u,{variant:se.I.sm,children:[(0,T.jsx)(oe.k,{icon:Le.ZP,color:ze.a.value}),(0,T.jsx)(o.D,{headingLevel:"h2",size:"lg",children:"Unable to connect"}),(0,T.jsx)(le.B,{children:"There was an error retrieving data. Check your connection and try again."})]}),x=(0,T.jsxs)(se.u,{variant:se.I.sm,children:[(0,T.jsx)(oe.k,{icon:Ze.ZP}),(0,T.jsx)(o.D,{headingLevel:"h2",size:"lg",children:"No data available"}),(0,T.jsx)(le.B,{children:"No data available to be shown here."})]});return(0,T.jsx)(T.Fragment,{children:i?(0,T.jsx)(ye.p,{children:(0,T.jsx)(me.Tr,{children:(0,T.jsx)(Ie.Td,{colSpan:n,children:(0,T.jsx)(b.b,{children:(0,T.jsx)(Oe.$,{size:"xl"})})})})}):a?(0,T.jsx)(ye.p,{"aria-label":"Table error",children:(0,T.jsx)(me.Tr,{children:(0,T.jsx)(Ie.Td,{colSpan:n,children:(0,T.jsx)(b.b,{children:d||v})})})}):c?(0,T.jsx)(ye.p,{"aria-label":"Table no data",children:(0,T.jsx)(me.Tr,{children:(0,T.jsx)(Ie.Td,{colSpan:n,children:(0,T.jsx)(b.b,{children:h||x})})})}):g})},Be=function(e){var n=e.packageName;e.cves;return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(l.J,{isInline:!0,status:"success",children:(0,T.jsx)("img",{src:q,alt:"Security Check Icon"})}),"\xa0",(0,T.jsx)("a",{href:R(n),target:"_blank",rel:"noreferrer",children:H(n)})]})},Fe=function(){var e=ln().providerPrivateData;return{hideIssue:function(n,r){return!(!e||-1===e.indexOf(n))&&r}}},Re=function(e){var n,r,i,t=e.sourceName,a=e.vulnerability,s=Fe(),c=ln();return(0,T.jsx)(T.Fragment,{children:s.hideIssue(t,a.unique)?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)("a",{href:c.snykSignup,target:"_blank",rel:"noreferrer",children:"Sign up for a Snyk account"})," ","to learn about the vulnerabilities found"]}):"snyk"!==t||null!==(null===(n=a.remediation)||void 0===n?void 0:n.fixedIn)&&0!==(null===(r=a.remediation)||void 0===r||null===(i=r.fixedIn)||void 0===i?void 0:i.length)?(0,T.jsx)("a",{href:U(t,a.id,c),target:"_blank",rel:"noreferrer",children:a.id}):(0,T.jsx)("p",{})})},Ge=r(736),He=r(5351),Ue=r(975),Ye=r(6647),Je=function(e){var n,r=e.vulnerability;switch(r.severity){case"CRITICAL":case"HIGH":n=Ge.n9.danger;break;default:n=Ge.n9.warning}return(0,T.jsx)(T.Fragment,{children:(0,T.jsx)(He.P,{hasGutter:!0,children:(0,T.jsx)(Ue.J,{isFilled:!0,children:(0,T.jsx)(Ye.E,{title:"".concat(r.cvssScore,"/10"),"aria-label":"cvss-score",value:r.cvssScore,min:0,max:10,size:Ye.L.sm,variant:n,measureLocation:Ge.nK.none})})})})},_e=r(313),Ve=function(e){var n,r=e.vulnerability;switch(r.severity){case"CRITICAL":n="#800000";break;case"HIGH":n="#FF0000";break;case"MEDIUM":n="#FFA500";break;case"LOW":n="#5BA352";break;default:n="grey"}return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(l.J,{isInline:!0,children:(0,T.jsx)(_e.ZP,{style:{fill:n,height:"13px"}})}),"\xa0",Y(r.severity)]})},We=function(e){var n,r,i=e.id,t=ln();return(0,T.jsx)("a",{href:(n=i,r=t,r.cveIssueTemplate.replace(Z,n)),target:"_blank",rel:"noreferrer",children:i})},Qe=r(4150),Ke=function(e){var n=e.title,r=i.useState(!1),t=(0,ne.Z)(r,2),a=t[0],s=t[1];return(0,T.jsx)(Qe.L,{variant:Qe.S.truncate,toggleText:a?"Show less":"Show more",onToggle:function(e,n){s(n)},isExpanded:a,children:n})},qe=function(e){var n,r,i,t,a,s=e.item,c=e.providerName,o=e.rowIndex;a=s.vulnerability.cves&&s.vulnerability.cves.length>0?s.vulnerability.cves:[s.vulnerability.id];var l=Fe().hideIssue(c,s.vulnerability.unique),d=ln();return(0,T.jsxs)(me.Tr,{children:[l?(0,T.jsx)(T.Fragment,{children:(0,T.jsx)(Ie.Td,{colSpan:3,children:(0,T.jsx)("a",{href:d.snykSignup,target:"_blank",rel:"noreferrer",children:"Sign up for a Snyk account to learn about the vulnerabilities found"})})}):(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(Ie.Td,{children:a.map((function(e,n){return(0,T.jsx)("p",{children:(0,T.jsx)(We,{id:e})},n)}))}),(0,T.jsx)(Ie.Td,{children:(0,T.jsx)(Ke,{title:s.vulnerability.title})}),(0,T.jsx)(Ie.Td,{noPadding:!0,children:(0,T.jsx)(Ve,{vulnerability:s.vulnerability})})]}),(0,T.jsx)(Ie.Td,{children:(0,T.jsx)(Je,{vulnerability:s.vulnerability})}),(0,T.jsx)(Ie.Td,{children:(0,T.jsx)(ke,{name:s.dependencyRef,showVersion:!0})}),(0,T.jsx)(Ie.Td,{children:null!==(n=s.vulnerability.remediation)&&void 0!==n&&n.trustedContent?(0,T.jsx)(Be,{cves:s.vulnerability.cves||[],packageName:null===(r=s.vulnerability.remediation)||void 0===r||null===(i=r.trustedContent)||void 0===i?void 0:i.ref},o):null!==(t=s.vulnerability.remediation)&&void 0!==t&&t.fixedIn?(0,T.jsx)(Re,{sourceName:c,vulnerability:s.vulnerability}):W(s.vulnerability)?null:(0,T.jsx)("span",{})})]},o)},Xe=function(e){var n=e.providerName,r=e.transitiveDependencies;return(0,T.jsx)(u.Z,{style:{backgroundColor:"var(--pf-v5-global--BackgroundColor--100)"},children:(0,T.jsxs)(xe.i,{variant:pe.B.compact,children:[(0,T.jsx)(je.h,{children:(0,T.jsxs)(me.Tr,{children:[(0,T.jsx)(fe.Th,{width:15,children:"Vulnerability ID"}),(0,T.jsx)(fe.Th,{width:20,children:"Description"}),(0,T.jsx)(fe.Th,{width:10,children:"Severity"}),(0,T.jsx)(fe.Th,{width:15,children:"CVSS Score"}),(0,T.jsx)(fe.Th,{width:20,children:"Transitive Dependency"}),(0,T.jsx)(fe.Th,{width:20,children:"Remediation"})]})}),(0,T.jsx)(Ee,{isNoData:0===r.length,numRenderedColumns:7,children:Q(r).map((function(e,r){return(0,T.jsx)(ye.p,{children:(0,T.jsx)(qe,{item:e,providerName:n,rowIndex:r})},r)}))})]})})},$e=function(e){var n=e.providerName,r=e.dependency,i=e.vulnerabilities;return(0,T.jsx)(u.Z,{style:{backgroundColor:"var(--pf-v5-global--BackgroundColor--100)"},children:(0,T.jsxs)(xe.i,{variant:pe.B.compact,children:[(0,T.jsx)(je.h,{children:(0,T.jsxs)(me.Tr,{children:[(0,T.jsx)(fe.Th,{width:15,children:"Vulnerability ID"}),(0,T.jsx)(fe.Th,{width:20,children:"Description"}),(0,T.jsx)(fe.Th,{width:10,children:"Severity"}),(0,T.jsx)(fe.Th,{width:15,children:"CVSS Score"}),(0,T.jsx)(fe.Th,{width:20,children:"Direct Dependency"}),(0,T.jsx)(fe.Th,{width:20,children:"Remediation"})]})}),(0,T.jsx)(Ee,{isNoData:0===i.length,numRenderedColumns:6,children:null===i||void 0===i?void 0:i.map((function(e,i){var t=[];return e.cves&&e.cves.length>0?e.cves.forEach((function(e){return t.push(e)})):e.unique&&t.push(e.id),(0,T.jsx)(ye.p,{children:t.map((function(t,a){return(0,T.jsx)(qe,{item:{id:e.id,dependencyRef:r.ref,vulnerability:e},providerName:n,rowIndex:i},"".concat(i,"-").concat(a))}))},i)}))})]})})},en=r(3566),nn=function(e){var n=e.vulnerabilities,r=void 0===n?[]:n,i=e.transitiveDependencies,t=void 0===i?[]:i,a={CRITICAL:0,HIGH:0,MEDIUM:0,LOW:0};return r.length>0?r.forEach((function(e){var n=e.severity;a.hasOwnProperty(n)&&a[n]++})):null===t||void 0===t||t.forEach((function(e){var n;null===(n=e.issues)||void 0===n||n.forEach((function(e){var n=e.severity;a.hasOwnProperty(n)&&a[n]++}))})),(0,T.jsxs)(en.B,{children:[a.CRITICAL>0&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(l.J,{isInline:!0,children:(0,T.jsx)(_e.ZP,{style:{fill:"#800000",height:"13px"}})}),"\xa0",a.CRITICAL,"\xa0"]}),a.HIGH>0&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(l.J,{isInline:!0,children:(0,T.jsx)(_e.ZP,{style:{fill:"#FF0000",height:"13px"}})}),"\xa0",a.HIGH,"\xa0"]}),a.MEDIUM>0&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(l.J,{isInline:!0,children:(0,T.jsx)(_e.ZP,{style:{fill:"#FFA500",height:"13px"}})}),"\xa0",a.MEDIUM,"\xa0"]}),a.LOW>0&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(l.J,{isInline:!0,children:(0,T.jsx)(_e.ZP,{style:{fill:"#5BA352",height:"13px"}})}),"\xa0",a.LOW]})]})},rn=r(6934),tn=function(e){var n,r,i=e.dependency,t=null===(n=i.issues)||void 0===n?void 0:n.some((function(e){return W(e)})),a=(null===(r=i.transitive)||void 0===r?void 0:r.some((function(e){var n;return null===(n=e.issues)||void 0===n?void 0:n.some((function(e){return W(e)}))})))||!1;return(0,T.jsx)(T.Fragment,{children:t||a?"Yes":"No"})},an=function(e){var n=e.name,r=e.dependencies,t=(0,i.useState)(""),a=(0,ne.Z)(t,2),s=a[0],c=a[1],o=function(e){var n=(0,i.useReducer)(Se,(0,ae.Z)((0,ae.Z)({},we),{},{currentPage:e&&e.page?(0,ae.Z)({},e.page):(0,ae.Z)({},we.currentPage),sortBy:e&&e.sortBy?(0,ae.Z)({},e.sortBy):we.sortBy})),r=(0,ne.Z)(n,2),t=r[0],a=r[1],s=(0,i.useCallback)((function(e){var n;a({type:Ae.SET_PAGE,payload:{page:e.page>=1?e.page:1,perPage:null!==(n=e.perPage)&&void 0!==n?n:we.currentPage.perPage}})}),[]),c=(0,i.useCallback)((function(e,n,r,i){a({type:Ae.SET_SORT_BY,payload:{index:n,direction:r}})}),[]);return{page:t.currentPage,sortBy:t.sortBy,changePage:s,changeSortBy:c}}(),l=o.page,h=o.sortBy,g=o.changePage,v=o.changeSortBy,p=function(e){var n=e.items,r=e.currentSortBy,t=e.currentPage,a=e.filterItem,s=e.compareToByColumn;return(0,i.useMemo)((function(){var e,i=(0,Me.Z)(n||[]).filter(a),c=!1;return e=(0,Me.Z)(i).sort((function(e,n){var i=s(e,n,null===r||void 0===r?void 0:r.index);return 0!==i&&(c=!0),i})),c&&(null===r||void 0===r?void 0:r.direction)===Te.B.desc&&(e=e.reverse()),{pageItems:e.slice((t.page-1)*t.perPage,t.page*t.perPage),filteredItems:i}}),[n,t,r,s,a])}({items:r,currentPage:l,currentSortBy:h,compareToByColumn:function(e,n,r){return 1===r?e.ref.localeCompare(n.ref):0},filterItem:function(e){var n=!0;return s&&s.trim().length>0&&(n=-1!==e.ref.toLowerCase().indexOf(s.toLowerCase())),n}}),j=p.pageItems,m=p.filteredItems,f={name:"Dependency Name",version:"Current Version",direct:"Direct Vulnerabilities",transitive:"Transitive Vulnerabilities",rhRemediation:"Remediation available"},y=i.useState({"siemur/test-space":"name"}),C=(0,ne.Z)(y,2),b=C[0],M=C[1],A=function(e,n,r,i){return{isExpanded:b[e.ref]===n,onToggle:function(){return function(e,n){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=(0,ae.Z)({},b);r?i[e.ref]=n:delete i[e.ref],M(i)}(e,n,b[e.ref]!==n)},expandId:"compound-expandable-example",rowIndex:r,columnIndex:i}};return(0,T.jsx)(u.Z,{children:(0,T.jsx)(x.e,{children:(0,T.jsx)("div",{style:{backgroundColor:"var(--pf-v5-global--BackgroundColor--100)"},children:""!==B(n)&&void 0===r?(0,T.jsx)("div",{children:(0,T.jsxs)(se.u,{variant:se.I.sm,children:[(0,T.jsx)(ce.t,{icon:(0,T.jsx)(oe.k,{icon:Ze.ZP}),titleText:"Set up "+n,headingLevel:"h2"}),(0,T.jsxs)(le.B,{children:["You need to provide a valid credentials to see ",n," data. You can use the button below to sing-up for ",n,". If you have already signed up, enter your credentials in your extension settings and then regenerate the Dependency Analytics report."]}),(0,T.jsx)("br",{}),(0,T.jsx)("br",{}),(0,T.jsx)("a",{href:B(n),target:"_blank",rel:"noopener noreferrer",children:(0,T.jsxs)(I.zx,{variant:"primary",size:"sm",children:["Sign up for ",n]})})]})}):(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(de.o,{children:(0,T.jsxs)(ue.c,{children:[(0,T.jsx)(he.R,{toggleIcon:(0,T.jsx)(be.ZP,{}),breakpoint:"xl",children:(0,T.jsx)(ge.E,{variant:"search-filter",children:(0,T.jsx)(ve.M,{style:{width:"250px"},placeholder:"Filter by Dependency name",value:s,onChange:function(e,n){return c(n)},onClear:function(){return c("")}})})}),(0,T.jsx)(ge.E,{variant:ge.A.pagination,align:{default:"alignRight"},children:(0,T.jsx)(Pe,{isTop:!0,count:m.length,params:l,onChange:g})})]})}),(0,T.jsxs)(xe.i,{"aria-label":"Compound expandable table",variant:pe.B.compact,children:[(0,T.jsx)(je.h,{children:(0,T.jsxs)(me.Tr,{children:[(0,T.jsx)(fe.Th,{width:25,sort:{columnIndex:1,sortBy:(0,ae.Z)({},h),onSort:v},children:f.name}),(0,T.jsx)(fe.Th,{children:f.version}),(0,T.jsx)(fe.Th,{children:f.direct}),(0,T.jsx)(fe.Th,{children:f.transitive}),(0,T.jsx)(fe.Th,{children:f.rhRemediation})]})}),(0,T.jsx)(Ee,{isNoData:0===m.length,numRenderedColumns:8,noDataEmptyState:(0,T.jsxs)(se.u,{variant:se.I.sm,children:[(0,T.jsx)(ce.t,{icon:(0,T.jsx)(oe.k,{icon:rn.ZP}),titleText:"No results found",headingLevel:"h2"}),(0,T.jsx)(le.B,{children:"Clear all filters and try again."})]}),children:null===j||void 0===j?void 0:j.map((function(e,r){var i,t,a,s,c,o=b[e.ref],l=!!o;return null!==(i=e.issues)&&void 0!==i&&i.length||null!==(t=e.transitive)&&void 0!==t&&t.length?(0,T.jsxs)(ye.p,{isExpanded:l,children:[(0,T.jsxs)(me.Tr,{children:[(0,T.jsx)(Ie.Td,{width:30,dataLabel:f.name,component:"th",children:(0,T.jsx)(ke,{name:e.ref})}),(0,T.jsx)(Ie.Td,{width:15,dataLabel:f.version,children:H(e.ref)}),(0,T.jsx)(Ie.Td,{width:15,dataLabel:f.direct,compoundExpand:A(e,"direct",r,2),children:null!==(a=e.issues)&&void 0!==a&&a.length?(0,T.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,T.jsx)("div",{style:{width:"25px"},children:null===(s=e.issues)||void 0===s?void 0:s.length}),(0,T.jsx)(d.i,{orientation:{default:"vertical"},style:{paddingRight:"10px"}}),(0,T.jsx)(nn,{vulnerabilities:e.issues})]}):0}),(0,T.jsx)(Ie.Td,{width:15,dataLabel:f.transitive,compoundExpand:A(e,"transitive",r,3),children:null!==(c=e.transitive)&&void 0!==c&&c.length?(0,T.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,T.jsx)("div",{style:{width:"25px"},children:e.transitive.map((function(e){var n;return null===(n=e.issues)||void 0===n?void 0:n.length})).reduce((function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:0)+(arguments.length>1&&void 0!==arguments[1]?arguments[1]:0)}))}),(0,T.jsx)(d.i,{orientation:{default:"vertical"},style:{paddingRight:"10px"}}),(0,T.jsx)(nn,{transitiveDependencies:e.transitive})]}):0}),(0,T.jsx)(Ie.Td,{width:15,dataLabel:f.rhRemediation,children:(0,T.jsx)(tn,{dependency:e})})]}),l?(0,T.jsx)(me.Tr,{isExpanded:l,children:(0,T.jsx)(Ie.Td,{dataLabel:f[o],noPadding:!0,colSpan:6,children:(0,T.jsx)(Ce.G,{children:(0,T.jsx)("div",{className:"pf-v5-u-m-md",children:"direct"===o&&e.issues&&e.issues.length>0?(0,T.jsx)($e,{providerName:n,dependency:e,vulnerabilities:e.issues}):"transitive"===o&&e.transitive&&e.transitive.length>0?(0,T.jsx)(Xe,{providerName:n,transitiveDependencies:e.transitive}):null})})})}):null]},e.ref):null}))})]}),(0,T.jsx)(Pe,{isTop:!1,count:m.length,params:l,onChange:g})]})})})})},sn=function(){var e=_(ln().report),n=i.useState(V(e[0])),r=(0,ne.Z)(n,2),t=r[0],s=r[1],c=i.useState(!0),o=(0,ne.Z)(c,1)[0],l=e.map((function(e){var n=V(e);return(0,T.jsx)(re.O,{eventKey:n,title:(0,T.jsx)(ie.T,{children:n}),"aria-label":"".concat(n," source"),children:(0,T.jsx)(a.NP,{variant:a.Dk.default,children:(0,T.jsx)(an,{name:n,dependencies:e.report.dependencies})})})}));return(0,T.jsx)("div",{children:(0,T.jsx)(te.m,{activeKey:t,onSelect:function(e,n){s(n)},"aria-label":"Providers",role:"region",variant:o?"light300":"default",isBox:!0,children:l})})},cn=window.appData,on=(0,i.createContext)(cn),ln=function(){return(0,i.useContext)(on)};var dn=function(){return(0,T.jsxs)(on.Provider,{value:cn,children:[(0,T.jsx)(ee,{}),(0,T.jsx)(a.NP,{variant:a.Dk.light,children:(0,T.jsx)(s.r,{hasGutter:!0,children:(0,T.jsx)(c.P,{children:(0,T.jsx)(X,{})})})}),(0,T.jsx)(a.NP,{variant:a.Dk.default,children:(0,T.jsx)(sn,{})})]})},un=function(e){e&&e instanceof Function&&r.e(736).then(r.bind(r,599)).then((function(n){var r=n.getCLS,i=n.getFID,t=n.getFCP,a=n.getLCP,s=n.getTTFB;r(e),i(e),t(e),a(e),s(e)}))};t.createRoot(document.getElementById("root")).render((0,T.jsx)(i.StrictMode,{children:(0,T.jsx)(dn,{})})),un()}},n={};function r(i){var t=n[i];if(void 0!==t)return t.exports;var a=n[i]={id:i,loaded:!1,exports:{}};return e[i](a,a.exports,r),a.loaded=!0,a.exports}r.m=e,function(){var e=[];r.O=function(n,i,t,a){if(!i){var s=1/0;for(d=0;d<e.length;d++){i=e[d][0],t=e[d][1],a=e[d][2];for(var c=!0,o=0;o<i.length;o++)(!1&a||s>=a)&&Object.keys(r.O).every((function(e){return r.O[e](i[o])}))?i.splice(o--,1):(c=!1,a<s&&(s=a));if(c){e.splice(d--,1);var l=t();void 0!==l&&(n=l)}}return n}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[i,t,a]}}(),r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,{a:n}),n},r.d=function(e,n){for(var i in n)r.o(n,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},r.e=function(){return Promise.resolve()},r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},function(){var e={179:0};r.O.j=function(n){return 0===e[n]};var n=function(n,i){var t,a,s=i[0],c=i[1],o=i[2],l=0;if(s.some((function(n){return 0!==e[n]}))){for(t in c)r.o(c,t)&&(r.m[t]=c[t]);if(o)var d=o(r)}for(n&&n(i);l<s.length;l++)a=s[l],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(d)},i=self.webpackChunkui=self.webpackChunkui||[];i.forEach(n.bind(null,0)),i.push=n.bind(null,i.push.bind(i))}();var i=r.O(void 0,[736],(function(){return r(7566)}));i=r.O(i)}();