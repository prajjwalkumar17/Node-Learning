/** @format */
const fs = require("fs");
const http = require("http");
const url = require("url");

////////////////////////////FILES///////////////////////////////
// const textIn = fs.readFileSync("./1-node-farm/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is very awesome feature I gotta know yet ${textIn}.\n.Created on ${Date.now()}`;
// fs.writeFileSync("./1-node-farm/output.txt", textOut);
// console.log("File Written");
///////////////////////////Servers//////////////////////////////////
const data = fs.readFileSync(
  "./1-node-farm/starter/dev-data/data.json",
  "utf-8"
);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathname = req.url;
  if (pathname === "/" || pathname === "/overview") {
    res.end("This is overview");
  } else if (pathname === "/product") {
    res.end("Hellow from the product");
  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/JSON" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "content-type": "text/HTML",
      myheader: "hehehehhehehhehehehehehheheh",
    });
    res.end("<h1>Page not found</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("server Started");
});
