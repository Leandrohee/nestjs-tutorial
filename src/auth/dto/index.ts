/* ------------------ THIS FILE IS RESPONSIBLE FOR TYPING THE RETURN OF THE API ----------------- */
/* ---------------------------- DTO STANDS FOR 'DATA TRANSFER OBJECT' --------------------------- */

import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

//Return of the post route /auth/signout
export class SignupDto{                     //Using class instead of interface so we can use decorators
    @IsEmail()                              //Make sure the email is an email and not empty
    @IsNotEmpty()
    email: string;

    @IsString()                             //Make sure the password is a string and not empty
    @IsNotEmpty()
    password: string;

    firstName?: string;                     //Optional values
    lastName?: string;                      //Optional values
}

//Return of the post route /auth/signin
export class SigninDto{
    @IsEmail()                              //Make sure the email is an email and not empty
    @IsNotEmpty()
    email: string;

    @IsString()                             //Make sure the password is a string and not empty
    @IsNotEmpty()
    password: string;
}

