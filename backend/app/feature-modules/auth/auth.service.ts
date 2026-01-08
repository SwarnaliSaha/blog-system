import { compare, genSalt, hash } from "bcryptjs";
import userService from "../users/user.service";
import { IUser } from "../users/user.type";
import { Roles } from "../role/role.type";
import { ICredential } from "./auth.type";
import { AUTH_RESPONSES } from "./auth.response";
import jwt, { verify } from 'jsonwebtoken';
import fs from "fs"
import path from "path"

const encryptedPassword = async (user:IUser)=>{
    const salt = await genSalt(10);
    
    const hashedPassword = await hash(user.password,salt);
    user.password = hashedPassword;
    return user;
}

const registerUser = async(user:IUser)=>{
    user = await encryptedPassword(user);
    if(!user.role) user.role = Roles.user;
    
    const record = userService.createUser(user);

    return record;
}

const login = async (cred: ICredential) => {
    const user = await userService.findUser({ email: cred.email })

    if (!user) throw AUTH_RESPONSES.INVALID_USER_CREDENTIALS;
    console.log("after email")
    const isPasswordValid = await compare(cred.password, user.password);
    console.log("after password")
    console.log(cred.password,user.password)
    if (!isPasswordValid) throw AUTH_RESPONSES.INVALID_USER_CREDENTIALS;

    // Resolve keys relative to project root so runtime works with compiled build/ output
    const PRIVATE_KEY = fs.readFileSync(path.resolve(process.cwd(), "app", "keys", "private.pem"), { encoding: "utf-8" })
    const { _id, role } = user;

    try {
        const token = jwt.sign({ id: _id, role: role }, PRIVATE_KEY || "", { algorithm: 'RS256',expiresIn:'900s' });
        //const refreshToken = jwt.sign({ id: _id, role: role }, PRIVATE_KEY || "", { algorithm: 'RS256',expiresIn:'9000s' });

        return { token,role };

    } catch (error) {
        console.log(error)
    }
}

export default {
    registerUser,
    login
}