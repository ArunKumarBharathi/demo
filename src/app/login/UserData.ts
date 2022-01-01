export class UserData {
    constructor(private email,
       private idToken:string,
       private localId:string,
       private  expiresIn:Date){

    }
    get token(){
        if(new Date()>this.expiresIn){
            return null;
        }
        return this.idToken
    }
}