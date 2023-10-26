"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({ message: 'API route for themes' });
});
router.get('/:id', (req, res) => {
    const themeId = req.params.id;
    res.json({ themeId });
});
exports.default = router;
//# sourceMappingURL=theme.js.map