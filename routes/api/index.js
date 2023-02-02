const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutesRoutes');
const userRoutes = require('./userRoutes');

router.use('/user', thoughtRoutes);
router.use('/thought', userRoutes);

module.exports = router;