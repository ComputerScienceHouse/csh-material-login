<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "title">
    ${msg("registerWithTitle",(realm.displayName!''))}
    <#elseif section = "header">
    ${msg("registerWithTitleHtml",(realm.displayNameHtml!''))}
    <#elseif section = "form">
    <form id="kc-register-form" action="${url.registrationAction}" method="post">
        <input type="text" readonly value="this is not a login form" style="display: none;">
        <input type="password" readonly value="this is not a login form" style="display: none;">

        <#if !realm.registrationEmailAsUsername>
            <div class="form-group ${messagesPerField.printIfExists('username','has-error')}">
                <label for="username" class="control-label">${msg("username")}</label>
                <input type="text" id="username" class="form-control" name="username" value="${(register.formData.username!'')}" />
            </div>
        </#if>

        <div class="form-group ${messagesPerField.printIfExists('firstName','has-error')}">
            <label for="firstName" class="control-label">${msg("firstName")}</label>
            <input type="text" id="firstName" class="form-control" name="firstName" value="${(register.formData.firstName!'')}" />
        </div>

        <div class="form-group ${messagesPerField.printIfExists('lastName','has-error')}">
            <label for="lastName" class="control-label">${msg("lastName")}</label>
            <input type="text" id="lastName" class="form-control" name="lastName" value="${(register.formData.lastName!'')}" />
        </div>

        <div class="form-group ${messagesPerField.printIfExists('email','has-error')}">
            <label for="email" class="control-label">${msg("email")}</label>
            <input type="text" id="email" class="form-control" name="email" value="${(register.formData.email!'')}" />
        </div>

        <#if passwordRequired>
            <div class="form-group ${messagesPerField.printIfExists('password','has-error')}">
                <label for="password" class="control-label">${msg("password")}</label>
                <input type="password" id="password" class="form-control" name="password" />
            </div>

            <div class="form-group ${messagesPerField.printIfExists('password-confirm','has-error')}">
                <label for="password-confirm" class="control-label">${msg("passwordConfirm")}</label>
                <input type="password" id="password-confirm" class="form-control" name="password-confirm" />
            </div>
        </#if>

        <#if recaptchaRequired??>
            <div class="form-group">
                <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
            </div>
        </#if>

        <div class="login-actions">
            <div class="login-actions-left">
                <a href="${url.loginUrl}">${msg("backToLogin")}</a>
            </div>
            <div class="login-actions-right">
                <input class="btn btn-primary btn-lg" type="submit" value="${msg("doRegister")}"/>
            </div>
        </div>
    </form>
    </#if>
</@layout.registrationLayout>
