

export type TUser = {

    name:string;
    email:string;
    role:"student"|"teacher"|"researcher";
    password:string;
    isDeleted:boolean;
    

}