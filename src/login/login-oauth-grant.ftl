<#import "template.ftl" as layout>
<@layout.registrationLayout bodyClass="oauth"; section>
    <#if section = "title">
    ${msg("oauthGrantTitle")}
    <#elseif section = "header">
    ${msg("oauthGrantTitleHtml",(realm.displayNameHtml!''))} <strong><#if client.name??>${advancedMsg(client.name)}<#else>${client.clientId}</#if></strong>.
    <#elseif section = "form">
    <div id="kc-oauth" class="content-area">
        <h5>${msg("oauthGrantRequest")}</h5>
        <ul>
            <#if oauth.claimsRequested??>
                <li>
                    <span>
                        ${msg("personalInfo")}&nbsp;
                            <#list oauth.claimsRequested as claim>
                            ${advancedMsg(claim)}<#if claim_has_next>,&nbsp;</#if>
                            </#list>
                    </span>
                </li>
            </#if>
            <#if oauth.accessRequestMessage??>
                <li>
                    <span>
                    ${oauth.accessRequestMessage}
                    </span>
                </li>
            </#if>
            <#if oauth.realmRolesRequested??>
                <#list oauth.realmRolesRequested as role>
                    <li>
                        <span><#if role.description??>${advancedMsg(role.description)}<#else>${advancedMsg(role.name)}</#if></span>
                    </li>
                </#list>
            </#if>
            <#if oauth.resourceRolesRequested??>
                <#list oauth.resourceRolesRequested?keys as resource>
                    <#list oauth.resourceRolesRequested[resource] as clientRole>
                        <li>
                            <span class="kc-role"><#if clientRole.roleDescription??>${advancedMsg(clientRole.roleDescription)}<#else>${advancedMsg(clientRole.roleName)}</#if></span>
                            <span class="kc-resource">${msg("inResource")} <strong><#if clientRole.clientName??>${advancedMsg(clientRole.clientName)}<#else>${clientRole.clientId}</#if></strong> </span>
                        </li>
                    </#list>
                </#list>
            </#if>
        </ul>

        <form action="${url.oauthAction}" method="POST">
            <input type="hidden" name="code" value="${oauth.code}">

            <div class="login-actions">
                <div class="login-actions-right">
                    <input class="btn btn-primary btn-lg" name="accept" type="submit" value="${msg("doYes")}"/>
                    <input class="btn btn-primary btn-lg" name="cancel" type="submit" value="${msg("doNo")}"/>
                </div>
            </div>
        </form>
    </div>
    </#if>
</@layout.registrationLayout>