import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserSchema } from '../schema/schema';

const userRouter = express.Router();

userRouter.get("/health", async (req: Request, res: Response) => {
    return res.status(200).json({message: "User Service is running"});
});

userRouter.post("/create", async (req: Request, res: Response) => {
    const body = req.body;
    console.log(body);

    const parsedBody = UserSchema.safeParse(body);

    if (!parsedBody.success) {
        return res.status(400).json(parsedBody.error.errors);
    }

    const prisma = new PrismaClient();

    try {
        
        const user = await prisma.user.create({
            data: {
                ...parsedBody.data,
                phoneNo: Number(parsedBody.data.phoneNo),
            },
        });
        console.log(user)
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    } finally {
        prisma.$disconnect();
    }

    
});

userRouter.get("/get-user/:id", async (req: Request, res: Response) => {
    const params = req.params;
    console.log(params);
    const prisma = new PrismaClient();

    try {
        
        const user = await  prisma.user.findUnique({
            where: {
                id: params.id,
            },
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    } finally {
        prisma.$disconnect();
    }

});

export default userRouter; 