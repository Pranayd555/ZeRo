import { UserInterface } from "./IUser";
import { IUserRegister } from "./IUserRegister";


export interface UserStateInterface {
    isLoading : boolean;
    users: UserInterface[];
    error: string | null;
}