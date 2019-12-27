const fs = require("fs");

const requestHandler = (req, res) => {
  // console.log(req.url, req.method, req.headers);
  //process.exit(); // to stop the server
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'></input><button type='submit'>Submit</button></form></body>"
    );
    res.write("<html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    // node pass data in chunk
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      //fs.writeFileSync("message.txt", message); //
      fs.writeFile("message.txt", message, err => {
        res.statusCode = 302; // set status code for redirect
        res.setHeader("Location", "/"); // redirect
        return res.end();
      });
    });
  }
  //fs.writeFileSync("res.text", `Wrong request sent with url = ${url}`); // writing data to file
  res.setHeader("content-type", "text/html");
  res.write("<html>");
  res.write("<head><title>Response from Node </title></head>");
  res.write("<body><h1>Hello from node server</h1></body>");
  res.write("<html>");
  res.end();
};

/* Some different methods of exporting */

module.exports.reqHandler = requestHandler;
module.exports.printText = "Some random text";

//exports.reqHandler = requestHandler;

// module.exports = {
//   reqHandler: requestHandler,
//   printText: "Some random text"
// };
