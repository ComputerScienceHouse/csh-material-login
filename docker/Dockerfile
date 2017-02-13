FROM jboss/keycloak:latest
MAINTAINER Steven Mirabito (smirabito@csh.rit.edu)

# Copy the config patch into the container
ADD patches.xsl /opt/jboss/keycloak

# Patch configuration
RUN java -jar /usr/share/java/saxon.jar -s:/opt/jboss/keycloak/standalone/configuration/standalone.xml \
-xsl:/opt/jboss/keycloak/patches.xsl -o:/opt/jboss/keycloak/standalone/configuration/standalone.xml && \
java -jar /usr/share/java/saxon.jar -s:/opt/jboss/keycloak/standalone/configuration/standalone-ha.xml \
-xsl:/opt/jboss/keycloak/patches.xsl -o:/opt/jboss/keycloak/standalone/configuration/standalone-ha.xml && \
rm /opt/jboss/keycloak/patches.xsl
