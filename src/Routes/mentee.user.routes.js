import { Router, json } from "express";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
import  userModel  from "../Models/user.model.js";

export const router = Router();

// register route
router.post("/users", async (req, res, next) => {
    try {
        // add user to database
        const salt = bcrypt.genSaltSync(10);

        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        req.body.password = hashedPassword;
       
        const registerResult = await userModel.create(req.body);
        console.log( registerResult);
        res.status(201).json({registerResult});

        const token = Jwt.sign({id: loginResult._id}, "secretKey");

        console.log(token);

          res.status(201).json({ token:token})

    } catch (error) {
        next(error);
    }
});

// Fetch all users
router.get("/users", async (req, res, next) => {
    try {
        const fetchUsersResult = await userModel.find({});
        res.status(200).json(fetchUsersResult);
    } catch (error) {
        next(error);
    }
});


// Login a user
router.post("/users/login", async (req, res, next) => {
    console.log(req.body)

    try {
        // attempt to login
        const loginResult = await userModel.findOne( {email: req.body.email}).exec();
        console.log(loginResult);
        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            loginResult.password,
          );
        
          if (isPasswordMatch === false) {
            console.log("Error: Invalid credentials");
          }

        // Token generation
        const token = Jwt.sign({id: loginResult._id}, "secretKey");

        console.log(token);

          res.status(201).json({ token:token})
      
    } catch (error) {
        res.status(500).json({message: error});
        next(error);
    }
});

// Logout a user
router.delete('/users/logout', (req, res, next)=> {
    if(req.session) {
        req.session.destroy(error => {
            if (error) {
                next(error);
                res.status(400).send('Unable to log out');
            } else {
                res.send('Logout successful')
            }
        });
    } else {
        res.end();
    }
});