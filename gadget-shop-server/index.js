// const express = require("express");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const app = express();
// const port = process.env.PORT || 5000;

// //middleware
// app.use(
//   cors({
//     origin: "http://localhost:5174",
//     optionsSuccessStatus: 200,
//   })
// );
// //token verification
// const verifyJWT = (req, res, next) => {
//   const authentication = req.header.authentication;
//   if (!authentication) {
//     return res.send({ message: "no token" });
//   }
//   const token = authentication.split(" ")[1];
//   jwt.verify(token, process.env.ACCESS_KEY_TOKEN, (err, decoded) => {
//     if (err) {
//       return res.send({ message: "invaild token" });
//     }
//     req.decoded = decoded;
//     next();
//   });
// };
// //verify seller 
// const verifySeller = async(req, res, next)=>{
//  const email = req.decoded.email
//  const query = {email: email}
//  const user = await userCollection.findOne(query)
//  if(user?.role !== 'seller') {
//   return res.send ({message: "Forbidden access"})
//  }
//  next()
// }


// app.use(express.json());

// //mongodb
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pou7r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// const userCollection = client.db("gadgetShop").collection("users");
// const porductCollection = client.db("gadgetShop").collection("products");

// // Function to connect to MongoDB
// const dbConnect = async () => {
//   try {
//     await client.connect();
//     console.log("Database Connected");

//     //get user

//     app.get("/user/:email", async (req, res) => {
//       const query = { email: req.params.email };
//       const user = await userCollection.findOne(query);
//       res.send(user);
//     });

//     //insert user
//     app.post("/users", async (req, res) => {
//       const user = req.body;
//       const query = { email: user.email };
//       const existingUser = await userCollection.findOne(query);
//       if (existingUser) {
//         return res.send({ message: "user already exists" });
//       }

//       const result = await userCollection.insertOne(user);
//       res.send(result);
//     });

//     //add product
//     app.post("/add-products",verifyJWT,  async (req, res) => {
//       const product = req.body;
//       const result = await porductCollection.insertOne(product);
//       res.send(result);
//     });
//   } catch (error) {
//     console.log(error.name, error.message);
//   }
// };

// dbConnect();

// // API endpoint
// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// // jwt

// app.post("/authentication", async (req, res) => {
//   const userEmail = req.body;
//   const token = jwt.sign(userEmail, process.env.ACCESS_KEY_TOKEN, {
//     expiresIn: "10d",
//   });
//   res.send({ token });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// Middleware for CORS
app.use(
  cors({
    origin: "http://localhost:5175", // Update this to your frontend URL
    optionsSuccessStatus: 200,
  })
);

// Middleware for JWT token verification
const verifyJWT = (req, res, next) => {
  const authentication = req.header("Authorization");
  if (!authentication) {
    return res.status(401).send({ message: "No token" });
  }
  const token = authentication.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_KEY_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    req.decoded = decoded;
    next();
  });
};

// Middleware to verify if the user is a seller
const verifySeller = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await userCollection.findOne(query);
  if (user?.role !== "seller") {
    return res.status(403).send({ message: "Forbidden access" });
  }
  next();
};

app.use(express.json());

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pou7r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const userCollection = client.db("gadgetShop").collection("users");
const productCollection = client.db("gadgetShop").collection("products");

// Function to connect to MongoDB and set up routes
const dbConnect = async () => {
  try {
    await client.connect();
    console.log("Database Connected");

    // Get user by email
    app.get("/user/:email", async (req, res) => {
      const query = { email: req.params.email };
      const user = await userCollection.findOne(query);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    });

    // Insert new user
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.status(400).send({ message: "User already exists" });
      }
      const result = await userCollection.insertOne(user);
      res.status(201).send(result);
    });

    // Add product (requires JWT verification)
    app.post("/add-products", verifyJWT, async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.status(201).send(result);
    });

    // Add seller product (requires JWT verification and seller check)
    app.post("/add-seller-product", verifyJWT, verifySeller, async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.status(201).send(result);
    });

  } catch (error) {
    console.log(error.name, error.message);
  }
};

dbConnect();

// Home route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// JWT authentication route to generate token
app.post("/authentication", async (req, res) => {
  const userEmail = req.body;
  const token = jwt.sign(userEmail, process.env.ACCESS_KEY_TOKEN, {
    expiresIn: "10d", // Token expiration time
  });
  res.status(200).send({ token });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
