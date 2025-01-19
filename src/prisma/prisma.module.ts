/* --------------- FILE RESNPONSABLE FROM PROVIDING DB CONNECTION TO THE WHOLE APP -------------- */

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()                           //Exporting PrismaServices globally
@Module({
    providers: [PrismaService],
    exports: [PrismaService]        
})
export class PrismaModule {}
