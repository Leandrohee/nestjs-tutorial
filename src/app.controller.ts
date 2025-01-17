import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('')
export class AppController{
    constructor(private appService: AppService){}

    //Main route: http://localhost:3333
    @Get('')
    homePage(){
        return this.appService.sayWelcome()
    }
}