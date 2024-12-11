pipeline {
    agent any

    environment {
        // Define environment variables globally if needed
        // token : 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
        PROJECT_DIR = "reactjs-card"  // Project directory
        BUILD_TYPE = "production"  // Example of a variable for build type (production, development, etc.)
        GITHUB_REPO_URL = "https://github.com/git1978/reactjs-card.git"  // GitHub repository URL
        GIT_TOKEN = credentials('GIT_TOKEN')  // Using Jenkins credentials for GitHub token
    }

    stages {
        stage('Initialize Variables') {
            steps {
                script {
                    // Dynamically initialize or change variables
                    echo "Initializing variables..."
                    // Example of setting variables dynamically
                    env.NODE_ENV = "development"  // Set the environment variable for development
                    env.BUILD_VERSION = "v1.0.0"  // Example of setting a build version dynamically
                    echo "NODE_ENV set to ${env.NODE_ENV}"
                    echo "BUILD_VERSION set to ${env.BUILD_VERSION}"
                }
            }
        }

        stage('Checkout') {
            steps {
                script {
                    // Checkout the repository from GitHub using the token for authentication
                    echo "Cloning the GitHub repository from ${env.GITHUB_REPO_URL}"
                    sh "git clone https://${GIT_TOKEN}@github.com/git1978/reactjs-card.git"  // Using the token for authentication
                }
            }
        }

        stage('Compile') {
            steps {
                script {
                    // Compile the project
                    // Replace with your actual build/compile command
                    sh 'npm install'  // If using npm or yarn for frontend, for example
                    sh 'npm run build'  // Adjust this command to your build process (e.g., React, etc.)
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    // Run Stylelint to check CSS/SCSS files
                    sh 'npx stylelint "**/*.css" "**/*.scss"'  // Adjust to your file types or paths
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Run Jest tests
                    sh 'npm test'  // Adjust to your testing framework command, e.g., `npm run test` for Jest
                }
            }
        }

        stage('Cypress Tests') {
            steps {
                script {
                    // Run Cypress tests
                    sh './node_modules/.bin/cypress run'  // Run Cypress tests (adjust if necessary)
                }
            }
        }

        stage('Publish') {
            when {
                expression {
                    // Publish only when the commit is tagged
                    return env.GIT_TAG != null
                }
            }
            steps {
                script {
                    // Publish the build (e.g., to a Docker registry, NPM, or other artifact repositories)
                    // Replace this with your actual publishing command
                    echo "Publishing build for tag: ${env.GIT_TAG}"
                    // For example, you could push the build to a Docker repository or create a release:
                    // sh 'docker build -t myimage:${env.GIT_TAG} .'
                    // sh 'docker push myimage:${env.GIT_TAG}'
                    // Or publish an NPM package if it's a Node.js project:
                    // sh 'npm publish --access public'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
