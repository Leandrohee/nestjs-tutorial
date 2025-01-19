/* ---------------------- SERVICES ARE RESPONSABLES FOR THE BUSINESS LOGIC ---------------------- */

import { Injectable } from "@nestjs/common";
import { SignupDto } from "./dto";
import bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}

    //Creating a user in the database with the route /auth/signup (post)
    async signup(dto: SignupDto){
        //Generating a hash based in the password provided
        const salt = await bcrypt.genSalt(5)                                    //generating a salt to increase password security
        const hash = await bcrypt.hash(dto.password,salt)                       //generating a hash with salt

        /*The verification if the user exists is made in the models from prisma*/

        //Saving the data recieved in the DB
        // const user = await this.prisma.user.create({})
        // const user = await this.prismaService.user({})

    }   
 
    //Sign in with credentials 
    signin(){
        return{msg: "I have signin!"}
    }
}


/* ----------------------------------------- INFORMATION ---------------------------------------- */
/*
The services are responsable for the business logic of the project.

*/