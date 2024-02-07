const { User, Thought } = require('../models');
const connection = require('../config/connection');

connection.on('error', (err) => console.error(err));
connection.once('open', async () => {
  console.log('connected to the database');
});

const usersData = [
  {
    username: 'alice',
    email: 'alice@example.com',
  },
  {
    username: 'bob',
    email: 'bob@example.com',
  },
  // ... other users
];

const thoughtsData = [
  {
    thoughtText: 'This is a thought by alice.',
    username: 'alice',
  },
  {
    thoughtText: 'This is a thought by bob.',
    username: 'bob',
  },
  // ... other thoughts
];

const seedDatabase = async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  await User.collection.insertMany(usersData);
  await Thought.collection.insertMany(thoughtsData);

  console.log('Database seeded!');
  process.exit(0);
};

seedDatabase();
