const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("./Models/User.js");
const DocumentModel = require('./Models/Document');
const Place = require("./Models/Place.js");
const Booking = require("./Models/Booking.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const { differenceInCalendarDays } = require("date-fns");
require("dotenv").config();
const axios = require('axios');


const app = express();
const PORT = 4000;

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "bkwjbcf6ftyuwhcfdb7jkfbireb7refbhe9";

// Middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/documents", express.static(__dirname + "/documents"));

// app.use("/documents", express.static(__dirname + "/documents"));



// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


// Routes
app.get("/test", (req, res) => {
  res.json("test ok");
});

//function
function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    // Extract token from cookies or headers, depending on your setup
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      reject(new Error('No token provided'));
    }

    jwt.verify(token, jwtSecret, {}, (err, user) => {
      if (err) {
        reject(err); // Pass the error to the caller
      } else {
        resolve(user);
      }
    });
  });
}

// ---------------------------for signup------------------

app.post("/register", async (req, res) => {
  try {
    const { name, number, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

    // Create a new user document
    const userDoc = await UserModel.create({
      name,
      number,
      email,
      password: hashedPassword,
    });

    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

// -------------------for login--------------------

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await UserModel.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("wrong pass");
    }
  } else {
    res.json("user not found");
  }
});

// --------------------for profile----------------

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) {
        console.error("JWT verification error:", err);
        // Respond with the token even if there's an error during verification
        return res.json({ token });
      }
      try {
        const { name, email, number, _id } = await UserModel.findById(user.id);
        if (!name || !email || !number || !_id) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json({ name, number, email, _id });
      } catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").json(true);
});

// --------------------for uploading photo from URL----------------
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

// --------------------for uploading photo from device----------------
const photosMiddleware = multer({ dest: "uploads" });
// Route for uploading photos from the device
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  console.log(req.files);

  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i];
    if (!file.originalname) {
      console.log("Original name missing for file:", file);
      continue;
    }

    const parts = file.originalname.split(".");
    if (parts.length < 2) {
      console.log("Invalid file name format:", file.originalname);
      continue;
    }

    const ext = parts.pop();
    const newPath = file.path + "." + ext;
    fs.renameSync(file.path, newPath);
    uploadedFiles.push(newPath.replace("uploads", ""));
  }
  res.json(uploadedFiles);
});

//======================= for destination save =======================

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: user.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    res.json(placeDoc);
  });
});

// ======================= for adding destination to front =======================

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    const { id } = user;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.json(place);
  } catch (error) {
    console.error("Error fetching place data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (user.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("saved");
    }
  });
});

// -----------------adding destination to homepage------------

app.get("/places", async (req, res) => {
  res.json(await Place.find({}));
});


// -----------------for booking----------------

app.post("/bookings", async (req, res) => {
  const user = await getUserDataFromReq(req);

  const { place, checkIn, checkOut, name, number, numberOfGuests, price } = req.body;
  if (!place || !checkIn || !checkOut || !name || !number || !numberOfGuests || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  const totalPrice = numberOfDays * price * numberOfGuests;

  Booking.create({
    place,
    checkIn,
    checkOut,
    name,
    number,
    numberOfGuests,
    price,
    totalPrice,
    numberOfDays,
    user: user.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.error("Error creating booking:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});



// -----------------for getting bookings----------------

app.get('/bookings', async (req, res) => {
  const user = await getUserDataFromReq(req);
  const bookings = await Booking.find({ user: user.id }).populate("place");
  res.json(bookings);
});



//to display weather

app.get('/weather', async (req, res) => {
  const { location } = req.query;
  const API_KEY = "da58343d1e62ee8244d7503a04206d7c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});


//-------------------to upload documents---------------------

const documentMiddleware = multer({ dest: "documents" });

app.post("/documents", documentMiddleware.array("photos", 100), async (req, res) => {
  try {
    // Get user's ID from JWT token
    const user = await getUserDataFromReq(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    console.log("User:", user);

    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      if (!file.originalname) {
        console.log("Original name missing for file:", file);
        continue;
      }

      const parts = file.originalname.split(".");
      if (parts.length < 2) {
        console.log("Invalid file name format:", file.originalname);
        continue;
      }

      const ext = parts.pop();
      const newPath = file.path + "." + ext;
      fs.renameSync(file.path, newPath);
      uploadedFiles.push(newPath.replace("documents", ""));
    }
    
    console.log("Uploaded files:", uploadedFiles);

    // Save document paths and associate with the user
    const documents = await DocumentModel.create({
      user: user.id,
      documents: uploadedFiles
    });

    console.log("Documents saved:", documents);
    res.json(documents);
  } catch (error) {
    console.error("Error uploading documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//to get documents-----------------------------
app.get('/documents', async (req, res) => {
  try {
    // Get user's ID from JWT token
    const user = await getUserDataFromReq(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find documents associated with the user
    const documents = await DocumentModel.find({ user: user.id });

    res.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
