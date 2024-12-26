import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const UserModel = {
  async findByEmail(email) {
    return prisma.user.findUnique({
         where: { email } });
  },

  async create(email, hashedPassword) {
    return prisma.user.create({
         data: 
         { email,
             hashed_password: hashedPassword } });
  },
};


export default UserModel

