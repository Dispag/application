
   
def apps = [
  stage: [
    
  ],
  production: [
    
  ]
]

pipeline {
  agent any
  parameters {
    choice(name: 'ACTION',
     choices: ['deploy', 'down'],
     description: 'Which action to do ?')
  }
  environment {
    ACTION = "${params.ACTION}"
    DOCKER_SERVER_IP = "10.11.2.195"
	SERVER_NAT_ID = "i-0b904b2b65635f1db"
  }

  stages {
    stage('Prepare') {
      steps { 
         
          sh '''echo env: ${ACTION}
          	sudo su
			rm -f -r /home/ec2-user/deployments/*
          	cd /home/ec2-user/deployments/ && git clone https://github.com/Dispag/application.git
			
          '''
        
      }
    }
    
    stage('Build') {
	  when {
        expression {
          params.ACTION == 'deploy'
        }
      }
      steps { 
         
          sh '''echo env: ${ACTION}
          	sudo su
          	cd /home/ec2-user/deployments/application
            make build
          '''
        
      }
    }

	stage('Deploy') {
	  when {
        expression {
          params.ACTION == 'deploy'
        }
      }
      steps { 
         
          sh '''echo env: ${ACTION}
          	sudo su
            cd /home/ec2-user/deployments/application
            make deploy  
          '''
        
      }
    }
	
	stage('Down') {
	  when {
        expression {
          params.ACTION == 'down'
        }
      }
      steps { 
         
          sh '''echo env: ${ACTION}
          	sudo su
          	cd /home/ec2-user/deployments/application
            make undeploy
          '''
        
      }
    }
   
  }
}
