<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "title">
    ${msg("emailForgotTitle")}
    <#elseif section = "header">
    ${msg("emailForgotTitle")}
    <#elseif section = "form">
        <form action="${url.loginAction}" method="post">
            <div class="form-group">
                <label for="username" class="control-label"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>
                <input type="text" id="username" name="username" class="form-control" autofocus/>
            </div>
            <div class="login-actions">
                <div class="login-actions-left">
                    <a href="${url.loginUrl}">${msg("backToLogin")}</a>
                </div>
                <div class="login-actions-right">
                    <input class="btn btn-primary btn-lg" type="submit" value="${msg("doSubmit")}"/>
                </div>
            </div>
        </form>
    <#elseif section = "info" >
    ${msg("emailInstruction")}
    </#if>
</@layout.registrationLayout>