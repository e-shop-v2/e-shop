const jwt = require("jsonwebtoken");

// we create a middleware function to verify each token coming from users
const jwtMiddleware = (req, res, next) => {
  // we need to retrieve the value of Authorization in the user's request 
  // .header allow us to retrieve the value of the key "Authorization"
  // we store that value in authHeader to use it later
  const authHeader = req.header("Authorization");

  // we need to check if we have the authHeader (value of Authorization ) otherwise we return an error
  if (!authHeader) {
    return res.status(401).json({ error: "access denied" });
  }

// we need to delete the word "Bearer" from authHeader (we replace Bearer in the value of Authorization
// with an empty string)
// we store the rest in "token" because we're gonna use it later too
   
  const token = authHeader.replace("Bearer ", "");

  try {
    // now we declare a new constant "decoded" 
    // we need to verify if the signature of the JWT hasn't been tampered with 
    // also verify if the token hasn't been expired (we didnt make expiration time in our project)
    const decoded = jwt.verify(token, "your_jwt_secret");
    // we assign the decode payload to the user prop in the req
    req.user = decoded;
    // we move on to the next middleware
    next();
  } catch (err) {
    // finally we return an error if the token used in invalid
    res.status(400).json({ error: "invalid token" });
  }
};
// this code is like a checkpoint for a website.
// when the user send a request to the website this code checks if they have a special passcode called jwt
// if we don't have the passcode, we're told that we can't access the site (an error is displayed)
// if we do ,  this code checks if it's valid using a secret code
// if everything is okay, we're allowed to proceed

module.exports = jwtMiddleware;
