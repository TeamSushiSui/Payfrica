import { Response, Request} from 'express';
import { usdToNgnRate } from '../../../ulits/get_price';

const naria2usdController = async (req: Request, res: Response) => {
   const rate = await usdToNgnRate();
    if (!rate) {
        res.status(500).json({message: 'Could not get current rate'});
        return;
    }

   res.json({usd: rate})
}

export default naria2usdController;