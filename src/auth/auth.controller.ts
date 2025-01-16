import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    //route: /auth/signup
    @Post('signup')
    signup(){
        return this.authService.signup()
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