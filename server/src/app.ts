import express,{  Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from './routes/index';

const app = express();
const PORT = 5000;

const {
    MONGODB_ATLAS_USERNAME,
    MONGODB_ATLAS_PASSWORD,
    MONGODB_ATLAS_DBNAME,
} = process.env;

const uri = `mongodb+srv://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@cluster0.w8hffua.mongodb.net/${MONGODB_ATLAS_DBNAME}?retryWrites=true&w=majority`;
// const uri = "mongodb+srv://mnurhuda08:<password>@cluster0.w8hffua.mongodb.net/?retryWrites=true&w=majority";
const option = {useNewUrlParser: true,useUnifiedTopology: true}

app.use(cors());

app.use(router)

mongoose.set('useFindAndModify',true);
mongoose.connect(uri,option)
    .then(()=>{
        app.listen(PORT,()=>{
            console.info(`listening at http://localhost:${PORT}`);
        });
    })
    .catch((error)=>{
        throw error;
    })