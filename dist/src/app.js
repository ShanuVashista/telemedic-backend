var express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
var config = require('../config');
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
//DATABASE CONNECTION
app.use((req, res, next) => {
    const dbcon = require('./db/connection');
    dbcon.getConnection(req, res);
    next();
});
//ROUTES
var userRoutes = require('./routes/userRoute');
var superAdminRoutes = require('./routes/superAdminRoute');
var siteAdminRoutes = require('./routes/siteAdminRoute');
app.use('/user', userRoutes);
app.use('/admin/super', superAdminRoutes);
app.use('/admin/site', siteAdminRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(config.port, () => {
    return console.log(`Express is listening at http://localhost:${config.port}`);
});
//# sourceMappingURL=app.js.map