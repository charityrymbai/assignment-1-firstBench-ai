"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const schema_1 = require("../schema/schema");
const userRouter = express_1.default.Router();
userRouter.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ message: "User Service is running" });
}));
userRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const parsedBody = schema_1.UserSchema.safeParse(body);
    if (!parsedBody.success) {
        return res.status(400).json(parsedBody.error.errors);
    }
    const prisma = new client_1.PrismaClient();
    try {
        const user = yield prisma.user.create({
            data: Object.assign(Object.assign({}, parsedBody.data), { phoneNo: Number(parsedBody.data.phoneNo) }),
        });
        console.log(user);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    finally {
        prisma.$disconnect();
    }
}));
userRouter.get("/get-user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    console.log(params);
    const prisma = new client_1.PrismaClient();
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: params.id,
            },
        });
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    finally {
        prisma.$disconnect();
    }
}));
exports.default = userRouter;
