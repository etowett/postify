up: ## Docker Compose bring up all containers in detatched mode
	docker compose up -d

ps: ## Docker Compose check docker processes
	docker compose ps

logs: ## Docker Compose tail follow logs
	docker compose logs -f

stop: ## Docker Compose stop all containers
	docker compose stop

rm: stop ## Docker Compose stop and force remove all containers
	docker compose rm -f
