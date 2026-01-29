#include "../include/crow_all.h"
#include <iostream>
#include <string>


const std::string ReadFile(const std::string& file) {
  std::ifstream read_file(file, std::ios::binary);
  if (!read_file) {
    return "\033[1;32m<< Error: could not read \"" +
           file + "\" >>\033[0m\n";
  }
 return std::string((std::istreambuf_iterator<char>(read_file)),
                     std::istreambuf_iterator<char>());
}

int main() {
  crow::SimpleApp application;

  CROW_ROUTE(application, "/")([](){
    const std::string content = ReadFile("index.html");
    if (content.empty()) {
      return crow::response(404);
    }
    return crow::response({content});
  });

  CROW_ROUTE(application, "/<string>")([](const std::string& page) {
    const std::string content = ReadFile(page);
    if (content.empty()) {
      return crow::response(404);
    }
    return crow::response({content});
  });

  CROW_ROUTE(application, "/sounds/<string>")([](const std::string& sound) {
    const std::string file = "sounds/" + sound;
    const std::string content = ReadFile(file);
    if (content.empty()) {
      return crow::response(404);
    }
    crow::response response;
    response.body = std::move(content);
    response.add_header("Content-Type", "audio/mpeg");
    return response;
  });

  application.port(1200).multithreaded().run();
  return 0;
}