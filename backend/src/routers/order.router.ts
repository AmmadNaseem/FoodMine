import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderStatus } from '../constants/order_status';
import { OrderModel } from '../models/order.model';
import auth from '../middlewares/auth.mid';

const router = Router();
router.use(auth);

router.post('/create',asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;

    if(requestOrder.items.length <= 0){//IF THERE IS NO ORDER.
        res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
        return;
    }

    // IF WE HAVE ALREADY AN ORDER OF CURRENT USER THEN WE DELETE IT WITH THE STATUS OF NEW.
    await OrderModel.deleteOne({
        user: req.user.id, //THIS USER_ID COMES FROM MIDDLEWARE;IT CHECKS THE TOKEN OF THE USER IF VERIFIED THEN SET INSIDE THE REQ.USER.ID
        status: OrderStatus.NEW
    });

    // AFTER DELETING THE PREVIOUS ORDER WE ARE CREATING THE ANOTHER ORDER FOR THE USER.
    const newOrder = new OrderModel({...requestOrder,user: req.user.id}); 
    //SPREAD OPERATOR(...)IT PUT THE ARRAY VALUES INTO ANOTHER ARRAY:E.G.
    //  USER={id:1,name:'test'} and newUser={...USER,address:'abc'};
    //  NOW THE NEW USER WILL BE newUser={id:1,name:'test',address:'abc'}
    await newOrder.save();
    res.send(newOrder);
 }

));


router.get('/newOrderForCurrentUser', asyncHandler( async (req:any,res ) => {
    const order= await getNewOrderForCurrentUser(req);

    if(order) res.send(order);//IF ORDER IS AVAILABLE SEND RESPONSE TO FRONTEND SIDE

    else res.status(HTTP_BAD_REQUEST).send();
}));


router.post('/pay', asyncHandler( async (req:any, res) => {
    const {paymentId} = req.body;//THIS GET AUTOMATICALLY PAYMENT ID IN THIS VARIABLE LIKE req.body.paymentid

    const order = await getNewOrderForCurrentUser(req);

    if(!order){
        res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
}));


router.get('/track/:id', asyncHandler( async (req, res) => {
    
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
}
));

export default router;

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}