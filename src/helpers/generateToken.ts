// import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
// const generateToken = (
//     payload: any,
//     secret: string,
//     expiresIn: any
//   ) => {
//     const time:SignOptions ={ expiresIn }
//     const token = jwt.sign(payload, secret, time);
//     return token;
//   };
  

// const verifyToken =(payload:any , secret:string)=>{
//     let token;
//     console.log('vft',payload,secret)
//     console.log('vft',token)
//     try {
//         token =jwt.verify(payload,secret, ) as JwtPayload;
//     } catch (error) {
//         throw new Error('you are not authorized!')
//     }
//     console.log(token)
//     return token;
// }
// export const jwtHelpers ={
//     generateToken,
//     verifyToken
// } 

import apiError from '../errors/apiError';

import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';


export const generateToken = (
  payload: string | object,
  secret: Secret,
  expiresIn: string | number
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions['expiresIn'], 
  };
  return jwt.sign(payload, secret, options);
};





export const verifyToken = (
    token: string,
    secret: string
  ): JwtPayload  => {
    try {
      return jwt.verify(token, secret) as JwtPayload;
    } catch (error: any) {
      throw new apiError(401, ' token You are not authorized!');
    }
  };
  
export const jwtHelpers = {
  generateToken,
  verifyToken
};
