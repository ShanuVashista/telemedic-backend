"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import bodyparser from 'body-parser'
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const method_override_1 = __importDefault(require("method-override"));
const dotenv_1 = require("dotenv");
const connection_1 = __importDefault(require("./db/connection"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(bodyparser.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, method_override_1.default)("X-HTTP-Method-Override"));
app.use(function (req, res, next) {
    req.setEncoding("utf8");
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ("OPTIONS" == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
//DATABASE CONNECTION
app.use(connection_1.default);
app.use("/public", express_1.default.static(path_1.default.join(__dirname, "public")));
//ROUTES
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const superAdminRoute_1 = __importDefault(require("./routes/superAdminRoute"));
const siteAdminRoute_1 = __importDefault(require("./routes/siteAdminRoute"));
const appointment_1 = __importDefault(require("./routes/appointment"));
app.use('/user', userRoute_1.default);
app.use('/admin/super', superAdminRoute_1.default);
app.use('/admin/site', siteAdminRoute_1.default);
app.use('/appointments', appointment_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map