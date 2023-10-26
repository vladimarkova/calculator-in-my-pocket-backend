"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const theme_1 = __importDefault(require("./api/resources/theme"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const corsUrl = [
    "https://localhost:4200",
    "http://localhost:4200",
];
app.use((0, body_parser_1.json)());
const corsConfig = (0, cors_1.default)({
    origin: corsUrl,
    credentials: true
});
// app.use(corsConfig);
console.log(theme_1.default);
app.get('/', (req, res) => {
    res.send('Hello, Express with TypeScript!');
});
app.use('/api/theme', theme_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map