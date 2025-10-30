module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
            
        },
        stellarWalletAddress: {
            type: DataTypes.STRING,
            allowNull: true,  
            unique: true,     
            validate: {
                is: /^G[A-Z0-9]{55}$/
            }
        }
        
    });

    return User;
};