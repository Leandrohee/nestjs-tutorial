/* ----- THIS FILE IS RESPONSIBLE FOR VERIFYING THE AUTHENTICITY OF THE TOKEN IN THE HEADERS ----- */
/* --------------------------- IT WORKS WITH GUARDS TO PROTECT ROUTES --------------------------- */

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt"){      //"jwt" is the name that goes in the guard
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    //Validating and returning the payload in every res router
    async validate(payload: any): Promise<any>{
        //Returning the payload
        return {
            sub: payload.sub,
            email : payload.email,
            iat: new Date(Number(payload.iat) * 1000).toLocaleTimeString(),              //transforming the Unix timestamp to a time in my local time
            exp: new Date(Number(payload.exp) * 1000).toLocaleTimeString()               //transforming the Unix timestamp to a time in my local time
        };
    }
}

/* ----------------------------------------- INFORMATION ---------------------------------------- */
/*
    //Returning the information about the jwt token
    
    @UseGuards(AuthGuard('jwt')) 
    //route /user/getjwt
    @Get('getjwt')
    getJwt(@Req() req: any){
        const tokenDetails = req.user
        let findToken = req.rawHeaders.find((item: string) => item.includes('Bearer'))      //Get The Bearer string
        findToken = findToken.split(" ")[1]                                                 //Isolate the token from the string

        return {
            token: findToken,
            tokenDetails: tokenDetails
        }
    }


*/