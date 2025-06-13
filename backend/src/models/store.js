const {Sequelize , DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');

const Store = sequelize.define('Store' ,{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate: {isEmail:true},
    },
    address:{
        type:DataTypes.STRING , 
        allowNull: false,
    },
    owner_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:'id',
        },
        onDelete:'CASCADE'
    },
},{
    timestamps: true,
});

// Store.belongsTo(User, { foreignKey: 'owner_id' });

module.exports = Store;