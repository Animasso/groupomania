const sequelize = new Sequelize('groupomania', 'root', 'Animasso1170', {
    host: 'localhost',
    dialect: 'mysql' 
    
  });
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }