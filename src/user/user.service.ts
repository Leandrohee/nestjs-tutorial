/* ---------------------- SERVICES ARE RESPONSABLES FOR THE BUSINESS LOGIC ---------------------- */

import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from "./dto";
import { Request } from "express";

@Injectable()
export class UserService{
    constructor(private prisma: PrismaService){}                                    //I use the prisma service without the need to import locally. @Global it works

    /* ---------------------------- RETURNING THE USER BASED ON THE EMAIL --------------------------- */
    async getUser(dto: UserDto){
        try{
            const userToVerify = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            });
            if (!userToVerify) throw new Error('Email do not register');
    
            delete userToVerify.hash                                                //Removing the hash from the object
            return userToVerify;
        } catch (error){
            throw new ForbiddenException(error.message)
        }
    }
    
    //Returning the information about the jwt token
    getJwt(req: Request){
        const tokenDetails = req.user
        let findToken = req.rawHeaders.find((item: string) => item.includes('Bearer'))      //Get The Bearer string
        findToken = findToken.split(" ")[1]                                                 //Isolate the token from the string

        return {
            token: findToken,
            tokenDetails: tokenDetails
        }
    }
}