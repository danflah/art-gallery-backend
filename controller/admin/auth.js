const bcrypt = require("bcrypt");
const Admin = require("../../models/Admin");
const { generateJwtToken } = require("../../utils");

exports.signup = (req, res) => {
  const { email, password } = req.body;
  Admin.findOne({ email }).exec(async (error, admin) => {
    if (admin)
      return res.status(400).json({
        error: "Email already registered",
      });

    const hash_password = await bcrypt.hash(password, 10);
    const _admin = new Admin({
      email,
      password: hash_password,
    });

    _admin.save((error, admin) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (admin) {
        const { _id, email } = admin;
        const token = generateJwtToken(_id, email);
        return res.status(201).json({
          token,
          email
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body
  Admin.findOne({ email }).exec(async (error, admin) => {
    if (error) return res.status(400).json({ error });

    if (admin && bcrypt.compareSync(password, admin.password)) {
      const { _id, email } = admin;
      const token = generateJwtToken(_id, email);
        res.status(200).json({
          success: true,
          message: "Well come",
          token,
          email
        });

    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};