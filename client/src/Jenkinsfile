pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/Rachana-js/react-food-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("rachanajs/react-food-app")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    script {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker rmi rachanajs/react-food-app'
            }
        }
    }
}
