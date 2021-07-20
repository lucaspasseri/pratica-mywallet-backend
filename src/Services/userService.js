import bcrypt from "bcrypt";
import * as userRepository from "../Repositories/userRepository.js";
import jwt from "jsonwebtoken";

export async function create(name, email, password){
    const validUser = await userRepository.getItByEmail(email);

    if (validUser) {
        return null;
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = await userRepository.create(name, email, hashedPassword);

    return newUser;
}

export async function authenticate(email, password){
    const user = await userRepository.getItByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return null;
    }

    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET);

    return token;
}
