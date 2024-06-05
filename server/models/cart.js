module.exports=(sequelize,DataTypes) =>{
    const  cart =  sequelize.define('cart', {
        nameOfproduct: 
        { type: DataTypes.STRING,
           allowNull: false },
        total: 
        { type: DataTypes.STRING,  
          allowNull: false },
        category: 
        { type: DataTypes.STRING, 
          allowNull: false },
        
          username: {
            type: DataTypes.STRING,
            allowNull: false,
          },   
         
        
      })
      return cart;
 }