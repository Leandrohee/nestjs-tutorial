import { Injectable } from "@nestjs/common";

@Injectable({})
export class AppService{
    
    //Function that welcomes you to the server
    sayWelcome(){
        return (
            `
                <h1 style="text-align: center; margin-top: 50vh;"}>
                WELCOME LEANDRO TO THE API SERVER
                </h1>
            `
        )
    }
}