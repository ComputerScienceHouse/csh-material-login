<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section="header">
        ${msg("doLogIn")}
    <#elseif section="form">
        <form id="kc-otp-login-form" class="${properties.kcFormClass!}" action="${url.loginAction}"
            method="post">
            <#if otpLogin.userOtpCredentials?size gt 1>
                <div class="${properties.kcFormGroupClass!} otp-credentials">
                    <div class="${properties.kcInputWrapperClass!}">
                        <#list otpLogin.userOtpCredentials as otpCredential>
                            <div class="custom-control custom-radio">
                              <input type="radio" id="otpCredential-${otpCredential?index}"
                                name="selectedCredentialId" value="${otpCredential.id}"
                                class="custom-control-input"${(otpCredential?index == 0)?then(' checked', '')}>
                              <label class="custom-control-label" for="otpCredential-${otpCredential?index}">
                                ${otpCredential.userLabel}
                              </label>
                            </div>
                        </#list>
                    </div>
                </div>
            </#if>

            <div class="row">
                <div class="col-2">
                    <img src="${url.resourcesPath}/img/otp.svg" alt="" aria-hidden="true">
                </div>
                <div class="col-10">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="otp" class="${properties.kcLabelClass!}">${msg("loginOtpOneTime")}</label>
                    </div>

                    <div class="${properties.kcInputWrapperClass!}">
                        <input id="otp" name="otp" autocomplete="off" type="text" class="${properties.kcInputClass!}"
                        autofocus/>
                    </div>
                </div>
            </div>

            <div class="${properties.kcFormGroupClass!}">
                <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                    <div class="${properties.kcFormOptionsWrapperClass!}">
                    </div>
                </div>

                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                    <input
                        class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
                        name="login" id="kc-login" type="submit" value="${msg("doLogIn")}" />
                </div>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>