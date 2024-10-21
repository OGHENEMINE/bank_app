import bcrypt from "bcrypt";

export const hashPassword = async (myPlaintextPassword: string) => {
    const saltRounds = 10;  
    return bcrypt.hash(myPlaintextPassword, saltRounds);
}

export const compareHash = async (myPlaintextPassword: string, hashedPassword: string) => {
    return bcrypt.compare(myPlaintextPassword, hashedPassword);
}