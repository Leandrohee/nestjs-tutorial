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