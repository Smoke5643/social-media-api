const connection = require('../config/connection');
const User = require('../models/User');
const newUserSeed = require('./data');

connection.once('open', async () => {

  await User.deleteMany({});

  const users = newUserSeed;

  await User.collection.insertMany(users);

  console.table(users);

  console.loG('Seeding complete!');

  process.exit(0);
})