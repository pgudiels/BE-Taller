pipeline {
  agent any
  options { skipDefaultCheckout(true) }
  stages {
    stage('Force checkout DEV') {
      steps {
        checkout([$class: 'GitSCM',
          branches: [[name: '*/DEV']],
          userRemoteConfigs: [[url: 'https://github.com/pgudiels/BE-Taller.git']]
        ])
        bat 'dir'
        bat 'type Jenkinsfile'
      }
    }
    stage('Run inline sanity') {
      steps {
        echo "Inline pipeline running (not from Jenkinsfile in repo)"
      }
    }
  }
}
