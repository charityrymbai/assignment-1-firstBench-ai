import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { DeleteUserSchema, UpdateUserSchema, UserSignInSchema, UserSignUpSchema } from '../schema/schema';

const userRouter = express.Router();

userRouter.get("/health", async (req: Request, res: Response) => {
    return res.status(200).json({message: "User Service is running"});
});

userRouter.post("/signup", async (req: Request, res: Response) => {
    const body = req.body;

    const parsedBody = UserSignUpSchema.safeParse(body);

    if (!parsedBody.success) {
        return res.status(400).json({error: parsedBody.error.errors});
    }

    const prisma = new PrismaClient();

    try {
        
    const user = await prisma.user.create({
            data: {
                ...parsedBody.data,
                phoneNo: Number(parsedBody.data.phoneNo),
            },
        });
        return res.status(200).json({message: "user created successfully", user});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    } finally {
        prisma.$disconnect();
    }

    
});

userRouter.post("/signin", async (req: Request, res: Response) => {
    const body = req.body;

    const parsedBody = UserSignInSchema.safeParse(body);

    if (!parsedBody.success) { return res.status(400).json({error: parsedBody.error.errors}); }

    const prisma = new PrismaClient();

    try {
        const user = await  prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password,
                deleted: false
            },
        });

        if (user === null) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        return res.status(200).json({message: "user signin successfully", user});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    } finally {
        prisma.$disconnect();
    }

});

userRouter.put("/update-user/:id", async (req: Request, res: Response) => {
    const params = req.params;
    const body = req.body;

    const parsedBody = UpdateUserSchema.safeParse(body);

    if (!parsedBody.success) {
        return res.status(400).json(parsedBody.error.errors);
    }

    const prisma = new PrismaClient();

    try {
        
        await prisma.user.update({
            where: {
                id: params.id,
            },
            data: {
                ...parsedBody.data,
                phoneNo: parsedBody.data.phoneNo ? Number(parsedBody.data.phoneNo) : undefined,
            },
        });
        return res.status(200).json({message: "user updated successfully"});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    } finally {
        prisma.$disconnect();
    }

});

userRouter.delete("/delete-user/:id", async (req: Request, res: Response) => {
    const params = req.params;
    const body = req.body;

    const parsedBody = DeleteUserSchema.safeParse(body);

    if (!parsedBody.success) {
        return res.status(400).json(parsedBody.error.errors);
    }

    const prisma = new PrismaClient();

    try {
        await prisma.user.update({
            where: {
                id: params.id,
                password: body.password,
            },
            data: {
                deleted: true,
            },
        });
        return res.status(200).json({message: "user deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    } finally {
        prisma.$disconnect();
    }

});

export default userRouter; 