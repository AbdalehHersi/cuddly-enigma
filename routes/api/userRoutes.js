const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
  } = require('../../controllers/user-controller');
  
  router.route('/').get(getUsers).post(createUser);
  
  router.route('/:userId').get(getSingleUser).post(updateUser);

module.exports = router;