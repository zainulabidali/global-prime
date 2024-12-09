


const success_function = require('../util/responseHandler').success_function;
const error_function = require('../util/responseHandler').error_function;
let access = require('../db/models/access');
let usertype = require ('../db/models/usertype')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.login = async function (req, res) {
    try {
        // Extract email and password from the request body
        let email = req.body.email;
        console.log("email: ", email);

        let password = req.body.password;
        console.log("password: ", password);

        // Find the user by email in the database
        let user = await access.findOne({ email }).populate('usertype')
        console.log("User Data: ", user); // Log the entire user object for debugging

        // Check if the user exists
        if (user) {
            // Compare the provided password with the hashed password from the database
            let db_password = user.password;
            console.log("db_password: ", db_password);

            let passwordMatch = bcrypt.compareSync(password, db_password);
            console.log("passwordMatch: ", passwordMatch);

            // If password matches, proceed to generate a token
            if (passwordMatch) {
                let token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "10d" });

                let id = user._id;
                console.log('User ID:', id);

                // Check for the usertype field and handle undefined cases
                let usertypes = user.usertype || 'default'; // Fallback if undefined
                console.log('usertype:', usertypes);

                if (!user.usertype) {
                    console.warn("Warning: Usertype is missing or undefined. Default value is used.");
                }

                // Prepare token data to send in the response
                let token_data = {
                    token,
                    id,
                    usertypes
                }

                // Send a success response
                let response = success_function({
                    success: true,
                    statuscode: 200,
                    data: token_data,
                    message: "Successfully logged in.",
                });
                res.status(response.statuscode).send(response);
                return;

            } else {
                // If password does not match, send an error response
                let response = error_function({
                    success: false,
                    statuscode: 400,
                    message: "Invalid password.",
                });
                res.status(response.statuscode).send(response);
                return;
            }

        } else {
            // If user not found, send a 404 error response
            let response = error_function({
                success: false,
                statuscode: 404,
                message: "User not found.",
            });
            res.status(response.statuscode).send(response);
            return;
        }

    } catch (error) {
        // Catch and log any errors
        console.error("Error during login process: ", error);

        // Send an error response
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "An error occurred during login.",
        });
        res.status(response.statuscode).send(response);
        return;
    }
}
 