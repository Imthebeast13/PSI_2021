const express = require( 'express' );
const router = express.Router();

const photoController = require( '../controllers/photoController' );

// GET route /home/all
router.get( '/all', photoController.photo_list );

module.exports = router;
