import {startServer} from "./app/app"
import { config } from "dotenv";
import { Roles } from "./app/feature-modules/role/role.type";
import userService from "./app/feature-modules/users/user.service";
import authService from "./app/feature-modules/auth/auth.service";

config();

// const populateDb = async ()=>{
//     const admin = {
//         //_id :"",
//         name : "Swarnali Saha",
//         role : Roles.admin,
//         email : "swarnaliAdmin03@gmail.com",
//         password : "admin"
//     }
    
//     await authService.registerUser(admin);
// }
// populateDb();
startServer();