/* --------------------- THE CONTROLER IS RESPONSABLE ONLY HANDLE THE ROUTES -------------------- */

import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    //route: /auth/signup
    @Post('signup')
    signup(@Body() dto: SignupDto){
        return this.authService.signup(dto)
    };

    //route: auth/signin
    @Post('signin')
    signin(){
        return this.authService.signin()
    }
}


/* ---------------------------------------- INFORMATIONS ---------------------------------------- */
/*
Controllers are use to handle routes in NestJs





*/