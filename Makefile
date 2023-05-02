PROJECT=application

test:
	npm run test

build:
	docker-compose -f docker-compose.yaml build $(PROJECT)

