import {Router} from 'express';
import { sample_fruits, sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/https_status';
import bcrypt from 'bcryptjs';
import { FruitModel } from '../models/fruits.model';


const router = Router();

router.get("/seed", asyncHandler(
    async(req, res) => {
        const fruitsCount = await FruitModel.countDocuments();
        if(fruitsCount > 0) {
            res.send("seed is already done!");
            return;
        }
        await FruitModel.create(sample_fruits);
        res.send("seed is done")
    }
));

router.get("/", asyncHandler (
    async (req, res)=> {
        const fruitsCount = await FruitModel.countDocuments();
        if(fruitsCount > 0) {
            const fruits = await FruitModel.find();
            res.status(200).send(fruits);
            return;
        }
        res.status(500).send("No fruit is availale in the collection")
}));

router.put("/update", asyncHandler(
    async (req, res) => {
        const {name} = req.body;
        let fruit: any;
        let updatedFruit: any;
        fruit = await FruitModel.findOne({name});
        if(name) {
            updatedFruit = await FruitModel.replaceOne({name: name}, req.body);
            fruit = await FruitModel.findOne({name});
            res.send(fruit);
                } else {
            res.status(500).send('error has occurred while uploading the file');
        }
    }
));

// router.post("/register", asyncHandler(
//     async (req, res) => {
//         let { name, userName, email, password, isAdmin } = req.body;
//         const user = await FruitModel.findOne({email});

//         if(user) {
//             res.status(HTTP_BAD_REQUEST).send('User already exists, please login');
//         } 

//         const encryptedPassword = await bcrypt.hash(password, 10);

//         const newUser:User = {
//             id:'',
//             name,
//             userName,
//             email: email.toLowerCase(),
//             password: encryptedPassword,
//             isAdmin,
//             token: ''
//         }

//         const dbUser = await FruitModel.create(newUser);

//         res.send(generateJsonWebToken(dbUser))

//         }
// ))

// const generateJsonWebToken = (user: User) => {
//     const token = jwt.sign({
//         email:user.email, isAdmin: user.isAdmin
//     }, "12345", {expiresIn: "30d"});

//     user['token'] = token;
//     console.log('token generated', user);
//     return user;
// }

export default router;
