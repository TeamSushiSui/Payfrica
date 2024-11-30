import mongoose from 'mongoose';
import { Cards } from './schema';

export const checkUserExists = async (MainWalletAdress: string) => {
    try {
        return await Cards.findOne({ MainWalletAdress });
    } catch (error) {
        const err = error as Error
        console.error('Error checking user existence:', err.message || error);
        throw error;
    }
};

export const createUser = async (MainWalletAdress: string) => {
    try {
        const userExists = await checkUserExists(MainWalletAdress);
        console.log(userExists)
        if (userExists) {
            return false; // User already exists
        }

        const newUser = new Cards({ MainWalletAdress });
        await newUser.save();
        return true;
    } catch (error) {
        const err = error as Error
        console.error('Error creating new user:', err.message || err);
        throw error;
    }
};

export const setNewCard = async (
    MainWalletAdress: string,
    cardWalletAdress: string,
    pvKey: string
) => {
    try {
        const user = await Cards.findOne({ MainWalletAdress });
        if (user) {
            user.card = {
                cardWalletAdress,
                pvKey,
                trials: 5,
                trials_left: 0,
                blocked: false,
            };
            await user.save();
            return true;
        }
        return false; // User not found
    } catch (error) {
        const err = error as Error
        console.error('Error setting new card details:', err.message || error);
        throw error;
    }
};

export const getCardDetails = async (MainWalletAdress: string) => {
    try {
        const user = await Cards.findOne({ MainWalletAdress });
        return user ? user.card : null;
    } catch (error) {
        const err = error as Error
        console.error('Error fetching card details:', err.message || error);
        return null;
    }
};

export const updateTrials = async (MainWalletAdress: string) => {
    try{
        const user = await Cards.findOne({ MainWalletAdress });
        if (user && user.card){
            user.card.trials_left = (user.card.trials_left || 0) + 1;
            await user.save();
            if (user.card.trials_left >= user.card.trials){
                user.card.blocked = true;
                await user.save();
            }
        }
    } catch (error) {
        const err = error as Error
        console.error('Error updating trials:', err.message || error);
        throw error;
    }
}

export const checkCardBlocked = async (MainWalletAdress: string) => {
    try{
        const user = await Cards.findOne({ MainWalletAdress });
        if (user && user.card){
            return user.card.blocked;
        }
        return false;
    } catch (error) {
        const err = error as Error
        console.error('Error updating trials:', err.message || error);
        throw error;
    }
}