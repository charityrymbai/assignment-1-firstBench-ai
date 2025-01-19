import express, { Request, Response } from 'express';
import { UserSchema } from './schema/schema';
import { PrismaClient } from '@prisma/client';

const app = express();

app.use(express.json());

app.post("/create", async (req: Request, res: Response) => {
    const body = req.body;
    console.log(body);

    const parsedBody = UserSchema.safeParse(body);

    if (!parsedBody.success) {
        return res.status(400).send(parsedBody.error.errors);
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
        return res.status(500).send("Internal Server Error");
    } finally {
        prisma.$disconnect();
    }

    
});

app.get("/get-user/:id", async (req: Request, res: Response) => {
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
        return res.status(500).send("Internal Server Error");
    } finally {
        prisma.$disconnect();
    }
    
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
