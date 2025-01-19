/* ------------------- THIS FILE IS THE MODULE RESPONSIBLE FOR AUTHENTICATIONS ------------------ */

import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],            //Importing prisma module to use in the auth module
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule{}


