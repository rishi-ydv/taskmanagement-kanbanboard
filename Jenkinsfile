// Jenkinsfile

pipeline {
    agent any 

    tools {
        // Use the exact name from your Jenkins Tools config
        nodejs 'NodeJS 22' 
    }

    stages {
        stage('1: Checkout') {
            steps {
                echo 'Checking out code...'
                // 'checkout scm' is the standard for multibranch
                checkout scm 
            }
        }

        stage('2: Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm install'
            }
        }

        stage('3: Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test' 
            }
        }
        
        stage('4: Build Application') {
            steps {
                echo 'Building React application...'
                sh 'npm run build'
            }
        }

        // --- THIS IS THE UPDATED STAGE ---
        stage('5: Deploy to GitHub Pages') {
            // This 'when' block ensures this stage ONLY runs
            // on the 'main' branch, not on pull requests.
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "Deploying to GitHub Pages..."
                    withCredentials([string(credentialsId: 'github-pat', variable: 'GITHUB_TOKEN')]) {
                        sh '''
                            echo "Configuring Git for deployment..."
                            git config --global user.email "jenkins-ci@my-org.com"
                            git config --global user.name "Jenkins CI Bot"
                            
                            echo "Setting up remote URL with token..."
                            git remote set-url origin https://${GITHUB_TOKEN}@github.com/rishi-ydv/taskmanagement-kanbanboard.git
                            
                            echo "Running deploy script (npm run deploy)..."
                            npm run deploy
                        '''
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline finished. Cleaning up workspace...'
            cleanWs() 
        }
    }
}