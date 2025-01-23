/* ---------- THIS GUARD IS RESPONSIBLE TO VERIFY IF A ROLES ARE REQUIRED FROM A ROUTE ---------- */

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        //Getting the roles requireds inside the custom decorator "@Roles"
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log(requiredRoles)
        if (!requiredRoles) {
            return true;                                                    // If no roles are required, grant access
        }

        //Getting the payload from the JwtStrategy
        const { user } = context.switchToHttp().getRequest();               // The validated payload from JwtStrategy

        //Returning true if the role need is found in the roles of the user
        const haveRole: boolean = requiredRoles.some(role => user.roles?.includes(role));
        return haveRole;
    }
}