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
        always { junit 'target/surefire-reports/*.xml' }
      }
    }
    stage('SonarQube Analysis') {
      environment {
        SONARQUBE_URL = 'http://localhost:9000'
        SONAR_TOKEN = credentials('SONAR_TOKEN')
      }
      steps {
        bat 'mvn -B -q verify'
        bat "mvn -B -q sonar:sonar -Dsonar.host.url=%SONARQUBE_URL% -Dsonar.login=%SONAR_TOKEN%"
      }
    }
  }
}
