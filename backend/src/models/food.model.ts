import { Schema , model } from "mongoose";

export interface Food{
    id:string;
    name:string;
    price:number;
    tags:string[]; 
    favorite:boolean;
    stars:number;
    imageUrl:string;
    origins:string[];
    cookTime:string;
}
// type in mongodb write in uppercase but inside typescript with lowercase.
// for the id available in interface; we need to use the virtual:virtuals are kind of values that will not be saved on the   database they will be generated based on the value inside the database.
// by default if we set the virtual to true then mongoose will set the id as underline id _id.


// CREATING FOOD SCHEMA:SCHEMA ARE VALIDATION ON DB FIELDS, DB FIELDS ARE DEFINED IN SCHEMA
export const FoodSchema=new Schema<Food>(
    {
        name:{type:String,required:true},
        price:{type:Number,required:true},
        tags:{type:[String]},
        favorite:{type:Boolean,default:false},
        stars:{type:Number,required:true},
        imageUrl:{type:String,required:true},
        origins:{type:[String],required:true},
        cookTime:{type:String,required:true},
    },
    {
        toJSON:{ //send value to db
            virtuals:true
        },
        toObject:{ //get values from db
            virtuals:true
        },
        timestamps:true //set timestamps automatically in db.
    }
);


// IF WE HAVE FOOD SCHEMA NOW THIRD STEP IS CREATE MODEL:MODEL ARE CONNECTS NODEJS WITH MONGODB. 
// MODELS USE THE SCHEMA TO NODE JS WITH MONGODB.
// THROUGH FOODMODEL WE CAN CRUD OPERATION

// export const FoodModel=model<Food>('tableName',FoodSchema);
export const FoodModel=model<Food>('food',FoodSchema);