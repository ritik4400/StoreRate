const {User , Store ,Rating} = require("../index");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    if (!name || !email || !address || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      address,
      password: hashedPassword,
      role,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Signup failed", details: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "address", "role"],
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "address", "role"],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const fetchAllUsers = async (req, res) => {
  try{
  const {
    name,
    email,
    address,
    role,
    sortBy = "name",
    order = "Asc",
    page = 1,
    limit = 10,
  } = req.body;

  const where = {};

  if(name) where.name = { [Op.like]: `%${name}`};
  if(email) where.email = { [Op.like]: `%${email}`};
  if(address) where.address = { [Op.like]: `%${address}`};
  if(role) where.role = {[Op.like]: `%${role}`}

  const offset = (parseInt(page)- 1) * parseInt(limit);
  const sortField = sortBy || 'name';
  const sortOrder = order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

  const {count , rows} = await User.findAndCountAll({
    where ,
    limit:parseInt(limit),
    offset,
    order :[[sortField , sortOrder]],
    attributes:['id', 'name', 'email', 'address', 'role'],
  })
   res.status(200).json({
      totalUsers: count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      users: rows,
    });
}catch(error){
  res.status(500).json({ message: 'Internal server error.' });
}

};

const getAdminMetrics = async (req,res) =>{
  try {
    const [totalUsers , totalStores , totalRatings] = await Promise.all([
      User.count(),
      Store.count(),
      Rating.count()
    ]);
    res.status(200).json({
      totalUsers,
      totalStores,
      totalRatings
    });
  } catch (error) {
    console.error("Error in /admin/metrics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}



module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  fetchAllUsers,
  getAdminMetrics
};
