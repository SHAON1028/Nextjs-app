const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require('dotenv').config()
// middleware//
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

//   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cvl7r98.mongodb.net/?retryWrites=true&w=majority`

 const uri = "mongodb+srv://dbUser2:MNrk4nYHUVGjIlML@cluster0.xk4geth.mongodb.net/?retryWrites=true&w=majority";;
console.log(uri)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // collection
    const userCollection = client.db("next-app").collection("users");
    const menuCollection = client.db("next-app").collection("menu");
    const brandCollection = client.db("next-app").collection("brand");

    app.post("/user", async (req, res) => {
      const user = req.body;
      // console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.put("/brand", async (req, res) => {
      const data = req.body;
      console.log("data", data);
      const filter = { user: data.user };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...data,
        }, 
      };
      const result = await brandCollection.updateOne(filter, updateDoc, options);
      res.send(result)
      console.log('Brandresult',result); 
    });

    app.get("/brand", async (req, res) => {
      const email = req.query.email;
      console.log(email);
      const query = { user: email };
      const result = await brandCollection.findOne(query); 
      console.log(result);
      res.send(result);
    });


    app.put('/menu',async (req,res)=>{
      const data = req.body
      console.log('data',data)
      const filter = { user: data.user };
      const options = { upsert: true };
      const update = { $addToSet: { menuname: req.body.menuname } };
      const result = await menuCollection.updateOne(filter, update, options);
      res.send(result);
      console.log(result)
  }) 
  app.get("/menu", async (req, res) => {
    const email = req.query.email;
    console.log(email);
    const query = { user: email };
    const result = await menuCollection.findOne(query); 
    console.log(result);
    res.send(result);
  });
    
  } finally {
  }
}

run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send(" server is running");
});

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});
