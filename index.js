const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://islami-bank-ltd:OHpWryxttf7kMr2N@cluster0.5qzra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function server() {
  try {
    await client.connect();
    const database = client.db("ibbl");
    const PersonaInfoCollection = database.collection("PersonaInfo");
    const businessInfoCollection = database.collection("businessInfo");
    const loanApplicationDetailsCollection = database.collection(
      "loanApplicationDetails"
    );

    app.post("/personalDetails", async (req, res) => {
      const personalDetails = req.body;
      const result = await PersonaInfoCollection.insertOne(personalDetails);
      res.json(result);
    });
    app.post("/businessDetails", async (req, res) => {
      const businessDetails = req.body;
      const result = await businessInfoCollection.insertOne(businessDetails);
      res.json(result);
    });
    app.post("/loanApplicationDetails", async (req, res) => {
      const loanApplicationDetails = req.body;
      const result = await loanApplicationDetailsCollection.insertOne(
        loanApplicationDetails
      );
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
