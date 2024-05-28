import { createReducer, on } from "@ngrx/store";
import { Fruit } from "src/app/shared/models/fruit";
import * as FruitsActions from "../actions/fruits.action";

export interface FruitState {
    fruits: ReadonlyArray<Fruit>;
}

const initialState: ReadonlyArray<Fruit> = [];

export const fruitReducer = createReducer(
    initialState,
    on(FruitsActions.getFruitsSuccess, (state, fruits) => fruits),
    on(FruitsActions.addFruitsSuccess, (state, fruits) => {
        return {...state, ...fruits}
    }),
    on(FruitsActions.updateFruitsSuccess, (state, fruits) => {
        return {...state, ...fruits}
    }),
    on(FruitsActions.deleteFruitsSuccess, (state, fruits) => {
        return fruits
    })
);

const mockFruits: Fruit[] = [
    {
        "id": "66278cf1548306eb2b909760",
        "name": "Apple",
        "price": "60",
        "quantity": "3",
        "availability": true,
        "discount": "10%",
        "about": "gddfgdfgfdggdfgdfg",
    },
    {
        "id": "66278cf1548306eb2b909762",
        "name": "Lichi",
        "price": "80",
        "quantity": "20",
        "availability": true,
        "discount": "15%",
        "about": ""
    },
    {
        "id": "66324ebbccb00580f0ae2fcb",
        "name": "cherry",
        "price": "5",
        "quantity": "20",
        "discount": "10%",
        "about": "fg",
        "availability": true
    },
    {
        "id": "6632513eccb00580f0ae2fda",
        "name": "pineapple",
        "price": "20",
        "quantity": "1",
        "discount": "5%",
        "about": "dkfd",
        "availability": true
    }
]