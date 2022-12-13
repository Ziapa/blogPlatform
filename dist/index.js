"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const video_router_1 = require("./router/video-router");
exports.app = (0, express_1.default)();
const PORT = 3003;
exports.app.use(express_1.default.json());
exports.app.get('/', (req, res) => {
    res.send('Hello World!!!!');
});
exports.app.use('/blogs', video_router_1.blogsRouter);
exports.app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`);
});
