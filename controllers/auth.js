const { response } = require('express');

const { User } = require('../models')

const { googleVirify, generateJWT } = require('../helpers');

const googleSignIn = async (req, res = response) =>{
    const {id_token} = req.body;

    try {
        const { ...data } = await googleVirify(id_token);
        
        //Find user in BD
        let user = await User.findOne( { email : data.email } );

        //save user !exist
        if( !user ){            
            user = new User( data );
            await user.save();
        }

        const token = await generateJWT( user.id );
    
        return res.status(200).json({
            user,
            token
        });
    
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg : 'Google-token invalid'
        });        
    }
    
}

const revalidateToken = async ( req, res = response ) => { 
    
    const user = req.userAuthenticated;

    // Generate JWT
    const token = await generateJWT( uid );

    res.status(200).json({
        user,
        token
    })
}

module.exports = {
    googleSignIn,
    revalidateToken
}