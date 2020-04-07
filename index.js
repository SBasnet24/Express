const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const members = require("./members");

// const logger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 5000;

// express-handlebars middle ware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Member App",
    members,
  });
});

// initialize bodyParser for reqbody and formdata
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// set the static folder when we wanna use middleware
app.use(express.static(path.join(__dirname, "public")));
// members api routes
app.use("/api/members", require("./routes/api/members"));

// listenning port
app.listen(PORT, () => {
  console.log(`Server is loading on ${PORT}`);
});
