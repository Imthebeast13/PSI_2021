const Photo = require( '../models/photo' );

const PHOTO_LIMIT = 15;

exports.post_photo = function ( req, res )
{
    const photoBase64 = req.body.base64;
    const photoName = req.body.name;
    const photoDescription = req.body.description;

    if ( photoBase64 && photoName )
    {
        const newPhoto = new Photo( {base64: photoBase64, name: photoName, description: photoDescription, likes: 0} );

        // saves new user in database
        newPhoto.save( ( err ) =>
        {
            if ( err )
            {
                res.status( 400 ).send( {message: err} );
                return;
            }

            res.send( newPhoto );
        } );
    }
    else
    {
        res.status( 400 ).send( {message: "Invalid parameters."} );
    }
}

exports.get_photo = function ( req, res )
{

    Photo.findById( req.params.id ).exec( ( err, photo ) =>
        {
            if ( err )
            {
                res.status( 500 ).send( {message: err} );
                return;
            }

            // if photo does not exist in database
            if ( !photo )
            {
                res.status( 404 ).send( {message: "Photo Not found."} );
                return;
            }

            res.status( 200 ).send( photo );
        }
    )
}

exports.photo_list = function ( req, res, next )
{
    console.log( "start" );

    Photo.find().sort( {$natural: -1} ).limit( PHOTO_LIMIT )
        //.populate("somethin")
        .exec( function ( err, list_of_photos )
        {
            if ( err )
            {
                return next( err );
            }
            res.send( list_of_photos );
        } );

    console.log( "end" );
};


