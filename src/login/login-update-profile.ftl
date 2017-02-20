<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "title">
    ${msg("loginProfileTitle")}
    <#elseif section = "header">
    ${msg("loginProfileTitle")}
    <#elseif section = "form">
    <form id="kc-update-profile-form" action="${url.loginAction}" method="post">
        <#if user.editUsernameAllowed>
            <div class="form-group ${messagesPerField.printIfExists('username','has-error')}">
                <label for="username" class="control-label">${msg("username")}</label>
                <input type="text" id="username" name="username" value="${(user.username!'')?html}" class="form-control"/>
            </div>
        </#if>
        <div class="form-group ${messagesPerField.printIfExists('email','has-error')}">
            <label for="email" class="control-label">${msg("email")}</label>
            <input type="text" id="email" name="email" value="${(user.email!'')?html}" class="form-control" />
        </div>

        <div class="form-group ${messagesPerField.printIfExists('firstName','has-error')}">
            <label for="firstName" class="control-label">${msg("firstName")}</label>
            <input type="text" id="firstName" name="firstName" value="${(user.firstName!'')?html}" class="form-control" />
        </div>

        <div class="form-group ${messagesPerField.printIfExists('lastName','has-error')}">
            <label for="lastName" class="control-label">${msg("lastName")}</label>
            <input type="text" id="lastName" name="lastName" value="${(user.lastName!'')?html}" class="form-control" />
        </div>

        <div class="login-actions">
            <div class="login-actions-right">
                <input class="btn btn-primary btn-lg" type="submit" value="${msg("doSubmit")}" />
            </div>
        </div>
    </form>
    </#if>
</@layout.registrationLayout>