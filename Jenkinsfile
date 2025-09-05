pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/mahroot/movie-review.git'
      }
    }
    stage('Build Docker Images') {
      steps {
        sh 'docker build -t omrajput/movie-frontend:latest ./frontend'
        sh 'docker build -t omrajput/movie-backend:latest ./backend'
      }
    }
     stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push omrajput/movie-frontend:latest'
                    sh 'docker push omrajput/movie-backend:latest'
                }
            }
        }

    
    
    
    stage('Deploy') {
      steps {
        sh 'docker-compose down && docker-compose up -d'
      }
    }
  }
}
