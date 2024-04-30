const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("./Models/User.js");
const DocumentModel = require("./Models/Document");
const FavoritesModel = require("./Models/Favorites.js");
const Place = require("./Models/Place.js");
const Booking = require("./Models/Booking.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const { differenceInCalendarDays } = require("date-fns");
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const axios = require("axios");
const nodemailer = require('nodemailer');
const {v4: uuidv4} = require("uuid");
const stripe = require("stripe")(
  "sk_test_51P83FbSGDXorlL6rHs4sga4grglpLNM1FFlKscD3coKx2cTDFvmi93Cze60UwrS50uAumf8bg8u1ZnwCsPZIXaP200nQo6qQCC"
);

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

// Initialize Passport.js middleware
app.use(passport.initialize());

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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



//function
function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    // Extract token from cookies or headers, depending on your setup
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      reject(new Error("No token provided"));
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


//nodemailer 

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465, // Port for SSL/TLS
  secure: true, // Use SSL/TLS
  auth: {
    user: 'anirudhadhungana@gmail.com', 
    pass: 'aubv luaw utdp wstv' 
  },
  debug: true, // Enable debugging
});

// ---------------------------for signup------------------

app.post("/register", async (req, res) => {
  try {
    const { name, number, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

    // Generate a unique verification token
    const verificationToken = uuidv4();

    // Create a new user document with verificationToken
    const userDoc = await UserModel.create({
      name,
      number,
      email,
      password: hashedPassword,
      uniqueString: verificationToken, // Add verification token to user document
    });

    // Send verification email
    const verificationLink = `http://localhost:5173/verify/${verificationToken}`;
    const mailOptions = {
      from: "your-email@gmail.com", // Sender email address
      to: email, // Receiver email address
      subject: "Email Verification", // Email subject
      html: `Click <a href="${verificationLink}">here</a> to verify your email.`, // Email body with verification link
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending verification email:", error);
        res.status(500).json({ message: "Error sending verification email" });
      } else {
        console.log("Verification email sent:", info.response);
        res.json({ message: "User registered successfully. Check your email for verification." });
      }
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// Verification endpoint
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    // Find the user by the verification token
    const user = await UserModel.findOne({ uniqueString: token });

    if (!user) {
      // If no user found with the token, return an error
      return res.status(404).json({ message: "User not found or already verified." });
    }

    // Update the user's verified field to true
    user.verified = true;
    await user.save();

    // Redirect the user to a verified page or send a success response
    res.redirect("/verified"); // Redirect to a verified page
    // res.json({ message: "User verified successfully." }); // Send success response
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Error verifying user." });
  }
});



// -------------------for login--------------------

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await UserModel.findOne({ email });

  if (userDoc) {
    if (!userDoc.verified) {
      return res.status(403).json({ message: "Email not verified. Please verify your email address." });
    }

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
      res.status(422).json("Wrong password");
    }
  } else {
    res.status(404).json("User not found");
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

//-------------------logout
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

  const { place, title, checkIn, checkOut, name, number, numberOfGuests, price } =
    req.body;
  if (
    !place ||
    !title || // Ensure title is provided
    !checkIn ||
    !checkOut ||
    !name ||
    !number ||
    !numberOfGuests ||
    !price
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const numberOfDays = differenceInCalendarDays(
    new Date(checkOut),
    new Date(checkIn)
  );
  const totalPrice = numberOfDays * price * numberOfGuests;

  Booking.create({
    place,
    title, 
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

app.get("/bookings", async (req, res) => {
  const user = await getUserDataFromReq(req);
  const bookings = await Booking.find({ user: user.id }).populate("place");
  res.json(bookings);
});

//to display weather

app.get("/weather", async (req, res) => {
  const { location } = req.query;
  const API_KEY = "da58343d1e62ee8244d7503a04206d7c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

//-------------------to upload documents---------------------

const documentMiddleware = multer({ dest: "documents" });

app.post(
  "/documents",
  documentMiddleware.array("photos", 100),
  async (req, res) => {
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

      // Fetch user's name
      const userRecord = await UserModel.findById(user.id);
      if (!userRecord) {
        return res.status(404).json({ error: "User not found" });
      }

      // Save document paths and associate with the user
      const documents = await DocumentModel.create({
        user: user.id,
        userName: userRecord.name,
        documents: uploadedFiles,
      });

      console.log("Documents saved:", documents);
      res.json(documents);
    } catch (error) {
      console.error("Error uploading documents:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);


//to get documents-----------------------------
app.get("/documents", async (req, res) => {
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

//for favorites--------------------------------------

app.post("/favorites", async (req, res) => {
  try {
    const { place } = req.body;
    const user = await getUserDataFromReq(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const favorite = await FavoritesModel.create({ user: user.id, place });
    res.status(201).json({ place: favorite.place });
  } catch (error) {
    console.error("Error adding place to favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to remove a favorite place
app.delete("/favorites/:placeId", async (req, res) => {
  try {
    const { placeId } = req.params;
    const user = await getUserDataFromReq(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await FavoritesModel.deleteOne({ user: user.id, place: placeId });
    res.status(200).json({ place: placeId });
  } catch (error) {
    console.error("Error removing place from favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get all favorite places for a user
app.get("/favorites", async (req, res) => {
  try {
    const user = await getUserDataFromReq(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const favorites = await FavoritesModel.find({ user: user.id }).populate(
      "place"
    );
    res.json(favorites);
  } catch (error) {
    console.error("Error fetching favorite places:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



//------------------------------------------------------for admin pannel------------------------------------------------------


//------------------------to get and display users!!!!!!!!!!!!!!!!!!!!!!!!

app.get("/totalusers", async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const allUsers = await UserModel.find();
    res.json({ totalUsers, allUsers });
  } catch (error) {
    console.error("Error retrieving total number of users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//  to delete a user by ID
app.delete("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Use Mongoose to find and delete the user document by ID
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      // If no user was found with the provided ID, send a 404 response
      return res.status(404).json({ error: "User not found" });
    }

    // If the user was successfully deleted, send a success response
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    // If an error occurs during the deletion process, send a 500 response
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//to edit the details
app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, email, number, role } = req.body;

  try {
    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user details
    user.name = name;
    user.email = email;
    user.number = number;
    user.role = role;

    // Save the updated user
    await user.save();

    // Respond with the updated user
    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//for destination delete -------------------------------@@@@@@@@@@@@@@

app.delete('/places/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the place by ID and delete it
    const deletedPlace = await Place.findByIdAndDelete(id);

    // If the place is not found, return a 404 error
    if (!deletedPlace) {
      return res.status(404).json({ message: "Place not found" });
    }

    // If successfully deleted, return a success message
    res.json({ message: "Place deleted successfully" });
  } catch (error) {
    // If an error occurs, return a 500 error with the error message
    console.error("Error deleting place:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -----for bookings-------------------------------
// Route to get total number of bookings and all bookings
app.get("/totalBookings", async (req, res) => {
  try {
    // Fetch total number of bookings
    const totalBookings = await Booking.countDocuments();

    // Fetch all bookings
    const allBookings = await Booking.find().populate("place");

    // Send the total number of bookings and all bookings in the response
    res.json({ totalBookings, allBookings });
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//to delete

app.delete('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Find the booking by ID and delete it
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Route to get all documents
app.get('/alldocuments', async (req, res) => {
  try {
    const allDocuments = await DocumentModel.find();
    res.json(allDocuments);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//to delete

app.delete("/documents/:documentId", async (req, res) => {
  try {
    const { documentId } = req.params;
    
    // Use Mongoose to find and delete the document by ID
    const deletedDocument = await DocumentModel.findByIdAndDelete(documentId);
    
    if (!deletedDocument) {
      // If no document was found with the provided ID, send a 404 response
      return res.status(404).json({ error: "Document not found" });
    }
    
    // If the document was successfully deleted, send a success response
    res.json({ message: "Document deleted successfully", deletedDocument });
  } catch (error) {
    // If an error occurs during the deletion process, send a 500 response
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});