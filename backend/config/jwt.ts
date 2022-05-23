import jwt, {JwtPayload} from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import dotenv from './dotenv';

import { UserDocument } from '../models/userModel';

import Message from '../lang/en';


export const generateToken = (user: UserDocument, callBack: (error: Error | null, token:string | null)=> void): void => {
        jwt.sign({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            isSeller:user.isSeller,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt
        },
        dotenv.JWT_SECRET,
        {
            "expiresIn":'30d'
        },
        (error, token) => {
            if(error){
                callBack(error, null)
            }else if(token){
                callBack(null, token)
            }
        })
}
export const isAuth = (req: Request,res: Response,next:NextFunction) => {
    const authorization: string | undefined = req.headers.authorization ? req.headers.authorization : "";
    if(authorization){

        const token = authorization.slice(7,authorization.length); //Bearer xxx
        jwt.verify(
            token,
            dotenv.JWT_SECRET,
            (error,decode) => {
                if(error){
                 return  res.status(401).send({message:Message.VALIDATE_TOKEN_NOT_MATCH})
                }
                res.locals.jwt = decode;
                next();  
                
            }
        );
    }else{
       return res.status(401).send({message:Message.VALIDATE_TOKEN_EMPTY});
    }

    
}