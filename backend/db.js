import mongoose from "mongoose";
import zod  from "zod";

// docker run --name fa63a988cdbd -d -p 27017:27017 mongo

mongoose.connect("mongodb://localhost:27017/paytm")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minLength: 3,
            maxLength: 30,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: String,
            minLength: 3,
            maxLength: 30,
            trim:true
        },
        firstName: {
            type: String,
            required: true,
            maxLength: 30,
            trim:true
        },
        lastName: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        }
        
    }
)

const accountSchema = new mongoose.Schema(
    {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        balance: {
            type: Number,
            required: true
        }
    }
)
const User = mongoose.model('users', userSchema);
const Account = mongoose.model('account', accountSchema)


export  {User, Account};
