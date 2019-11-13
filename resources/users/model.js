const db = require('../../data/dbConfig');

exports.getAllUsers = department => {
  return db('users')
    .where({ department })
    .select('users.id', 'users.username', 'users.department');
};

exports.getUser = username => {
  return db('users')
    .where('username', '=', username)
    .select('users.id', 'users.username', 'users.department')
    .first();
};

exports.postUser = async user => {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
};

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
