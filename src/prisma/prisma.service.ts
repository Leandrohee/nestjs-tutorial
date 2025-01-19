/* --------------- FILE RESNPONSABLE FROM PROVIDING DB CONNECTION TO THE WHOLE APP -------------- */

import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(){
        super({
            datasources:{
                db: {
                    url: process.env.DATABASE_URL
                }
            }
        })
    }
}