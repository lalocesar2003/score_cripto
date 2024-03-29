import { NestInterceptor, ExecutionContext,CallHandler,Injectable} from "@nestjs/common";
import { UserService } from "../../modules/user/user.service";


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
   
    constructor(private usersService: UserService) { }

    async intercept(context: ExecutionContext, handler: CallHandler){
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session || {};
        if(userId){
            const user = await this.usersService.getUserById(userId);
            request.currentUser = user;
        }
        return handler.handle();
    }
}