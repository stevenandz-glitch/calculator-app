CXX = g++
CXXFLAGS = -Icrow/include -pthread -std=c++20
SRC = server.cc
OUT = server

all: $(OUT)

$(OUT): $(SRC)
	$(CXX) $(CXXFLAGS) $(SRC) -o $(OUT)

clean:
	rm -f $(OUT)

