pipeline {
    agent any  // Runs the pipeline on any available Jenkins agent

    environment {
        NODE_ENV = 'production'  // Set environment variable (optional)
        DOCKER_IMAGE = 'your-dockerhub-username/ecomm-app:1.0.0'  // Docker image name and tag
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials-id'  // Docker credentials ID in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub repository
                git 'https://github.com/Winnitt/ecomm.git'  // Replace with your actual repo URL
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests (assuming you have a test script in package.json)
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'  // Build Docker image
                }
            }
        }

        stage('Run Docker Tests') {
            steps {
                script {
                    // Run tests inside the Docker container (if necessary)
                    sh 'docker run --rm $DOCKER_IMAGE npm test'
                }
            }
        }

        stage('Deploy Docker Image') {
            steps {
                script {
                    // Login to Docker Hub and push the image (requires Docker credentials set in Jenkins)
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
                        sh 'docker push $DOCKER_IMAGE'  // Push the Docker image to Docker Hub
                    }
                }
            }
        }

        stage('Parallel Tasks') {
            parallel (
                task1: {
                    steps {
                        echo 'Running task 1'
                    }
                },
                task2: {
                    steps {
                        echo 'Running task 2'
                    }
                }
            )
        }
    }

    post {
        always {
            // This will always execute after the pipeline runs
            echo 'Cleaning up after build'
        }
        success {
            // This will run if the pipeline is successful
            echo 'Build and deployment succeeded!'
        }
        failure {
            // This will run if the pipeline fails
            echo 'Build or deployment failed!'
        }
    }
}
