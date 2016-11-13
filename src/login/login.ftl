<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo; section>
    <#if section = "title">
    ${msg("loginTitle",(realm.displayName!''))}
    <#elseif section = "form">
        <#if realm.password>
        <form action="${url.loginAction}" method="post">
            <div class="form-group">
                <label class="control-label" for="username"><#if !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>
                <#if usernameEditDisabled??>
                    <input id="username" class="form-control" name="username" value="${(login.username!'')?html}" type="text" disabled/>
                <#else>
                    <input id="username" class="form-control" name="username" value="${(login.username!'')?html}" type="text" autofocus/>
                </#if>
            </div>
            <div class="form-group">
                <label class="control-label" for="password">${msg("password")}</label>
                <input type="password" class="form-control" id="password" name="password" autocomplete="off"/>
            </div>
            <div class="login-actions">
                <#if realm.rememberMe && !usernameEditDisabled??>
                    <div class="checkbox">
                        <label>
                            <#if login.rememberMe??>
                                <input id="rememberMe" name="rememberMe" type="checkbox" tabindex="3" checked> ${msg("rememberMe")}
                            <#else>
                                <input id="rememberMe" name="rememberMe" type="checkbox" tabindex="3"> ${msg("rememberMe")}
                            </#if>
                        </label>
                    </div>

                </#if>
                <input class="btn btn-primary btn-lg" name="login" type="submit" value="${msg("doLogIn")}"/>
            </div>
        </form>
        </#if>
    <#elseif section = "info">
        <#if realm.password && realm.registrationAllowed && !usernameEditDisabled??>
        <div id="kc-registration">
            <span>${msg("noAccount")} <a href="${url.registrationUrl}">${msg("doRegister")}</a></span>
        </div>
        </#if>

        <#if realm.password && social.providers??>
        <div id="kc-social-providers">
            <ul>
                <#list social.providers as p>
                    <li><a href="${p.loginUrl}" id="zocial-${p.alias}" class="zocial ${p.providerId}"> <span class="text">${p.alias}</span></a></li>
                </#list>
            </ul>
        </div>
        </#if>
    <#elseif section = "footer">
        <#if realm.resetPasswordAllowed>
        <div class="panel-footer"><a href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a></div>
        </#if>
    </#if>
</@layout.registrationLayout>