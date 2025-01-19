import express, { Router } from 'express';
import userRouter from './Routes/userRoutes';

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
