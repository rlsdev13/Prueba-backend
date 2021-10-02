const { response } = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const validateJWT = async (req, res = response, next) => {
    const token = req.header('x-token')

    if ( !token ) {
        return res.status(401).json({
            msg:"You don't have permission - there is no token in the request"
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //find user in db
        const userAuthenticated = await Usuario.findById( uid );

        //validate if the user is registered in the database
        if( !userAuthenticated ){
            return res.status(401).json({
                msg : "The user is not registered"
            })
        }
        
        req.userAuthenticated = userAuthenticated;

        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            msg : "Invalid Token"
        });
    }

    

    
}

module.exports = {
    validateJWT
}