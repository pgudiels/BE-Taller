pipeline {
  agent any
  options { skipDefaultCheckout(true) }
  stages {
    stage('Checkout and list') {
      steps {
        checkout scm
        bat 'dir'
        bat 'type Jenkinsfile'
      }
    }
  }
}
