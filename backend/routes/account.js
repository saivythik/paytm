import express from 'express';
import {Account} from '../db.js'
import { authMiddleware } from '../middleware.js';
import mongoose from 'mongoose';


const account_router = express.Router();

account_router.get('/balance',authMiddleware, async(req, res)=>{
    const user = await Account.findOne({
        userId: req.userId
    })
    const balance = user.balance;
    res.status(200).json({
        balance: balance
    })

})

account_router.post('/transfer',authMiddleware, async(req, res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount, to} = req.body;
    const user = await Account.findOne({userId: req.userId}).session(session);
    if(!user || user.balance < amount) {
        await session.abortTransaction();

        res.status(400).json({
            message: "Insufficient balance"
        })
        
    }
    const to_user = await Account.findOne({userId: to}).session(session);
    if(!to_user) {
        await session.abortTransaction();

        return res.status(400).json({
            message: "Invalid account"
        })
        
    }
    await Account.updateOne({userId: req.userId}, {
        $inc : {balance: -amount}
    }).session(session);
    await Account.updateOne({userId: to}, {
        $inc : {balance: amount}
    }).session(session);
    
    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer successful"
    })
    
   
})

export  {account_router};