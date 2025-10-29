pipeline {
  agent any
  tools { jdk 'JDK17' }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Build & Test') {
      steps { bat 'mvn -B -q clean test' }
    }
    stage('SonarQube') {
      when { environment name: 'SONARQUBE_URL', value: 'http://localhost:9000' }
      environment {
        SONARQUBE_URL = 'http://localhost:9000'
        SONAR_TOKEN = credentials('SONAR_TOKEN') // crea esta credencial en Jenkins
      }
      steps {
        bat 'mvn -B -q verify'
        bat "mvn -B -q sonar:sonar -Dsonar.host.url=%SONARQUBE_URL% -Dsonar.login=%SONAR_TOKEN%"
      }
    }
  }
  post {
    always {
      junit 'target/surefire-reports/*.xml'
    }
  }
}