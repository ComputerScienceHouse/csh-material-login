#!groovy

pipeline {
    agent any

    tools {
        nodejs 'Node 7.x'
    }

    stages {
        stage('Dependencies') {
            steps {
                sh 'whoami'
                sh 'node -v'
                sh 'npm prune'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run production'
            }
        }

        stage('Publish') {
            steps {
                // Upload the theme tagged with the current commit hash
                nexusArtifactUploader artifacts: [[artifactId: 'theme', classifier: COMMIT_HASH, file: 'dist/theme.zip', type: 'zip']], credentialsId: 'nexus-jenkins', groupId: 'csh-material-login', nexusUrl: 'repo.csh.rit.edu', nexusVersion: 'nexus3', protocol: 'https', repository: 'raw', version: env.BRANCH_NAME

                // Overwrite the latest version
                nexusArtifactUploader artifacts: [[artifactId: 'theme', classifier: 'latest', file: 'dist/theme.zip', type: 'zip']], credentialsId: 'nexus-jenkins', groupId: 'csh-material-login', nexusUrl: 'repo.csh.rit.edu', nexusVersion: 'nexus3', protocol: 'https', repository: 'raw', version: env.BRANCH_NAME

                // Trigger Keycloak build
                build job: '/ComputerScienceHouse/keycloak-docker/master', wait: false
            }
        }

        stage('Cleanup') {
            steps {
                sh 'npm prune'
                sh 'rm -rf node_modules'
            }
        }
    }
}
