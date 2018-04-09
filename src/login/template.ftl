<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true>
<!doctype html>
<html lang="${properties.kcHtmlLang!}" class="${properties.kcHtmlClass!}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="robots" content="noindex, nofollow">

    <title><#compress><#nested "title"></#compress></title>

    <link rel="stylesheet" href="${url.resourcesPath}/css/login.css">

    {% include "login/components/favicon.ftl" %}

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
    <#if realm.internationalizationEnabled>
    <div id="kc-locale" class="${properties.kcLocaleClass!}">
        <div id="kc-locale-wrapper" class="${properties.kcLocaleWrapperClass!}">
            <div class="kc-dropdown" id="kc-locale-dropdown">
                <a href="#" id="kc-current-locale-link">${locale.current}</a>
                <ul>
                    <#list locale.supported as l>
                        <li class="kc-dropdown-item"><a href="${l.url}">${l.label}</a></li>
                    </#list>
                </ul>
            </div>
        </div>
    </div>
    </#if>

    <section class="login">
        <div class="container" id="login-box">
            <noscript>
                {% include "common/resources/img/logo.svg" %}
            </noscript>
            <div class="panel panel-default">
                <div class="panel-body">
                    <#if displayMessage && message?has_content>
                        <#if message.type = 'error'>
                            <div class="alert alert-info" role="alert">
                                Having trouble logging in? Try <a href="https://stone.csh.rit.edu/migrate" target="_blank">migrating your account</a>.
                            </div>
                        </#if>
                        <div class="feedback feedback-${message.type}">
                            <#if message.type = 'success'><span class="glyphicon glyphicon-ok-sign"></span></#if>
                            <#if message.type = 'warning'><span class="glyphicon glyphicon-exclamation-sign"></span></#if>
                            <#if message.type = 'error'><span class="glyphicon glyphicon-remove-sign"></span></#if>
                            <#if message.type = 'info'><span class="glyphicon glyphicon-info-sign"></span></#if>
                            ${message.summary}
                        </div>
                    </#if>
                    <#if displayInfo>
                        <div class="feedback">
                            <#nested "info">
                        </div>
                    </#if>
                    <#nested "form">
                </div>
                <#nested "footer">
            </div>
        </div>
    </section>

    <div id="themes"></div>

    <script src="${url.resourcesPath}/js/themes.js" type="text/javascript"></script>
</body>
</html>
</#macro>
