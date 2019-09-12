import { User } from './user';

export interface UserResponse {
    stautsCode:number,
    message:string,
    data:Array<User>
}

