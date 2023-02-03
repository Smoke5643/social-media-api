const connection = require('../config/connection');
const { User, Thought } = require('../models');
const newUserSeed = require('./data');

connection.once('open', async () => {

  await User.deleteMany({});
  
  await Thought.deleteMany({});

  const users = newUserSeed;

  await User.collection.insertMany(users);

  console.table(users);

  console.log('Seeding complete!');

  process.exit(0);
})