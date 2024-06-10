const db = require("../database/index");

/// retrieve all users from both tables (buyers and seller)
const getAllUsers = async (req, res) => {
  try {
    const buyers = await db.Buyer.findAll();
    console.log("Buyers fetched successfully");

    const sellers = await db.Seller.findAll();
    console.log("Sellers fetched successfully");

    res.status(200).json({ buyers, sellers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
/// retrieve a certain user by his email (we search him in both tables)
const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    let user = await db.Buyer.findOne({ where: { email } });
    if (!user) {
      user = await db.Seller.findOne({ where: { email } });
    }
    /// if the user is not found in both table we return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    /// ternary operator to check the user role , if we retrived that user from the seller table
    /// it gives it the role "seller" and if we retrieved it from the buyers table it gives him
    /// buyer role
    const role = user instanceof db.Seller ? "seller" : "buyer";
    res.status(200).json({ user, role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

/// delete a certain usere from all the tables with his email
const deleteUser = async (req, res) => {
  const { email } = req.params;
  try {
    let user = await db.Buyer.findOne({ where: { email } });
    if (!user) {
      user = await db.Seller.findOne({ where: { email } });
    }
    /// if the user is not found in both tables we return an error
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    /// if we find the user we destroy it (we delte it and we return a message "user deleted")
    await user.destroy();
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//// we gonna make the function that allow us to change the role of the user (we need it in the usersController)
const editUserRole = async (req, res) => {
  const { email, currentRole, newRole } = req.body;
  try {
    let user;
    /// if we wanna change the user's role from seller to buyer
    if (newRole === "buyer") {
      /// we search the user in the seller table with his email
      user = await db.Seller.findOne({ where: { email } });
      if (user) {
        /// when we find him we create a row in buyer table with the user info retrieved from the seller table
        await db.Buyer.create({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: user.password,
          firstname:user.firstname, 
          lastname:user.lastname,
        

        });
        /// then we destroy(delete) the user info from the previous table (in this case in the seller table )
        await user.destroy();
        console.log("user has been changed from seller to buyer successfully");
      } else {
        /// we return an error if the user is not found in the seller table
        console.log("user not found in sellers table");
      }
      /// now we're gonna repeat the same thing but reversed
    } else if (newRole === "seller") {
      user = await db.Buyer.findOne({ where: { email } });
      if (user) {
        await db.Seller.create({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: user.password,
        });
        await user.destroy();
        console.log("user has been changed from buyer to seller successfully");
      } else {
        console.log("user not found in buyers table");
      }
    }
    /// if the user is not found in both tables we return an error
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    /// and when the user is found and his role has been changed we return "role updated"
    res.status(200).json({ message: "role updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers, getUserByEmail, deleteUser, editUserRole };
