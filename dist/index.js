"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/user", userRoutes_1.default);
app.use("/api/v1/admin", adminRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
