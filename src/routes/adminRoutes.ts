import { PrismaClient } from '@prisma/client';
import express from 'express';
import { AdminSchema } from '../schema/schema';
import { parseArgs } from 'util';

const adminRouter = express.Router();

adminRouter.get("/health", (req, res) => {
    return res.status(200).json({message: "Admin Service is running"});
});

adminRouter.post("/create", async (req, res) => {
    const body = req.body;

    const parsedBody = AdminSchema.safeParse(body);

    if(!parsedBody.success){
        return res.status(400).json(parsedBody.error.errors);
    }

    const prisma = new PrismaClient();

    try{
        const admin = await prisma.admin.create({
            data: parsedBody.data
        });
        return res.status(200).json(admin);
    }catch{
        return res.status(500).json({message: "Internal Server Error"});
    }finally{
        prisma.$disconnect();
    }

});

adminRouter.get("/get-admin/:id", async (req, res) => {
    const params = req.params;
    const prisma = new PrismaClient();

    try{
        const admin = await prisma.admin.findUnique({
            where: {
                id: params.id,
            },
        });
        return res.status(200).json(admin);
    }catch{
        return res.status(500).json({message: "Internal Server Error"});
    }finally{
        prisma.$disconnect();
    }
});


adminRouter.get("/getAllUsers", async (req, res) => {
    const prisma = new PrismaClient();

    try{
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    }catch{
        return res.status(500).json({message: "Internal Server Error"});
    }finally{
        prisma.$disconnect();
    }
});

export default adminRouter; 