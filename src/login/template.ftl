<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false displayWide=false showAnotherWayIfPresent=true>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="${properties.kcHtmlClass!}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">
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
    <meta name="theme-color" content="#${properties.themeColor}">
    </#if>

    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <#if properties.stylesCommon?has_content>
        <#list properties.stylesCommon?split(' ') as style>
            <link href="${url.resourcesCommonPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>

    <% for (let chunk = 0; chunk < htmlWebpackPlugin.files.css.length; chunk++) { %>
    <link rel="stylesheet" href="<%= htmlWebpackPlugin.files.css[chunk].replace('resources', '${url.resourcesPath}') %>" integrity="<%= htmlWebpackPlugin.files.cssIntegrity[chunk] %>" crossorigin="<%= webpackConfig.output.crossOriginLoading %>">
    <% } %>
</head>

<body class="${properties.kcBodyClass!}">
  <div class="${properties.kcWrapperClass!}">
    <div class="${properties.kcLoginClass!}">
      <div id="kc-header" class="${properties.kcHeaderClass!}">
        <div id="kc-header-wrapper" class="${properties.kcHeaderWrapperClass!}">
          <div id="logo">
            <svg class="logo" viewBox="0 0 1740 526" xmlns="http://www.w3.org/2000/svg">
                <path d="M420 135V0H0v525h420V390h-90v45H90V90h240v45h90" id="Fill-1"/>
                <path d="M240 196.85h60V120H120v172.5h120V345h-60v-14.1h-60V405h180V232.5H180V180h60v16.85" id="Fill-2"/>
                <path d="M420 300v60h-90V165h90v60h30V0h90v525h-90V300h-30" id="Fill-3"/>
                <path d="M675 15V0h-90v15h-15v105h15v15h90v-15h15V90h-30v15h-60V30h60v15h30V15h-15" id="Fill-4"/>
                <path d="M1425 210v-15h-90v15h-15v105h15v15h90v-15h15v-30h-30v15h-60v-75h60v15h30v-30h-15" id="Fill-5"/>
                <path d="M825 210v-15h-90v15h-15v105h15v15h90v-15h15v-30h-30v15h-60v-75h60v15h30v-30h-15" id="Fill-6"/>
                <path d="M825 15V0h-90v15h-15v105h15v15h90v-15h15V15h-15zm-75 15h60v75h-60V30z" id="Fill-7"/>
                <path d="M825 405v-15h-90v15h-15v105h15v15h90v-15h15V405h-15zm-75 15h60v75h-60v-75z" id="Fill-8"/>
                <path d="M960 0v15h-15v15h-30V15h-15V0h-30v135h30V45h15v15h30V45h15v90h30V0h-30" id="Fill-9"/>
                <path d="M1125 15V0h-105v135h30V90h75V75h15V15h-15zm-75 15h60v30h-60V30z" id="Fill-10"/>
                <path d="M1260 0v105h-60V0h-30v120h15v15h90v-15h15V0h-30" id="Fill-11"/>
                <path d="M960 390v105h-60V390h-30v120h15v15h90v-15h15V390h-30" id="Fill-12"/>
                <path d="M1320 0v30h45v105h30V30h45V0h-120" id="Fill-13"/>
                <path d="M870 195v30h45v75h-45v30h120v-30h-45v-75h45v-30H870" id="Fill-14"/>
                <path d="M1470 0v135h120v-30h-90V90h60V60h-60V30h90V0h-120" id="Fill-15"/>
                <path d="M1470 195v135h120v-30h-90v-15h60v-30h-60v-30h90v-30h-120" id="Fill-16"/>
                <path d="M1020 195v135h120v-30h-90v-15h60v-30h-60v-30h90v-30h-120" id="Fill-17"/>
                <path d="M1170 390v135h120v-30h-90v-15h60v-30h-60v-30h90v-30h-120" id="Fill-18"/>
                <path d="M1725 15V0h-105v135h30V90h60v45h30V90h-15V75h15V15h-15zm-75 15h60v30h-60V30z" id="Fill-19"/>
                <path d="M1260 195v75h-15v-15h-15v-15h-15v-15h-15v-30h-30v135h30v-75h15v15h15v15h15v15h15v30h30V195h-30" id="Fill-20"/>
                <path d="M690 225v-30H585v15h-15v45h15v15h45v15h30v15h-90v30h105v-15h15v-45h-15v-15h-45v-15h-30v-15h90" id="Fill-21"/>
                <path d="M1140 420v-30h-105v15h-15v45h15v15h45v15h30v15h-90v30h105v-15h15v-45h-15v-15h-45v-15h-30v-15h90" id="Fill-22"/>
                <path d="M660 390v60h-60v-60h-30v135h30v-45h60v45h30V390h-30" id="Fill-23"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="${properties.kcFormCardClass!} <#if displayWide>${properties.kcFormCardAccountClass!}</#if>">
        <#if !(auth?has_content && auth.showUsername() && !auth.showResetCredentials())>
            <#if displayRequiredFields>
                <header class="${properties.kcFormHeaderClass!}">
                    <span class="required">* ${msg("requiredFields")}</span>
                </header>
            </#if>
        <#else>
            <header class="${properties.kcFormHeaderClass!}">
                <#nested "show-username">
                <div class="navbar-user">
                    <img src="https://profiles.csh.rit.edu/image/${auth.attemptedUsername}" alt="" aria-hidden="true">
                    ${auth.attemptedUsername}
                    <a href="${url.loginRestartFlowUrl}" title="${msg("restartLoginTooltip")}">
                      <img class="logout" src="${url.resourcesPath}/img/logout.svg" />
                    </a>
                </div>

                <#if displayRequiredFields>
                    <span class="required">* ${msg("requiredFields")}</span>
                </#if>
            </header>
        </#if>
        <div id="kc-content">
          <div id="kc-content-wrapper">

            <#-- App-initiated actions should not see warning messages about the need to complete the action -->
            <#-- during login.                                                                               -->
            <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
                <#if message.type = 'error'>
                    <div class="alert alert-info" role="alert">
                        Having trouble logging in? Try <a href="https://account.csh.rit.edu/recovery" target="_blank" rel="noopener">recovering your account</a>.
                    </div>
                </#if>
                <div class="alert alert-${message.type?replace("error", "danger")}" role="alert">
                    <div class="row">
                      <div class="col-1">
                        <#if message.type = 'success'><img src="${url.resourcesPath}/img/success.svg" alt="" aria-hidden="true"></#if>
                        <#if message.type = 'warning'><img src="${url.resourcesPath}/img/warning.svg" alt="" aria-hidden="true"></#if>
                        <#if message.type = 'error'><img src="${url.resourcesPath}/img/error.svg" alt="" aria-hidden="true"></#if>
                        <#if message.type = 'info'><img src="${url.resourcesPath}/img/info.svg" alt="" aria-hidden="true"></#if>
                      </div>
                      <div class="col-10">
                        ${kcSanitize(message.summary)?no_esc}
                      </div>
                    </div>
                </div>
            </#if>

            <#nested "form">

            <#if auth?has_content && auth.showTryAnotherWayLink() && showAnotherWayIfPresent>
            <form id="kc-select-try-another-way-form" action="${url.loginAction}" method="post" <#if displayWide>class="${properties.kcContentWrapperClass!}"</#if>>
                <div <#if displayWide>class="${properties.kcFormSocialAccountContentClass!} ${properties.kcFormSocialAccountClass!}"</#if>>
                    <div class="${properties.kcFormGroupClass!}">
                      <input type="hidden" name="tryAnotherWay" value="on" />
                      <a href="#" id="try-another-way" onclick="document.forms['kc-select-try-another-way-form'].submit();return false;">${msg("doTryAnotherWay")}</a>
                    </div>
                </div>
            </form>
            </#if>

            <#if (displayInfo || realm.internationalizationEnabled && locale.supported?size gt 1)>
                <div class="login-footer">
                    <#if displayInfo>
                        <#nested "info">
                    </#if>
                    <#if realm.internationalizationEnabled && locale.supported?size gt 1>
                        <div class="locale">
                            <ul class="nav nav-pills">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" aria-haspopup="true">${locale.current}</a>
                                    <div class="dropdown-menu">
                                        <#list locale.supported as l>
                                            <a class="dropdown-item" href="${l.url}">${l.label}</a>
                                        </#list>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </#if>
                </div>
            </#if>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="react-root"></div>

  <% for (let chunk = 0; chunk < htmlWebpackPlugin.files.js.length; chunk++) { %>
  <script src="<%= htmlWebpackPlugin.files.js[chunk].replace('resources', '${url.resourcesPath}') %>" integrity="<%= htmlWebpackPlugin.files.jsIntegrity[chunk] %>" crossorigin="<%= webpackConfig.output.crossOriginLoading %>"></script>
  <% } %>
</body>
</html>
</#macro>
