import express, { Response, Request } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import  verifyController  from "./controllers/sui-brige/verifyController";
import verifyValidator from "./middleware/verifyValidator";
import mongoose from 'mongoose';
import naria2usdController from './controllers/sui-brige/naria2usdController';
import createCardValidator from './middleware/createCardValidator';
import createCardController from './controllers/sui_pay/suiPayController';
import mockPaymentValidator from './middleware/mockPaymentValidator';
import mockPaymentControllers from './controllers/sui-brige/mockPaymentController';
import decryptKeyValidator from './middleware/decryptKeyValidator';
import decryptKeyController from './controllers/sui_pay/decryptKeyController';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const db = process.env.DATABASE_URLj || 'mongodb://localhost/transaction'

// mongoose.connect(db)


app.get('/', naria2usdController)

app.post('/verify', verifyValidator, verifyController)

app.post('/sui-pay/createCard', createCardValidator, createCardController)

app.post('/sui-pay/buyAmount', mockPaymentValidator, mockPaymentControllers)

app.post('/sui-pay/decryptKeyphrase', decryptKeyValidator, decryptKeyController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
