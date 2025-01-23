/* ---------------------- SERVICES ARE RESPONSABLES FOR THE BUSINESS LOGIC ---------------------- */

import { ForbiddenException, Injectable } from "@nestjs/common";
import { SigninDto, SignupDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,                                              //Recieving prisma services
        private jwt: JwtService                                                     //Recieving jwt services 
    ){}                                    

    /* ------------- CREATING A USER IN THE DATABASE WITH THE ROUTE  /auth/signup (post) ------------ */
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

            //Adding a role to the user
            await this.prisma.roles_Users.create({
                data:{
                    id_user: user.id_user,
                    id_role: 1                                                      //Role 1 means user
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
 
    /* ------------------------ SIGNIN USING CREDENTIALS (EMAIL AND PASSWORD) ----------------------- */
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

            //Getting the roles of this user by name. Necessary a join betwen roles and roles_users
            let getRoles:Array<any> = await this.prisma.roles_Users.findMany({
                where:{
                    id_user: userToVerify.id_user
                },
                include:{
                    role: true                          //Allow the join betwenn the tables roles_Users and roles
                }
            })

            //Filtering only the names of the roles
            getRoles = getRoles.map(item => (item.role.roleName))

            //Generate a token if password match
            return this.genToken(
                userToVerify.id_user,
                userToVerify.email,
                getRoles
            )

        } catch (error) {
            throw new ForbiddenException(error.message)                             //ForbiddenException is a NestJs error
        }
    }

    /* -------------------------------------- GENERATING A JWT -------------------------------------- */
    async genToken(userId:number ,email: string ,getRoles: Array<string>): Promise<{access_token: string}> {
        const payload = {
            sub: userId,                                                            //sub is a convention name in Jwt for a unique value, in this case the user id
            email: email,
            getRoles: getRoles
        };

        try{
            //Loading the jwt secret from the env
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) throw new Error("Secret not found!");
    
            //Generating and storing the jwt token
            const token = await this.jwt.signAsync(payload, {secret: jwtSecret, expiresIn: '1h'})   
            return { access_token: token};

        } catch (error){
            throw new ForbiddenException(error.message);
        }
    }

}



/* ----------------------------------------- INFORMATION ---------------------------------------- */
/*
The services are responsable for the business logic of the project.

*/