import {Router} from 'express';
import { sample_fruits } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST, HTTP_UNAUTHORISED_REQUEST } from '../constants/https_status';
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

router.get("/",verifyToken, asyncHandler (
    async (req, res)=> {
        const fruitsCount = await FruitModel.countDocuments();
        if(fruitsCount > 0) {
            const fruits = await FruitModel.find();
            res.status(200).send(fruits);
            return;
        }
        res.status(500).send("No fruit is availale in the collection")
}));

router.put("/update",verifyToken, asyncHandler(
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

function verifyToken(req:any, res:any, next: any) {
    console.log(req.headers.authorisation);
    if(!req.headers.authorisation) {
        return res.status(HTTP_UNAUTHORISED_REQUEST).send('Unauthorised request: No authorisation')
    }
    let token = req.headers.authorisation;
    console.log('token in api', token);
    if(token === null) {
        return res.status(HTTP_UNAUTHORISED_REQUEST).send('Unauthorised request: token is null')
    }

    let payload = jwt.verify(token, '12345')
    console.log('payload created', payload);
    if(!payload) {
        return res.status(HTTP_UNAUTHORISED_REQUEST).send("Unauthorised request: Secret key doesn't match")
    }
    req.userId = payload.sub
    next();
}

export default router;
