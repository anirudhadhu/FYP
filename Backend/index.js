const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("./Models/User.js");
const DocumentModel = require("./Models/Document");
const FavoritesModel = require("./Models/Favorites.js");
const PasswordResetModel = require("./Models/PasswordRest.js");
const Place = require("./Models/Place.js");
const Booking = require("./Models/Booking.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const { differenceInCalendarDays } = require("date-fns");
require("dotenv").config();
const axios = require("axios");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const Stripe = require("stripe");
const app = express();
const PORT = 4000;

const bcryptSalt = bcrypt.genSaltSync(10); // Generating salt for bcrypt hashing with a cost factor of 10
const jwtSecret = "bkwjbcf6ftyuwhcfdb7jkfbireb7refbhe9"; // Secret key for JWT token generation

// // Middleware setup for CORS with specific configuration
app.use(
  cors({
    credentials: true, // Allows sending cookies with cross-origin requests
    origin: "http://localhost:5173",
  })
);

// Initializing Passport.js middleware for authentication
// app.use(passport.initialize());

app.use(express.json()); // Parsing incoming JSON requests
app.use(cookieParser()); // Parsing cookies
app.use("/uploads", express.static(__dirname + "/uploads")); // Serving static files from the '/uploads' directory
app.use("/documents", express.static(__dirname + "/documents")); // Serving static files from the '/documents' directory

// Database connection
// Connecting to MongoDB using Mongoose, using the provided MONGO_URL environment variable.
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
// Start the server and make it listen for incoming requests on the specified port (PORT).
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// --------------------- --------------------- ----------------  Codes Start --------------------------------

//function to extract user data from the request object
function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    // Extract token from cookies or headers
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      // Check if a token is provided
      reject(new Error("No token provided"));
    }

    // Verify the token using the jwtSecret
    jwt.verify(token, jwtSecret, {}, (err, user) => {
      if (err) {
        reject(err); // If there's an error verifying the token, reject the promise with the error
      } else {
        resolve(user); // If verification is successful, resolve the promise with the user data extracted from the token
      }
    });
  });
}

// --------------------------       nodemailer  --------------------------

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com", // Gmail SMTP server configuration
  port: 465, // Port for SSL/TLS
  secure: true, // Use SSL/TLS
  auth: {
    user: "anirudhadhungana@gmail.com",
    pass: "aubv luaw utdp wstv",
  },
  debug: true, // Enable debugging
});

// -------------------------------------------------for signup---------------------------------------------------------------

app.post("/register", async (req, res) => {
  try {
    // Extract user data from request body
    const { name, number, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt); // Hash the password using bcrypt

    // Generate a unique verification token
    const verificationToken = uuidv4();

    // Create a new user document with verificationToken
    const userDoc = await UserModel.create({
      name,
      number,
      email,
      password: hashedPassword,
      uniqueString: verificationToken, // verification token to user document
    });

    // Send verification email
    const verificationLink = `http://localhost:5173/verify/${verificationToken}`;
    const mailOptions = {
      from: "anirudhadhungana@gmail.com", // Sender email address
      to: email, // Receiver email address
      subject: "Email Verification for TravelMate", // Email subject
      html: `Click <a href="${verificationLink}">here</a> to verify your email. If you did not request this email, please ignore it.`,
    };

    // Send verification email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending verification email:", error);
        res.status(500).json({ message: "Error sending verification email" });
      } else {
        console.log("Verification email sent:", info.response);
        res.json({
          message:
            "User registered successfully. Check your email for verification.",
        });
      }
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// -------------------Verification endpoint-------------

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token; // Extract the verification token from the request parameters

    // Find the user by the verification token
    const user = await UserModel.findOne({ uniqueString: token });

    if (!user) {
      // If no user found with the token, return an error
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user's verified field to true
    user.verified = true;
    await user.save();

    // Send a success response indicating that the user has been verified
    res.status(200).json({ message: "User verified successfully." });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Error verifying user." });
  }
});

// -----------------------------------------------------------------for login---------------------------------------------

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from the request body
    const user = await UserModel.findOne({ email }); // Find the user by their email in the database

    // If no user found with the provided email, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user's email has been verified
    if (!user.verified) {
      return res.status(403).json({ error: "Email not verified" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!passMatch) {
      return res.status(422).json({ error: "Wrong password" });
    }

    // If authentication is successful, generate a JWT token
    const token = jwt.sign({ email: user.email, id: user._id }, jwtSecret);
    // Set the JWT token as a cookie in the response for future authenticated requests
    res.cookie("token", token, { httpOnly: true }).json({ user, token });
  } catch (error) {
    // If any error occurs during the login process, log and respond with an error status
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

//-------------- Forgot password-----------------
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a unique password reset token
    const resetToken = uuidv4();
    const expires = Date.now() + 3600000; // Token expires in 1 hour

    // Save the password reset token in the database
    await PasswordResetModel.create({
      userId: user._id,
      token: resetToken,
      expires: expires,
    });

    // Send an email with the password reset link
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    const mailOptions = {
      from: "anirudhadhungana@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.`,
    };

    // Send the password reset email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending password reset email:", error);
        res.status(500).json({ error: "Error sending password reset email" });
      } else {
        console.log("Password reset email sent:", info.response);
        res.json({ message: "Password reset link sent to your email" });
      }
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Failed to process password reset request" });
  }
});

// --------------Reset password----------------
app.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Find the password reset token in the database
    const passwordReset = await PasswordResetModel.findOne({ token });

    // If no password reset token found with the provided token, return an error
    if (!passwordReset) {
      return res.status(404).json({ error: "Invalid or expired token" });
    }

    // Check if the token has expired
    if (passwordReset.expires < Date.now()) {
      return res.status(400).json({ error: "Token has expired" });
    }

    // Find the user associated with the password reset token
    const user = await UserModel.findById(passwordReset.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's password
    user.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
    await user.save();

    // Delete the password reset token from the database
    await passwordReset.deleteOne(); // Use deleteOne() to remove the document

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

// ------------------------------------------------Error handling middleware----------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// -----------------------------------------------------for profile-------------------------------------------------------------------

app.get("/profile", (req, res) => {
  const { token } = req.cookies; // Extract the token from cookies
  // Check if token is present
  if (token) {
    // Verify the token using the jwtSecret
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) {
        console.error("JWT verification error:", err);
        // Respond with the token even if there's an error during verification
        return res.json({ token });
      }
      try {
        // Find the user in the database by user ID
        const { name, email, number, _id } = await UserModel.findById(user.id);
        if (!name || !email || !number || !_id) {
          return res.status(404).json({ error: "User not found" });
        }
        // Respond with the user's profile details
        res.json({ name, number, email, _id });
      } catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } else {
    res.json(null); // If no token is provided, respond with null
  }
});

//-----------------------------------------------------logout------------------------------------------------
app.post("/logout", (req, res) => {
  res
    .clearCookie("token") // Clear the 'token' cookie
    .json(true); // Respond with a JSON indicating the logout was successful
});

// ------------------------------------for uploading photo from URL-----------------------------------------

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body; // Extract the image link from the request body
  const newName = "photo" + Date.now() + ".jpg"; // Generate a new unique name for the downloaded image
  // Use the imageDownloader library to download the image from the provided link
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName, // Specifying the destination path where the image will be saved
  });
  res.json(newName);
});

// -----------------------------------------for uploading photo from device-------------------------------------------------

// Middleware configuration for handling file uploads
const photosMiddleware = multer({ dest: "uploads" });
// Route for uploading photos from the device
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  console.log(req.files);

  // Initialize an array to store the paths of the uploaded files
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i];
    if (!file.originalname) {
      console.log("Original name missing for file:", file);
      continue;
    }

    // Split the original file name to extract the extension
    const parts = file.originalname.split(".");
    if (parts.length < 2) {
      console.log("Invalid file name format:", file.originalname);
      continue;
    }

    // Extract the file extension
    const ext = parts.pop();
    const newPath = file.path + "." + ext;
    fs.renameSync(file.path, newPath); // Rename the file to include its extension
    uploadedFiles.push(newPath.replace("uploads", ""));
  }
  res.json(uploadedFiles);
});

//====================================================== for destination save ===============================================

// Route for adding a new place
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

  // Verify the token using the jwtSecret
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    // Create a new place document in the database
    const placeDoc = await Place.create({
      owner: user.id, // Set the owner field to the user ID from the token
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

    // Respond with the newly created place document
    res.json(placeDoc);
  });
});

// ================================================= for adding destination to front =========================================

// Route for fetching places owned by a specific user
app.get("/user-places", (req, res) => {
  const { token } = req.cookies;

  // Verify the token using the jwtSecret
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    const { id } = user;
    res.json(await Place.find({ owner: id }));
  });
});

// Route for fetching details of a specific place by its ID
app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Find the place in the database by its ID
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

// Route for updating the details of a place
app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  // Destructure place details from the request body
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
    // Find the place document in the database by its ID
    const placeDoc = await Place.findById(id);
    // Check if the authenticated user is the owner of the place
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

// Route for deleting a place by its ID

app.delete("/places/:id", async (req, res) => {
  const { id } = req.params; // Extract the place ID from the request parameters
  const { token } = req.cookies; // Extract the token from cookies
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    try {
      // Find the place document in the database by its ID
      const place = await Place.findById(id);
      if (!place) {
        return res.status(404).json({ error: "Place not found" });
      }
      // Check if the authenticated user is the owner of the place
      if (user.id === place.owner.toString()) {
        await Place.findByIdAndDelete(id);
        res.json({ message: "Place deleted successfully" });
      } else {
        res.status(403).json({ error: "Unauthorized" });
      }
    } catch (error) {
      console.error("Error deleting place:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

// -------------------------------------------------adding all destination to homepage------------------------------

app.get("/places", async (req, res) => {
  // Query the database to find all place documents
  res.json(await Place.find({}));
});

// -------------=====================----for getting bookings for a specific user-------------==============================---

app.get("/bookings", async (req, res) => {
  // Extract user data from the request
  const user = await getUserDataFromReq(req);
  const bookings = await Booking.find({ user: user.id }).populate("place"); // Query the database to find bookings associated with the user's ID
  res.json(bookings);
});

//============================to display weather=================================

app.get("/weather", async (req, res) => {
  const { location } = req.query; // Extract the location from the query parameters
  const API_KEY = "da58343d1e62ee8244d7503a04206d7c"; // API key for accessing the OpenWeatherMap API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  try {
    // Make a GET request to the OpenWeatherMap API
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

//-----------------------------------===================to upload documents------------------------------

// Multer middleware configuration for handling file uploads
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

      // Log user's information
      console.log("User:", user);

      // Array to store paths of uploaded files
      const uploadedFiles = [];

      // Iterate through uploaded files
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        if (!file.originalname) {
          console.log("Original name missing for file:", file);
          continue;
        }

        // Extract file extension and create new file path
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

//----------------------------------------------to get documents-----------------------------
app.get("/documents", async (req, res) => {
  // Route for fetching documents associated with a specific user
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

//----------------------------------------------  for favorites     --------------------------------------

//---------- Route for adding a place to user's favorites
app.post("/favorites", async (req, res) => {
  try {
    const { place } = req.body;
    const user = await getUserDataFromReq(req);
    // Check if user is authenticated
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Create a new entry in FavoritesModel associating the user's ID with the place
    const favorite = await FavoritesModel.create({ user: user.id, place });
    res.status(201).json({ place: favorite.place });
  } catch (error) {
    console.error("Error adding place to favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//------- Route to remove a favorite place
app.delete("/favorites/:placeId", async (req, res) => {
  try {
    const { placeId } = req.params;
    const user = await getUserDataFromReq(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Delete the entry from FavoritesModel where user's ID matches and place ID matches the provided placeId
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
    // Find all favorite places associated with the user's ID in the FavoritesModel collection
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
    // Retrieve the total number of users from the UserModel collection
    const totalUsers = await UserModel.countDocuments();
    // Retrieve all user documents from the UserModel collection
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

app.delete("/allplaces/:id", async (req, res) => {
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

//to delete booking

app.delete("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Find the booking by ID and delete it
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all documents
app.get("/alldocuments", async (req, res) => {
  try {
    const allDocuments = await DocumentModel.find();
    res.json(allDocuments);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//to delete document

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

//---------------------------------------------------searching and sorting ----------------------------------------------------------------

app.get("/search", async (req, res) => {
  const { title } = req.query;
  try {
    // Search for places with titles that match the provided query
    const places = await Place.find({
      title: { $regex: title, $options: "i" },
    });

    res.json(places);
  } catch (error) {
    console.error("Error searching for places:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// -----------------for destination display with sorting-----------------

// Route to fetch and sort places
app.get("/sort-places", async (req, res) => {
  try {
    // Get the sort direction from query parameter, default to ascending order
    const sortDirection = req.query.sort === "desc" ? -1 : 1;

    // Fetch places and sort by price
    const places = await Place.find({}).sort({ price: sortDirection });

    res.json(places);
  } catch (error) {
    console.error("Error fetching and sorting places:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------------------------news integration ------------------

const NEWSDATA_API_KEY = "pub_43936529a797ca082df85f9ff4418000c84db"; // Newsdata.io API key

app.get("/news", async (req, res) => {
  try {
    // Make a request to the Newsdata.io API with specific query parameters
    const response = await axios.get(
      `https://newsdata.io/api/1/news?country=np&category=environment&apikey=${NEWSDATA_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

//------------------------------------------payment ------------------------------------

// Import the Stripe package and initialize it with the Stripe secret key

const stripe = require("stripe")(
  "sk_test_51PICsO030mp3Dwv9n0VmmRCmR6vsLlCgzVUWFuqgDf5Z6dxhWsyMphLEIc4vnzxq205cSh97MR7o1Uud92Md9qB200WNbwq9gl"
);

// Route for creating a checkout session

app.post("/create-checkout-session", async (req, res) => {
  // Extract required fields from the request body
  const { amount, currency, description, tokenId } = req.body;

  // Check if any required field is missing
  if (!amount || !currency || !description || !tokenId) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  try {
    // Create a payment intent with the provided amount, currency, description, and token
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      description: description,
      payment_method_data: {
        type: "card",
        card: {
          token: tokenId,
        },
      },
      confirm: true,
    });

    // Respond with the client secret of the payment intent
    res.json({ success: true, client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Route for creating a payment intent

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body; // Extract amount and currency from the request body

  try {
    // Create a payment intent with the provided amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    // Respond with the client secret of the payment intent
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Route for confirming payment

app.post("/confirm-payment", async (req, res) => {
  const { paymentIntentId, placeId, checkIn, checkOut } = req.body;

  try {
    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Check if the payment was successful
    if (paymentIntent.status === "succeeded") {
      const user = await getUserDataFromReq(req); // Get user data from the request
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const booking = await Booking.create({
        user: user.id,
        place: placeId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        price: paymentIntent.amount / 100,
      });

      res.status(200).json({ message: "Booking confirmed", booking });
    } else {
      res.status(400).json({ error: "Payment not successful" });
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Failed to confirm payment" });
  }
});

// ------------------------to make a booking  ---   -------------------     -----------------

app.post("/bookings", async (req, res) => {
  const user = await getUserDataFromReq(req);

  // Extract necessary fields from the request body
  const {
    place,
    title,
    checkIn,
    checkOut,
    name,
    number,
    numberOfGuests,
    perks,
    price,
    perkPrice,
    paymentIntentId,
  } = req.body;
  // Check if any required field is missing
  if (
    !place ||
    !title ||
    !checkIn ||
    !checkOut ||
    !name ||
    !number ||
    !numberOfGuests ||
    !perks ||
    !price ||
    !paymentIntentId
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Calculate the number of days for the booking
  const numberOfDays = differenceInCalendarDays(
    new Date(checkOut),
    new Date(checkIn)
  );

  // Calculate the total price for the booking
  const totalPrice =
    numberOfDays * price * numberOfGuests + perkPrice * numberOfGuests;

  // Create the booking document
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
    perks,
    perkPrice,
    user: user.id,
    paymentIntentId,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.error("Error creating booking:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
