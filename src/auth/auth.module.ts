/* ------------------- THIS FILE IS THE MODULE RESPONSIBLE FOR AUTHENTICATIONS ------------------ */

import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule{}


