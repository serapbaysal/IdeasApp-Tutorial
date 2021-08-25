import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {

    constructor(private userService:UserService){

    }




    @Get('api/users')
    showAllUsers(){
        this.userService.showAll();

    }


    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() data:UserDTO){
        this.userService.login(data);
    }

    @Post('register')
    register(@Body() data:UserDTO){
        this.userService.register(data);

    }

}
