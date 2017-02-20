<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "title">
    ${msg("loginTotpTitle")}
    <#elseif section = "header">
    ${msg("loginTotpTitle")}
    <#elseif section = "form">
    <ol id="kc-totp-settings" class="login-otp-setup">
        <li>
            <p>${msg("loginTotpStep1")}</p>
        </li>
        <li>
            <p>${msg("loginTotpStep2")}</p>
            <div class="otp-code">
                <img id="kc-totp-secret-qr-code" src="data:image/png;base64, ${totp.totpSecretQrCode}" alt="Figure: Barcode"><br/>
                <span class="code">${totp.totpSecretEncoded}</span>
            </div>
        </li>
        <li>
            <p>${msg("loginTotpStep3")}</p>
        </li>
    </ol>
    <form id="kc-totp-settings-form" action="${url.loginAction}" method="post">
        <div class="form-group">
            <input type="text" id="totp" name="totp" autocomplete="off" class="form-control" />
            <input type="hidden" id="totpSecret" name="totpSecret" value="${totp.totpSecret}" />
        </div>

        <div class="login-actions">
            <div class="login-actions-right">
                <input class="btn btn-primary btn-lg" type="submit" value="${msg("doSubmit")}"/>
            </div>
        </div>
    </form>
    </#if>
</@layout.registrationLayout>
