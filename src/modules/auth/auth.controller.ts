import {Body, Session,Controller, Get, Post, Param, Query, Delete, Patch,NotFoundException,UseInterceptors,ClassSerializerInterceptor, UseGuards} from '@nestjs/common';
import { createUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { updateUserDto } from '../user/dto/update-user.dto';
// import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
// import { CurrentUser } from './decorators/current-user.decorator';
// import { SerializeInterceptor,Serialize } from '../interceptors/serialize.interceptor';
// import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')



export class AuthController {
    constructor(
        private usersService: UserService,
       private authService:AuthService ){}



    //    @Get('/colors/:color')
    //    setColor(@Param('color') color: string, @Session() session: any){
    //           session.color = color;
    //      }

    //      @Get('/colors')
    //         getColor(@Session() session: any){
    //             return session.color;
    //         }
    //@Get('/whoami')
    //whoami(@Session() session: any){
        //return this.usersService.findone(session.userId);
    //}

// @Get('/whoami')
// @UseGuards(AuthGuard)
// whoami(@CurrentUser() user: User){
//     return user;
// }

    @Post('/signout')
    signout(@Session() session: any){
        session.userId = null;
    }
@Post('/signup')
async createUser(@Body() body: createUserDto,@Session() session: any){
 const user:any= await this.authService.signup(body);
 console.log(user.id);
 
session.userId = user.id;
return user;
}



@Post('/signin')
async signin(@Body() body: createUserDto,@Session() session: any){
    const user = await this.authService.signin(body.email,body.password);
    session.userId = user.id;
    return user;

}

//@UseInterceptors(new SerializeInterceptor(UserDto))
// @Get('/:id')
// async findUser(@Param('id') id: string){
//     console.log('handler is running');
    
//     const user= await this.usersService.findone(parseInt(id));
//     if(!user){
//         throw new NotFoundException('user not found');
//     }
//     return user;
// }
// @Get()
// findAllUsers(@Query('email') email: string){
//     return this.usersService.find(email);
// }
// @Delete('/:id')
// removeUser(@Param('id') id: string){
//     return this.usersService.remove(parseInt(id));
// }
// @Patch('/:id')
// updateUser(@Param('id') id: string,@Body() body: UpdateUserDto){
//     return this.usersService.update(parseInt(id),body);
// }

}