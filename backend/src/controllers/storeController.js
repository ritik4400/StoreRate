const { Store, User } = require('../index');

const createStore = async (req,res) =>{
    try {
        const {name, email, address, owner_id} = req.body;

        if(!name || !email || !address ||!owner_id ){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const owner = await User.findOne({where:{id:owner_id, role:'store_owner'}});
        if(owner){
            return res.status(409).json({ message: 'Store owner already exist' });
        }
        const newStore = await Store.create({
            name, email, address, owner_id
        })
        res.status(201).json({
      message: 'Store created successfully',
      store: newStore 
    });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createStore
}

