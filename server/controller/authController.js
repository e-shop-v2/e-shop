const db = require("../database/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { editUserRole } = require("./UsersController");

//// function to register the user as a seller
const registerSeller = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;
  try {
    /// we hash the password in the db
    const hashedPassword = await bcrypt.hash(password, 10);
    /// we store the user's info in the seller table
    const newSeller = await db.Seller.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    res.status(201).json(newSeller);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

///// function to register the user as a buyer
const registerBuyer = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;
  try {
    /// we hash the password in the db
    const hashedPassword = await bcrypt.hash(password, 10);
    /// we store the user's info in the buyer table
    const newBuyer = await db.Buyer.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    res.status(201).json(newBuyer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//// function login that checks the user in all tables
//// if the user is not in any on them it returns an error
const login = async (req, res) => {
  const { email, phoneNumber, password } = req.body;
  try {
    /// if the user insert another info rather than email and phone number we display an error
    if (!email && !phoneNumber) {
      return res
        .status(400)
        .json({ error: "please insert ur email or phone number" });
    }
    /// now we check the user's info when he insert the right input type(his email or phone number)
    /// we search the login info in the seller table (first by email then phone number )
    let user = await db.Seller.findOne({
      where: email ? { email } : { phoneNumber },
    });
    /// if the user not found we move to the buyer table
    if (!user) {
      user = await db.Buyer.findOne({
        where: email ? { email } : { phoneNumber },
      });
    }
    /// if the user not found again we search it in the admin table
    if (!user) {
      user = await db.Admin.findOne({
        where: email ? { email } : { phoneNumber },
      });
    }
    /// if the user is not found in all the 3 tables we return an error
    if (!user) {
      return res.status(401).json({ error: "please re-check your info" });
    }
    /// we compare compare the hashed password in our db with the user input
    const pwChecker = await bcrypt.compare(password, user.password);
    if (!pwChecker) {
      return res.status(401).json({ error: "wrong password" });
    }

    //// we assign roles to users correspondent to their table to use it in token
    let role;
    if (user instanceof db.Admin) {
      role = "admin";
    } else if (user instanceof db.Seller) {
      role = "seller";
    } else {
      role = "buyer";
    }
    //// we pass the user id , user name and his role (the role we took it from the conditions above )

    const token = jwt.sign(
      { id: user.id, name: user.name, role: role },
      "your_jwt_secret"
    );
    const roleUser = user.role;
    const obj = { token };
    obj[roleUser] = user;
    res.json(obj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//// function to change user role
const changeUserRole = async (req, res) => {
  //// we declare email(we need it to search a certain user)
  /// and newRole(the role that we want to change the user  to)
  const { email, newRole } = req.body;
  try {
    /// first we search the user in seller table
    let user = await db.Seller.findOne({ where: { email } });
    /// if we find him we call editUserRole from userscontroller and give its body email
    /// and the currentRole of the user (we are searching in the seller table so the user is seller)
    /// and we declare newRole where we gonna set the new role (which is buyer )
    if (user) {
      return await editUserRole(
        { body: { email, currentRole: "seller", newRole } },
        res
      );
    }
    /// same thing but in the other way
    user = await db.Buyer.findOne({ where: { email } });
    if (user) {
      return await editUserRole(
        { body: { email, currentRole: "buyer", newRole } },
        res
      );
    }
    //// if the user not found we return an error
    res.status(404).json({ error: "user not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerSeller, registerBuyer, login, changeUserRole };
