const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    UpdateThought,
    deleteThought
} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(UpdateThought).delete(deleteThought);

module.exports = router;