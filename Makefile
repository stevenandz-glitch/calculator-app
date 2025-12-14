.PHONY: all build run deploy

all:
	make build

build:
	@echo "Creating the server"
	$(MAKE) -C backend

run:
	@echo "Running the server"
	./backend/server & echo $$! > server.pid

stop:
	@echo "Stopping the server"
	-kill $$(cat server.pid)
	-rm -f server.pid

clean:
	$(MAKE) -C backend clean
	rm -f server.pid

deploy:
	@echo "Deploying into android phone"
	make build
	make run
	adb reverse tcp:1600 tcp:1600
	adb shell am start \
		-a android.intent.action.VIEW \
		-d http://localhost:1600