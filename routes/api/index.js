const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes.js');
const userRoutes = require('./userRoutes');

router.use('/posts', thoughtsRoutes);
router.use('/users', userRoutes);

module.exports = router;