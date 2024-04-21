import { UserDataType } from "./UserDataType";

export class UserData implements UserDataType{
    name: string;
    index: number;
    group: number;

    constructor()
    {
        this.name = "";
        this.index = 0;
        this.group = 1;    
    }
}