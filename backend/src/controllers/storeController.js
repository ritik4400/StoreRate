const { Store, User, Rating } = require("../index");

const createStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    if (!name || !email || !address || !owner_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const owner = await User.findOne({
      where: { id: owner_id, role: "store_owner" },
    });
    if (owner) {
      return res.status(409).json({ message: "Store owner already exist" });
    }
    const newStore = await Store.create({
      name,
      email,
      address,
      owner_id,
    });
    res.status(201).json({
      message: "Store created successfully",
      store: newStore,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [
        {
          model: Rating,
          attributes: ["rating"],
        },
      ],
    });
    const response = stores.map((store) => {
      const ratings = store.Ratings || [];
      const total = ratings.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = ratings.length
        ? (total / ratings.length).toFixed(1)
        : null;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        averageRating: avgRating,
      };
    });
    res.status(200).json({ stores: response });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error" });
  }
};

const getStoreById = async (req, res) => {
  try {
    const storeId = req.params.id;

    const store = await Store.findByPk(storeId, {
      include: [
        {
          model: Rating,
          as: 'ratings', 
          include: {
            model: User,
            as: 'user',
            attributes: ["id", "name", "email"],
          },
        },
        {
          model: User,
          as: "owner",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    const ratings = store.Ratings || [];
    const avg = ratings.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = ratings.length ? (avg / ratings.length).toFixed(1) : null;

    const userRatings = ratings.map((r) => ({
      user: r.user,
      ratings: r.rating,
    }));
    res.status(200).json({
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      averageRating: avgRating,
      ratings: userRatings,
      owner: store.owner || null,
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createStore,
  getAllStores,
  getStoreById,
};
