const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
const routerWish = require("./routes/wishListRoutes.js");
const routerPa = require("./routes/panierRoutes.js");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/UsersRoutes");
const productRoutes = require("./routes/productRoutes");
const profileSeller = require("./routes/ProfileSellerRoutes.js");
const profileBuyer = require("./routes/createProfileBuyer");
const routerStar = require("./routes/starsRoutes.js");
// const cart = require("./routes/cartRoutes.js");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/seller", profileSeller);
app.use("/api/Buyer", profileBuyer);
app.use("/api/wishList", routerWish);
app.use("/api/panier", routerPa);
app.use("/api/stars", routerStar);
// app.use("/api/cart", cart);
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
