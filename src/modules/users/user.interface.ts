import { Model } from "mongoose";


export type TUser = {

    name:string;
    email:string;
    role:"student"|"teacher"|"researcher";
    password:string;
    isDeleted:boolean;
    

}



export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser | null>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(passwordChangedTimestamp: Date, jwtIssuedTimestamp: number): boolean;
}