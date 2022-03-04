PROJECT=application

test:
	npm run test

build:
	npm install -g npm
	npm ci 

deploy: 
	npm run deploy
	
run: 
	docker-compose run -d \
	-e DATASOURCE_URL=$(DATASOURCE_URL) \
	-e DATASOURCE_USERNAME=$(DATASOURCE_USERNAME) \
	-e DATASOURCE_PASSWORDD=$(DATASOURCE_PASSWORD) \
	-e KAFKA_SERVER=$(KAFKA_SERVER) \
	$(PROJECT)
	
down:
	docker-compose down --remove-orphans