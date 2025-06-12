const { where } = require("sequelize");
const { Store, User, Rating } = require("../index");

const createRating = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(400).json({ error: "User ID is missing" });
    const { store_id, rating } = req.body;

    if (!store_id || !rating) {
      return res
        .status(400)
        .json({ message: "Store ID and rating are required." });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5." });
    }

    const existing = await Rating.findOne({
      where: { user_id: userId, store_id },
    });
    if (existing) {
      return res
        .status(409)
        .json({ message: "You have already rated this store." });
    }

    const newRating = await Rating.create({
      user_id: userId,
      store_id,
      rating,
    });
    res.status(201).json({ message: "Rating submitted.", rating: newRating });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error." });
  }
};

const updateRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const ratingId = req.params.id;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5." });
    }

    const existing = await Rating.findOne({
      where: { id: ratingId, user_Id: userId },
    });
    if (!existing) {
      return res
        .status(404)
        .json({ message: "Rating not found or unauthorized." });
    }
    existing.rating = rating;
    await existing.save();
    res.status(200).json({ message: "Rating updated.", rating: existing });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getMyRatings = async (req, res) =>{
    try {
        const userId = req.user.id;

        const ratings = await Rating.findAll({
            where:{user_id:userId},
            include:{
                model: Store,
                attributes:['id' ,'name' , 'address'],
            },
        })

        const response =  ratings.map(rate =>({
            id:rate.id,
            rating:rate.rating,
            store:rate.store_id
        }))

        res.status(200).json({ ratings: response });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
}

const getRatingsForStore = async (req, res) =>{
  try {
    const ownerId = req.user.id;
    const storeId = req.params.id;
    // console.log(ownerId);
    // console.log(storeId);
    

    const store = await Store.findOne({where:{id:storeId , owner_Id:ownerId}});
    
    if (!store) {
      return res.status(403).json({ message: 'Unauthorized or store not found.' });
    }
    const ratings = await Rating.findAll({
      where:{store_Id:storeId},
      include:{
        model:User,
        attributes:['id' , 'name' , 'email'],
      },
    })

    const avg = ratings.reduce((sum, rate) => sum+ rate.rating,0)/(ratings.length || 1);

    res.status(200).json({
      store:{
        id:store.id,
        name: store.name,
        address: store.address,
        averageRating: avg.toFixed(1),
      },
      ratings:ratings.map(rate =>({
        id: rate.id,
        rating: rate.rating,
        user: rate.User,
      })),
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = {
  createRating, updateRating , getMyRatings , getRatingsForStore
};
