PROJECT=application

test:
	npm run test

build:
	docker-compose -f docker-compose.yaml build $(PROJECT)

start-dependencies:
	docker-compose -f docker-compose.yaml run --rm start_dependencies
