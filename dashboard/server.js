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
//app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "ajax.googleapis.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "fonts.gstatic.com", "cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "gravatar.com"],
      frameSrc: ["'self'", "https://ent.univ-ubs.fr", "https://www-ensibs.univ-ubs.fr","https://www.univ-ubs.fr"],
      connectSrc: ["'self'"],
    },
  })
);

// Enable HSTS
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));

// Prevent content type sniffing
app.use(helmet.noSniff());

// Prevent framing of your site
app.use(helmet.frameguard({ action: "sameorigin" }));

// Enable XSS filter
app.use(helmet.xssFilter());

// Serve static files
app.use(express.static(__dirname+'/public'));


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

let Tokensarray = [];
// (B) HOME PAGE - OPEN TO ALL
app.get("/", (req, res) => {
  const csrfToken = req.csrfToken();
  //console.log(csrfToken);
  Tokensarray.push(csrfToken)
  res.render("index", { csrfToken });
});
 
// (D5) LOGIN ENDPOINT
app.post("/api/v1/auth/user-auth", (req, res) => {
  const { email, password, _csrf} = req.body;
  console.log(email);
  console.log(password);
  console.log(_csrf);
  const index = Tokensarray.indexOf(_csrf);
  // Verify CSRF token
  if (index <0) {
    return res.status(403).json({ message: "CSRF token mismatch" });
  }
  //Remove the used token from our array
  Tokensarray = Tokensarray.filter(it =>it !=_csrf);
  //console.log(Tokensarray)
  // Find the user by matching the provided email
  const user = users.find((u) => u.email === email);

  if (user) {
    // Compare the provided password with the stored password
    if (user.password === password) {
      res.status(200).json({ message: "Authentication successful" });
    } else {
      res.status(401).json({ message: "Invalid email/password combination" });
    }
  } else {
    res.status(401).json({ message: "User not found" });
  }
});

app.get("/dashboard", (req, res) => {
  // Render the dashboard page
  //res.render("dashboard");
  res.sendFile(path.join(__dirname, "./public/dashboard.html")); 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})