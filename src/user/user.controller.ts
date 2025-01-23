/* --------------------- THE CONTROLER IS RESPONSABLE ONLY HANDLE THE ROUTES -------------------- */

import { Body, Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { RolesGuard } from "src/auth/guard/RolesGuard";
import { Roles } from "src/decorators/Roles";

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

    //route /user/admin -> This route is to test if the roles guards and decorators are working
    @UseGuards(RolesGuard)
    @Roles('admin',)
    @Get('admin')
    onlyAdmin(){
        return 'Only admin can acess this message'
    }

    //route /user/superUser -> This route is to test if the roles guards and decorators are working
    @UseGuards(RolesGuard)
    @Roles('superUser',)
    @Get('superUser')
    onlySuperUser(){
        return 'Only super users can acess this message'
    }

    //route /user/user -> This route is to test if the roles guards and decorators are working
    @UseGuards(RolesGuard)
    @Roles('user',)
    @Get('user')
    onlyUser(){
        return 'Only user can acess this message'
    }
}