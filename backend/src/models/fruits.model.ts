import {Schema, model} from 'mongoose'

export interface Fruit {
    id: string;
    name: string;
    price: string;
    quantity: string;
    discount: string;
    availability: boolean;
    about: string;
}

export const FruitSchema = new Schema<Fruit>({
    name: {type: String, required: true},
    price: {type: String, required: true},
    quantity: {type: String, required: true},
    availability: {type: Boolean},
    discount: {type: String},
    about: { type: String}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});


export const FruitModel = model<Fruit>('fruit', FruitSchema)