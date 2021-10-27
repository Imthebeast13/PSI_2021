const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const PhotoSchema = new Schema(
    {
        base64: {type: String, required: true},
        name: {type: String, max: 100, required: true},
        description: {type: String, max: 500},
        likes: {type: Number, min: 0, required: true}
    } );

/**
 * Get photo url.
 */
PhotoSchema.virtual( 'url' )
    .get( function ()
    {
        return '/photo/' + this._id;
    } );

module.exports = mongoose.model( "Photo", PhotoSchema );
