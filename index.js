const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
let refreshTokens = [];

app.use(express.json());

app.post("/login", (req, res) => {
  const user = req.body.user;
  console.log(user);

  if (!user) {
    return res.status(404).json({ message: "Body empty" });
  }

  let accessToken = jwt.sign(user, "access", { expiresIn: "30s" });
  let refreshToken = jwt.sign(user, "refresh", { expiresIn: "7d" });
  refreshTokens.push(refreshToken);

  return res.status(201).json({
    accessToken,
    refreshToken,
  });
});

//middleware to authenticate
const authenticate = async (req, res, next) => {
  let token = req.headers["x-api-key"];

  jwt.verify(token, "access", async (err, user) => {
    if (user) {
      req.user = user;
      next();
    } else if (err.message === "jwt expired") {
      return res.json({ success: false, message: "access token expired" });
    } else {
      console.log(err);
      return res.status(403).json({ err, message: "user not authenticated" });
    }
  });
};

// Protected route, can only be accessed when user is logged-in
app.post("/protected", authenticate, (req, res) => {
  return res.json({ message: "Protected content!" });
});

//create a new accessToken using refreshToken
app.post("/refresh", (req, res) => {
  let refreshToken = req.body.token;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.json({ message: "refresh token not found, login again" });
  }

  jwt.verify(refreshToken, "refresh", (err, user) => {
    if (!err) {
      let accessToken = jwt.sign({ username: user.name }, "access", {
        expiresIn: "20s",
      });
      return res.json({ success: true, accessToken });
    } else {
      return res.json({ success: false, message: "invalid refresh token" });
    }
  });
});

app.listen(3004, () => {
  console.log("express app running on port 3004");
});
