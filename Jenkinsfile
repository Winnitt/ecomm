pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        DOCKER_IMAGE = 'your-dockerhub-username/ecomm-app:1.0.0'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials-id'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Winnitt/ecomm.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Run Docker Tests') {
            steps {
                script {
                    sh 'docker run --rm $DOCKER_IMAGE npm test'
                }
            }
        }

        stage('Deploy Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
                        sh 'docker push $DOCKER_IMAGE'
                    }
                }
            }
        }

        // Corrected Parallel Tasks Stage
        stage('Parallel Tasks') {
            parallel {
                stage('Task 1') {
                    steps {
                        echo 'Running task 1'
                    }
                }
                stage('Task 2') {
                    steps {
                        echo 'Running task 2'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up after build'
        }
        success {
            echo 'Build and deployment succeeded!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
