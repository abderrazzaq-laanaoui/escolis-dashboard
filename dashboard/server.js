// (A) INITIALIZE
// (A1) LOAD REQUIRED MODULES
// npm i path express cookie-parser helmet csurf express-rate-limit
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const csrf = require("csurf");
const csurfProtection = csrf({ cookie: true });
const rateLimit = require("express-rate-limit");

const port =8001;
// (A) EXPRESS 
const app = express();

// Enable various security headers
app.use(helmet());

// Enable HSTS
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));

// Prevent content type sniffing
app.use(helmet.noSniff());

// Prevent framing of your site
app.use(helmet.frameguard({ action: "sameorigin" }));

// Enable XSS filter
app.use(helmet.xssFilter());

// Serve static files
app.use(express.static(__dirname));

// Middleware for parsing JSON and URL-encoded data
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

// Rate limiting to protect against brute force attacks and DoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

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