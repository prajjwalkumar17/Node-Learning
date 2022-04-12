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
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
const templateOverview = fs.readFileSync(
  "./1-node-farm/starter/templates/template-overview.html",
  "utf-8"
);
const templateproduct = fs.readFileSync(
  "./1-node-farm/starter/templates/template-product.html",
  "utf-8"
);
const templatecard = fs.readFileSync(
  "./1-node-farm/starter/templates/teplate-card.html",
  "utf-8"
);
const data = fs.readFileSync(
  "./1-node-farm/starter/dev-data/data.json",
  "utf-8"
);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //INIT overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(templatecard, el))
      .join("");
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  }

  //INIT products page
  else if (pathname === "/product") {
    const product = dataObj[query.id];
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const output = replaceTemplate(templateproduct, product);
    res.end(output);
  }

  //INIT API
  else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/JSON" });
    res.end(data);
  }

  //INIT notfound
  else {
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
