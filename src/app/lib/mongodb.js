import mongoose from "mongoose"
export const ConnectMongoDB=async()=>{
    try{
        mongoose.connect("mongodb+srv://certify:WCYw42K8RKbAuwsJ@cluster0.iedzip4.mongodb.net/")
        console.log("connected to mongoDb")
    }
    catch(error){
        console.log("error to connecting",error)
    }
}     