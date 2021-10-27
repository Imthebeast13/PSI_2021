const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {type: String, required: true, minlength: 3, unique: true},
        password: {type: String, required: true},
        photoList: [{type: Schema.Types.ObjectId, ref: "Photo"}]
    } );

/**
 * Get user url.
 */
UserSchema.virtual( 'url' )
    .get( function () {
        return '/user/' + this.username;
    } );

module.exports = mongoose.model( "User", UserSchema );
