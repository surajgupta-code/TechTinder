import mongoose from 'mongoose';
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://TechTinder:TechTinder%40123@cluster0.r3e9c.mongodb.net/'); };


   

    