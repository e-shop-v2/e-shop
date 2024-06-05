const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const jwtMiddleware = require("../middleware/jwtMiddleware");

// post a product (protected because its a seller feature)
router.post("/create", productController.createProduct);

// get all products
router.get("/getAll", productController.getAllProducts);
// get a product by the sales numbers
router.get('/sales',productController.getBestSellers)
// get one product
router.get("/:id", productController.getProductById);
//get product by category
router.get('/category/:category',productController.getProductsByCategory)

// update a product (protected because its a seller feature)
router.put("/:name", productController.updateProduct);

// delete a produt (protected because its a seller feature)
router.delete("/del/:name", productController.deleteProduct);
module.exports = router;
