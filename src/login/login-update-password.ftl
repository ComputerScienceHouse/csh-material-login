<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "title">
    ${msg("updatePasswordTitle")}
    <#elseif section = "header">
    ${msg("updatePasswordTitle")}
    <#elseif section = "form">
    <form id="kc-passwd-update-form" action="${url.loginAction}" method="post">
        <input type="text" readonly value="this is not a login form" style="display: none;">
        <input type="password" readonly value="this is not a login form" style="display: none;">

        <div class="form-group">
            <label for="password-new" class="control-label">${msg("passwordNew")}</label>
            <input type="password" id="password-new" name="password-new" class="form-control" autofocus autocomplete="off" />
        </div>

        <div class="form-group">
            <label for="password-confirm" class="control-label">${msg("passwordConfirm")}</label>
            <input type="password" id="password-confirm" name="password-confirm" class="form-control" autocomplete="off" />
        </div>

        <div class="login-actions">
            <div class="login-actions-right">
                <input class="btn btn-primary btn-lg" type="submit" value="${msg("doSubmit")}"/>
            </div>
        </div>
    </form>
    </#if>
</@layout.registrationLayout>