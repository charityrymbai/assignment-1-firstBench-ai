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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const schema_1 = require("../schema/schema");
const adminRouter = express_1.default.Router();
adminRouter.get("/health", (req, res) => {
    return res.status(200).json({ message: "Admin Service is running" });
});
adminRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedBody = schema_1.AdminSchema.safeParse(body);
    if (!parsedBody.success) {
        return res.status(400).json(parsedBody.error.errors);
    }
    const prisma = new client_1.PrismaClient();
    try {
        const admin = yield prisma.admin.create({
            data: parsedBody.data
        });
        return res.status(200).json(admin);
    }
    catch (_a) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    finally {
        prisma.$disconnect();
    }
}));
adminRouter.get("/get-admin/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const prisma = new client_1.PrismaClient();
    try {
        const admin = yield prisma.admin.findUnique({
            where: {
                id: params.id,
            },
        });
        return res.status(200).json(admin);
    }
    catch (_a) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    finally {
        prisma.$disconnect();
    }
}));
adminRouter.get("/getAllUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    try {
        const users = yield prisma.user.findMany();
        return res.status(200).json(users);
    }
    catch (_a) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    finally {
        prisma.$disconnect();
    }
}));
exports.default = adminRouter;
