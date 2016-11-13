<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "title">
        ${msg("loginTitle",realm.displayName)}
    <#elseif section = "header">
        ${msg("loginTitleHtml",realm.displayNameHtml)}
    <#elseif section = "form">
        <form action="${url.loginAction}" method="post">
            <div class="form-group">
                <label class="control-label" for="totp"><span class="glyphicon glyphicon-phone"></span> ${msg("loginTotpOneTime")}</label>
                <input id="totp" class="form-control" name="totp" autocomplete="off" type="text" autofocus>
            </div>
            <div class="login-actions">
                <div class="login-actions-right">
                    <input class="btn btn-default btn-lg" name="cancel" type="submit" value="${msg("doCancel")}">
                    <input class="btn btn-primary btn-lg" name="login" type="submit" value="${msg("doLogIn")}">
                </div>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>