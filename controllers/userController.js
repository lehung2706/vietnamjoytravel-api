import UserModel from "../models/userModel.js";
import mongoose from 'mongoose'

export const login = async (req, res) =>  {
    try {
        const { username, password } = req.body;
        const postMessage = await UserModel.findOne({username,password});
        if(!postMessage) return res.status(404).json({message:'Username or password is incorrect'});
        res.status(200).json({message:'Success'});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}