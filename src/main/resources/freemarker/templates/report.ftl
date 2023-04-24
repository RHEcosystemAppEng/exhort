<html>
    <header>
        <title>CRDA Stack Report</title>
    </header>
    <body>
        <h1>Stack Report</h1>
<#list body>
        <ul>
<#items as dep>
            <li>${dep.ref().name()}:${dep.ref().version()}</li>
</#items>
        </ul>
<#else>
            No packages have been analised.
</#list>
    </body>
</html>