/* ---------------------- SERVICES ARE RESPONSABLES FOR THE BUSINESS LOGIC ---------------------- */


import { Injectable } from "@nestjs/common";
import { SignupDto } from "./dto";

@Injectable({})
export class AuthService {

    //Business logic that return an json
    signup(dto: SignupDto){
        return ({msg: `I have signup with the email: ${dto.email}`})
    }

    //Business logic that return an json
    signin(){
        return{msg: "I have signin!"}
    }
}


/* ----------------------------------------- INFORMATION ---------------------------------------- */
/*
The services are responsable for the business logic of the project.

*/