// (A) INITIALIZE
// (A1) LOAD REQUIRED MODULES
// npm i bcryptjs express body-parser cookie-parser multer jsonwebtoken
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const csurfProtection = csrf({ cookie: true });

const port =8001;
// (A) EXPRESS 
const app = express();
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended : true}))

// Middleware for parsing cookies
app.use(cookieParser());

const users = [
  {
    email: "example@etud.univ-ubs.fr",
    password: "password123", // Exemple to do the demo
  },
];

// (B) HOME PAGE - OPEN TO ALL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
 
// (D5) LOGIN ENDPOINT
app.post("/api/v1/auth/user-auth", (req, res) => {
  const { email, password} = req.body;
  
  // Verify CSRF token
  // if (_csrf !== req.csrfToken()) {
  //   return res.status(403).json({ message: "CSRF token mismatch" });
  // }
  // Find the user by matching the provided email
  const user = users.find((u) => u.email === email);

  if (user) {
    // Compare the provided plaintext password with the stored password
    if (user.password === password) {
      res.status(200).json({ message: "Authentication successful" });
    } else {
      res.status(401).json({ message: "Invalid email/password combination" });
    }
  } else {
    res.status(401).json({ message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})