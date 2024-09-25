import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://cat-fact.herokuapp.com";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-random-fact", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/facts/random");
    res.render("index.ejs", { content: JSON.stringify(result.data.text) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/get-fact", async (req, res) => {
  const id = req.body.id;
  try {
    const result = await axios.get(API_URL + "/facts/" + id);
    res.render("index.ejs", { content: JSON.stringify(result.data.text) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
