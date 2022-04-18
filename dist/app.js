"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./db/connection"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
//DATABASE CONNECTION
app.use((req, res, next) => {
    (0, connection_1.default)(req, res);
    next();
});
//ROUTES
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const superAdminRoute_1 = __importDefault(require("./routes/superAdminRoute"));
const siteAdminRoute_1 = __importDefault(require("./routes/siteAdminRoute"));
app.use('/user', userRoute_1.default);
app.use('/admin/super', superAdminRoute_1.default);
app.use('/admin/site', siteAdminRoute_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(7894, () => {
    return console.log(`Express is listening at http://localhost:${7894}`);
});
//# sourceMappingURL=app.js.map