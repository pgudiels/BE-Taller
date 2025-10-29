pipeline {
  agent any
  tools { jdk 'JDK17' }
  options { skipDefaultCheckout(true) }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
        bat 'echo Archivos del repo: && dir'
      }
    }
    stage('Build & Test') {
      steps {
        bat 'mvn -version'
        bat 'mvn -B -q clean verify'
      }
      post {
        always {
          junit 'target/surefire-reports/*.xml'
        }
      }
    }
  }
}
