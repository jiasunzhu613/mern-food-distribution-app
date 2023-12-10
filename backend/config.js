import './loadEnv.js';

export const PORT = process.env.PORT;
//TODO: prolly need to edit or gitignore this file so that info isnt leaked
export const mongoDBURL = process.env.MONGO_URI;