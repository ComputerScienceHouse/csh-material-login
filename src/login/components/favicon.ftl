<link rel="apple-touch-icon" sizes="180x180" href="${url.resourcesPath}/img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="${url.resourcesPath}/img/favicon/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="${url.resourcesPath}/img/favicon/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="${url.resourcesPath}/img/favicon/manifest.json">
    <link rel="mask-icon" href="${url.resourcesPath}/img/favicon/safari-pinned-tab.svg" color="#b0197e">
    <link rel="shortcut icon" href="${url.resourcesPath}/img/favicon/favicon.ico">
    <meta name="apple-mobile-web-app-title" content="<#compress><#nested 'title'></#compress>">
    <meta name="application-name" content="<#compress><#nested 'title'></#compress>">
    <meta name="msapplication-config" content="${url.resourcesPath}/img/favicon/browserconfig.xml">
    <#if properties.themeColor?has_content>
        <meta name="theme-color" content="${themeColor}">
    </#if>