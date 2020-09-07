FROM jboss/keycloak:11.0.2
MAINTAINER Steven Mirabito (smirabito@csh.rit.edu)

# Temporarily elevate permissions
USER root

# Copy customizations into container
ADD customization /opt/jboss/keycloak/customization

# Execute customization script
RUN cd /opt/jboss/keycloak && \
/opt/jboss/keycloak/customization/execute.sh

# Drop permissions
USER jboss