# Installing nestJs

Use the documentation website: https://docs.nestjs.com/first-steps

## Cleaning the main folder

Delete this files, because you will not need them in the begining
- app.controller.spect.ts
- app.controller.ts
- app.service.ts

## Modules information

Models are used to connect functionalities of the project in small pieces
The basic structure of a model in NestJs is this:

```javascript
import { Module } from "@nestjs/common";

@Module({})
export class AppModule{}
```

You can also generate modules automaticly with the command:

```bash
nest g module nameofthemodule
```

## Controllers information

Controllers are use to handle routes in NestJs

```javascript
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  //route: /auth/signup
  @Post('signup')
  signup(){
    return this.authService.signup();
  };

  //route: auth/sigin
  @Post('signin')
  signin(){
    return this.authService.signin();
  }
}
```

## Services|Providers information

The services are responsable for the business logic of the project.

```javascript
@Injectable({})
export class AuthService {

  //Business logic that return an json
  signup(){
    return {msg: "I have signup!"}
  }

  //Business logic that return an json
  signip(){
    return{msg: "I have signin!"}
  }
}
```

## Testing the api

I'm using insomnia to test the api

## Installing and using prisma as the main ORM

```bash
yarn add prisma -D
yarn add @prisma/client
```

Run the cli to initiate prima in your project.
This create a prima folder in the project root and create some enviroments variabels

```bash
npx prisma init
```

Add the extension "prisma" to the project to better visualization of the code in schema.prisma

Set up the DATABASE_URL variable to enable prisma to connect to the database:
DATABASE_URL="postgresql://pg_user:pg_password@localhost:pg_port/pg_database?schema=public"

To create models do this:

```bash
npx prisma --help              //To see all the comands
npx prisma migrate dev         //To generate the migration
npx prisma migrate deploy      //To apply existent migrations 
npx prisma generate            //To crete typescript types for the models
```

## Providing prisma tools to all the project

To providing prisma tools and methos we need to create a prisma model and allow acess to the whole app.

1. Create the module folder with cli or manually

```bash
nest g module prisma
```

2. Set up **prisma.module.ts**

```typescript
@Module({
  providers: [PrismaService]
})
export class PrismaModule {}
```

3. Create and set up **prisma.service.ts**

```typescript
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
```

4. Exporting prisma module just **LOCALLY**

```typescript
@Module({
    providers: [PrismaService],
    exports: [PrismaService]        //Exporting PrismaServices locally
})
export class PrismaModule {}
```

5. Exporting prisma module **GLOBALLY**

```typescript
@Global()                           //Exporting PrismaServices globally
@Module({
    providers: [PrismaService],
    exports: [PrismaService]        
})
export class PrismaModule {}
```

**app.module.ts**
```typescript
@Module({
  imports: [AuthModule, PrismaModule],        //PrismaModule was to be in here to be broadcast globally
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Working with response from the post methods in rest API

To work with post methods in rest API with Nest we have to learn 3 topics:
- Dto             -> Data Transfer Objects
- Pipes           -> It converrt the return if needed
- Class-validator -> Verifies the return of the object

To learn more about pipes:
https://docs.nestjs.com/pipes#class-validator

Install class-validator in your project:

```bash
yarn add class-validator class-transformer
```

Example of using these 3 methodos (dto, pipes and class-validator)

**auth.controller.ts**
```typescript
//The route 'signup' is using dto for the return
@Post('signup')
signup(@Body() dto: SignupDto){
  return this.authService.signup()
};
```

**dto/index.ts**
```typescript
//Using class instead of interface for decorators
exoport class SignupDto{   
  @IsEmail()                          
  @IsNotEmpty()
  email: string;

  @IsString()               
  @IsNotEmpty()
  password: string;
}
```

**main.ts**
```typescript
//app.useGlobalPipes to allow class-validator
async function bootstrap() {
  console.log(`
    Server is running in: http://localhost:${process.env.PORT ?? 3000}
  `)
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());               //To allow the class-validator
  await app.listen(process.env.PORT ?? 3000,"0.0.0.0"); 
}
bootstrap();
```