/* ---------------------- SERVICES ARE RESPONSABLES FOR THE BUSINESS LOGIC ---------------------- */

import { ForbiddenException, Injectable } from "@nestjs/common";
import { SigninDto, SignupDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}                                    //Recieving prisma services

    //Creating a user in the database with the route /auth/signup (post)
    async signup(dto: SignupDto){
        try{
            //Generating a hash based in the password provided
            const salt = await bcrypt.genSalt(5)                                    //generating a salt to increase password security
            const hash = await bcrypt.hash(dto.password,salt)                       //generating a hash with salt

            //Saving the data recieved in the DB
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash
                }
            })
    
            //Return a successfully msg 
            return {msg: `The user ${user.email} has been created`}

        } catch (error){
            //If the error is a prisma related error, in this case duplicated key (email)
            if (error  instanceof PrismaClientKnownRequestError){
                if (error.code === 'P2002'){                                        //This code is for duplicated keys that are now allow in the DB (from prisma)
                    throw new ForbiddenException('Credentials taken')               //ForbiddenException is a NestJs error
                }
            }
            //If the error is not from prisma just show the error
            throw error;
        }
    }   
 
    //Sign in with credentials 
    async signin(dto: SigninDto){
        try{
            //Verifing if the user exists
            const userToVerify = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            })
            if (!userToVerify) throw new Error('Email do not register');

            //Verifing the password
            const isPasswordValid = await bcrypt.compare(dto.password,userToVerify.hash);
            if (!isPasswordValid) throw new Error('Password incorrect');

            //Return successfully
            return {msg: `User ${userToVerify.email} logged in!`}
        } catch (error) {
            throw new ForbiddenException(error.message)                             //ForbiddenException is a NestJs error
        }
    }
}


/* ----------------------------------------- INFORMATION ---------------------------------------- */
/*
The services are responsable for the business logic of the project.

*/