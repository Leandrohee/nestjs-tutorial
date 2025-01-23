/* -------------------------------- DECORATOR TO ESPECIFIE A ROLE ------------------------------- */

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
