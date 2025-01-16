import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {

    //Business logic that return an json
    signup(){
        return {msg: "I have signup!"}
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