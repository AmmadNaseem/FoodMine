import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

// this is just a function with request,response and next();
export default (req: any, res: any, next: any) => {

    const token = req.headers.access_token as string;//THIS IS GET TOKEN FROM HEADER.

    if(!token) return res.status(HTTP_UNAUTHORIZED).send();//IF TOKEN DOES NOT HAVE ANY VALUE THEN RETURN STATUS-UNAUTHORIZED:401

    try {
        const decodedUser = verify(token, process.env.JWT_SECRET!);//! =>EXCLAMATION MARKS SHOW I WILL NOT UNDEFINED. 
        req.user = decodedUser;

    } catch (error) {
        res.status(HTTP_UNAUTHORIZED).send();
    }

    return next(); //MIDDLEWARE INSIDE THE PIPELINE.
}