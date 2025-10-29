pipeline {
  agent any
  tools { jdk 'JDK17' }
  options { skipDefaultCheckout(true) }
  stages {
    stage('Debug Info') {
      steps {
        echo "BRANCH_NAME: ${env.BRANCH_NAME}"
        echo "GIT_URL: ${env.GIT_URL}"
      }
    }
    stage('Checkout') {
      steps {
        checkout scm
        bat 'dir'
        bat 'type pom.xml'
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
  }
}
