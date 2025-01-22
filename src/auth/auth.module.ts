/* ------------------- THIS FILE IS THE MODULE RESPONSIBLE FOR AUTHENTICATIONS ------------------ */

import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";

@Module({
    imports: [PrismaModule, JwtModule.register({})],            //Importing prisma module and JWt to use in the auth module
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule{}
