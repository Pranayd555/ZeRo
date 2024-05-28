import {Router} from 'express';
import { sample_fruits } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST, HTTP_UNAUTHORISED_REQUEST } from '../constants/https_status';
import { Fruit, FruitModel } from '../models/fruits.model';


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
            let updatedF = mapToFruitModel(fruits);
            res.status(200).send(updatedF);
            return;
        }
        res.status(500).send("No fruit is availale in the collection")
}));

router.put("/update",verifyToken, asyncHandler(
    async (req, res) => {
        const {name} = req.body;
        let fruit: Fruit | null;
        let updatedFruit: null | any;
        fruit = await FruitModel.findOne({name});
        if(fruit) {
            updatedFruit = await FruitModel.replaceOne({name: name}, req.body);
            const fruits = await FruitModel.find();
            let updatedF = mapToFruitModel(fruits);
            res.send(updatedF);
                } else {
            res.status(500).send('error has occurred while uploading the file');
        }
    }
));

router.post("/add", verifyToken, asyncHandler(
    async(req,res) => {
        const {name} = req.body;
        let fruit: Fruit | null;
        let addedFruit: any | null;
        fruit = await FruitModel.findOne({name})
        if(fruit) {
            res.status(500).send('the fruit already exists in database')
        } else {
            addedFruit = await FruitModel.insertMany([req.body])
            const fruits = await FruitModel.find();
            let updatedF = mapToFruitModel(fruits);
            res.send(updatedF);
        }
    }
))

router.post("/delete", verifyToken, asyncHandler(
    async(req,res) => {
        const {name} = req.body;
        let fruit: Fruit | null;
        let addedFruit: any | null;
        fruit = await FruitModel.findOne({name})
        if(fruit) {            
            addedFruit = await FruitModel.deleteOne({name})
            if (addedFruit.deletedCount === 1) {
                const fruits = await FruitModel.find();
                let updatedF = mapToFruitModel(fruits);
                res.send(updatedF);
              } else {
                res.status(500).send("No documents matched the query. Deleted 0 documents.");
              }
        } else {
            res.status(500).send('error deleting fruit')
        }
    }
))

function verifyToken(req:any, res:any, next: any) {
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

function mapToFruitModel(fruits: Fruit[]) {
    let updatedF = fruits.map( fruit => {
        return {
            name: fruit.name,
            id: fruit.id,
            discount: fruit.discount,
            about: fruit.about ? fruit.about : "",
            quantity: fruit.quantity ? fruit.quantity : "",
            price: fruit.price,
            availability: fruit.availability ? fruit.availability : true
        }
    })
    return updatedF;
}

export default router;
