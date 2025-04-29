const mongoose = require("mongoose")
const initData = require("./data.js")
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() =>{
    console.log("connected to DB");
}).catch((err) =>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async() =>{
    await Listing.deleteMany({})   // If the data is available in database first we remove that data.
    initData.data = initData.data.map((obj) => ({...obj, owner : '67d8190dfefda21d898c68b5'}))   //map function create a new array, map can't change in old an array
    await Listing.insertMany(initData.data);   // adding the data 
    console.log("data was initialized")
}

initDB();