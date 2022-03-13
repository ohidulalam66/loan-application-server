const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const { ObjectID } = require("bson");

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.5qzra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function server() {
  try {
    await client.connect();
    const database = client.db("ibbl");
    const personalDetailsCollection = database.collection("personalDetails");
    const businessDetailsCollection = database.collection("businessDetails");
    const loanApplicationDetailsCollection = database.collection(
      "loanApplicationDetails"
    );

    app.post("/projectBuild", async (req, res) => {
      const project = req.body;
      const result = await projectsCollection.insertOne(project);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
server().catch(console.dir);

app.get("/", (req, res) => {
  res.send("IBBL server Running");
});

app.listen(port, () => {
  console.log(`IBBL server Running:${port}`);
});
