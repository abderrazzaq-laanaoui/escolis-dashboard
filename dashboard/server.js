// (A) INITIALIZE
// (A1) LOAD REQUIRED MODULES
// npm i path express cookie-parser helmet csurf express-rate-limit
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const rateLimit = require("express-rate-limit");

const port = 8000;
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


// Set EJS as a template engine
app.set("view engine", "ejs");

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
app.use(csrfProtection);
const Tokensarray = [];
// (B) HOME PAGE - OPEN TO ALL
app.get("/", (req, res) => {
  const csrfToken = req.csrfToken();
  //console.log(csrfToken);
  Tokensarray.push(csrfToken)
  res.render("index", { csrfToken });
});
 
// (D5) LOGIN ENDPOINT
app.post("/api/v1/auth/user-auth",csrfProtection, (req, res) => {
  const { email, password, _csrf} = req.body;
  //console.log(_csrf);
  const csrf = Tokensarray[0];
  //console.log(csrf)
  const index = Tokensarray.indexOf(_csrf);
  // Verify CSRF token
  if (index <0) {
    return res.status(403).json({ message: "CSRF token mismatch" });
  }
  delete Tokensarray[index];
  //console.log(Tokensarray)
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