pipeline {
  agent any
  tools { jdk 'JDK17' }
  options { skipDefaultCheckout(true) }
  triggers { pollSCM('H/5 * * * *') } // opcional: revisa cambios cada 5 min
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Build & Test') {
      when { anyOf { branch 'DEV'; branch 'QA'; branch 'main' } }
      steps {
        bat 'mvn -B -q clean verify'
      }
      post {
        always { junit 'target/surefire-reports/*.xml' }
      }
    }
  }
}
