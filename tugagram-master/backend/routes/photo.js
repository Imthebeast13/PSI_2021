const express = require( 'express' );
const router = express.Router();

const photoController = require( '../controllers/photoController' );

// GET route /photo/:_id
router.get( '/:id', photoController.get_photo );

// POST route /hoto
router.post( '/', photoController.post_photo );

module.exports = router;
