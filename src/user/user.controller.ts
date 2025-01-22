/* --------------------- THE CONTROLER IS RESPONSABLE ONLY HANDLE THE ROUTES -------------------- */

import { Body, Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@UseGuards(AuthGuard('jwt'))                 //The guards can be use in the whole controller as well
@Controller('user')
export class UserController{
    constructor(private userService: UserService){}
    
    //route /user/getme
    // @UseGuards(AuthGuard('jwt'))                //Protect the route using the strategy. The "jwt" is set in the strategy
    @Get('getme')
    getUser(@Body() dto: UserDto, @Req() req: Request){
        return this.userService.getUser(dto)
    }
    
    //route /user/getjwt
    @Get('getjwt')
    getJwt(@Req() req: Request){
        return this.userService.getJwt(req)
    }
}