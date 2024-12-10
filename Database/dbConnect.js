//importer mongoose
import mongoose from "mongoose";

export const dbConnect = () =>{
    mongoose.connect(process.env.URI_MONGO,
        { DBNAME: process.env.DATABASE_NAME }
     ).then(() => console.log("Database Connected"))
     .catch((err) => console.log(err)
     )
}

