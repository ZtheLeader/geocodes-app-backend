let maps = [
  // temporary database that has some records already.
  {
    address: "Lahore, Pakistan",
    id: "1",
    coordinates: {
      lat: "31.5203696",
      lng: "74.35874729999999"
    }
  },
  {
    address: "Berlin, Germany",
    id: "2",
    coordinates: {
      lat: "52.52000659999999",
      lng: "13.404954"
    }
  }
];

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, OPTIONS, PATCH"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).json("Wellcome to backend of geocodes-app-backend");
});

app.get("/list", (req, res) => {
  res.status(200).json({ msg: "success", data: maps });
});

app.post("/add", (req, res) => {
  const { data } = req.body;
  if (data) {
    maps.push(data);
    return res.status(200).json({ msg: "success", data: maps });
  }
  return res.status(422).json("Malformed Request");
});

app.delete("/remove", (req, res) => {
  const { data } = req.body;
  if (data.id) {
    const index = maps.findIndex(function(i) {
      return i.id === data.id;
    });
    if (index > -1) {
      maps.splice(index, 1);
      return res.status(200).json({ msg: "success", data: maps });
    }
    return res.status(404).json({ msg: "does not exists" });
  }
  return res.status(422).json("Malformed Request");
});

app.patch("/update", (req, res) => {
  const { id, newData } = req.body;
  if (id && newData) {
    const index = maps.findIndex(function(i) {
      return i.id === id;
    });
    if (index > -1) {
      maps[index] = newData;
      return res.status(200).json({ msg: "success", data: maps });
    }
    return res.status(404).json({ msg: "does not exist" });
  }
  return res.status(422).json("Malformed Request");
});

app.listen(8000, () => console.log("Backend server is running!"));
