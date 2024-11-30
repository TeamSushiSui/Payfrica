import mongoose, { Mongoose, Schema } from "mongoose";


const schema = mongoose.Schema

const Transaction = new Schema({
    transactionId: String,
    userAddress: String,
    amountPaid: String,
    amountSent: String,
    datePosted: {
        type: Date,
        default: new Date()
    }
})
const UserTransaction = mongoose.model('userTransaction', Transaction)
export default UserTransaction;