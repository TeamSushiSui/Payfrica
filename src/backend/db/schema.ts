import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    MainWalletAdress: { type: String, required: true, unique: true },
    card: {
        cardWalletAdress: { type: String, required: false },
        pvKey: { type: String, required: false },
        trials: { type: Number, default: 3 },
        trials_left: { type: Number, default: 0 },
        blocked: { type: Boolean, default: false },
    },
});

export const Cards = mongoose.model('pay', cardSchema);
