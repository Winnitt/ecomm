pipeline {
    agent any  // Runs the pipeline on any available Jenkins agent

    environment {
        NODE_ENV = 'production'  // Set environment variable (optional)
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

        stage('Build') {
            steps {
                // Run the build script (if any)
                script {
                    sh 'npm run build'  // Ensure you have a build script in package.json
                }
            }
        }

        stage('Deploy') {
            steps {
                // Deploy the app (this could be any deploy command based on your setup)
                script {
                    sh 'npm run deploy'  // Make sure you have a deploy script in package.json
                }
            }
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


    stage('Parallel Tasks') {
    parallel {
        task1: {
            // Task 1 commands
        },
        task2: {
            // Task 2 commands
        }
    }
}

}



