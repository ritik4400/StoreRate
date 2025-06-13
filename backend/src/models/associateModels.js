
const associateModels = ({ User, Store, Rating }) => {

  User.hasMany(Store, { foreignKey: 'owner_id', onDelete: 'CASCADE', as: 'stores' });
  Store.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

  User.hasMany(Rating, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'ratings' });
  Rating.belongsTo(User, { foreignKey: 'user_id',as :'user' });

  Store.hasMany(Rating, { foreignKey: 'store_id', onDelete: 'CASCADE',as: 'ratings' });
  Rating.belongsTo(Store, { foreignKey: 'store_id',  as: 'store' });
};

module.exports = associateModels;
