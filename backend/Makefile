# Run the Docker containers

install:
	docker compose build

run:
	docker compose up --remove-orphans -d

test:
	docker compose run --rm api npm test

# Stop the Docker containers
stop:
	docker compose stop

# Delete the Docker containers and volumes
down:
	docker compose down

# Log the Docker containers
logs:
	docker compose logs --tail=10 -f
