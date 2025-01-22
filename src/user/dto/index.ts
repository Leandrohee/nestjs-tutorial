/* ------------------------------- TYPING THE DATA TRANSFER OBJECT ------------------------------ */

import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto{
    @IsEmail()
    @IsNotEmpty()
    email: string
}