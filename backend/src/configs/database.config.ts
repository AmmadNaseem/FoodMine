import {connect, ConnectOptions} from 'mongoose';

export const dbConnect=()=>{
    connect(process.env.MONGO_URL!,{ //! THAT THE COMPILER THIS VALUE WILL ALWAYS THE AVAILABLE. NOT BE EMPTY.
         useNewUrlParser:true,
         useUnifiedTopology:true
    } as ConnectOptions).then(
            ()=>console.log("connect successfully"),
            (error)=>console.log(error)      
        );
}