import { connectDB, disconnectDB } from './database';
import { createUser } from './crud'

const main = async () => {
    try {
        // Step 1: Connect to the database
        await connectDB();

        
        // Step 2: Add a new user
        const mainWalletAddress = "0x12345abcd12345abcd12345abcd12345abcd";
        const userCreated = await createUser(mainWalletAddress);

        if (userCreated) {
            console.log(`User with wallet address ${mainWalletAddress} added successfully.`);
        } else {
            console.log(`User with wallet address ${mainWalletAddress} already exists.`);
        }
    } catch (error) {
        const err = error as Error
        console.error("An error occurred:", err.message || error);
    } finally {
        // Step 3: Disconnect from the database
        await disconnectDB();
        console.log("Disconnected from MongoDB");
    }
};

main();
