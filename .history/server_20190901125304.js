let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");

// database MongoDB
let MongoClient = require("mongodb").MongoClient;
let dbo = undefined;
let url =
  "mongodb+srv://linxix:linx1994@cluster0-ocupa.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("FindMyPet");
});
// hash passwords using sha1
let sha1 = require("sha1");
// multer
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
reloadMagic(app);

//cookie
let cookieParser = require("cookie-parser");
app.use(cookieParser());

// variables
// sessions = {sessionId: emailId}
let sessions = {};

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
app.use("/", express.static("images"));
// Your endpoints go after this line
// signup
app.post("/signup", upload.none(), (req, res) => {
  console.log("**** I'm in the signup endpoint");
  console.log("this is the body", req.body);

  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;
  let address = req.body.address;

  dbo.collection("users").findOne({ email: email }, (err, expectedemail) => {
    console.log("expectedemail", expectedemail);
    if (err) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (expectedemail === undefined || expectedemail === null) {
      dbo.collection("users").insertOne({
        email: email,
        name: name,
        password: sha1(password),
        address: address
      });
      res.send(JSON.stringify({ success: true }));
      return;
    }
    if (expectedemail !== undefined) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    res.send(JSON.stringify({ success: false }));
  });
});

// generate cookie
let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};

// login
app.post("/login", upload.none(), (req, res) => {
  console.log("**** I'm in the login endpoint");
  console.log("this is the parsed body", req.body);

  let email = req.body.email;
  let enteredPassword = req.body.password;

  dbo.collection("users").findOne({ email: email }, (err, user) => {
    console.log("email", email);
    console.log("enteredPassword", req.body.password);
    console.log("users");
    if (err) {
      console.log("error", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null || user === undefined) {
      console.log("user === null");
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user.password === sha1(enteredPassword)) {
      console.log("correct password");
      let sessionId = generateId();
      console.log("generated id", sessionId);
      res.cookie("sid", sessionId);

      sessions[sessionId] = user.email;
      console.log("sessions", sessions);
      res.send(
        JSON.stringify({
          success: true
        })
      );
      return;
    }
    res.send(JSON.stringify({ success: false }));
  });
});
// logout
app.post("/logout", upload.none(), (req, res) => {
  console.log("logout");
  console.log("sessions", sessions);
  let sessionId = req.cookies.sid;
  console.log("sessionId", sessionId);
  // delete cookie
  delete sessions[sessionId];
  res.send({ succes: true });
  console.log("sessions", sessions);
});
// new-pet
app.post("/new-pet", upload.array("itemImage"), (req, res) => {
  console.log("request to /new-pet body", req.body);
  console.log(req.files);
  let filePath;
  let type = req.body.type
  let name = req.body.name;
  let race = req.body.race
  let age = req.body.age
  let gender= req.body.gender;
  if (req.file !== undefined) {
    filePath = "/uploads/" + req.file.filename;
  }

  dbo.collection("users").insertOne({
    filePath: filePath,
    type
    name: name,
    
  });
  res.send(
    JSON.stringify({
      success: true
    })
  );
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
