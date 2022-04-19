
import express from 'express';
// import bodyparser from 'body-parser'
import cors from 'cors'
import path from "path";
import methodOverride from "method-override";
import getConnection from './db/connection';
const app = express()
app.use(express.json());
// app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(function (req, res, next) {
    req.setEncoding("utf8");
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
  
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
  
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  
    if ("OPTIONS" == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });
//DATABASE CONNECTION
app.use((req, res, next) => {
    getConnection(req, res)
    next()
})
app.use("/public", express.static(path.join(__dirname, "public")));
//ROUTES
import userRoutes from './routes/userRoute'
import superAdminRoutes from './routes/superAdminRoute'
import siteAdminRoutes from './routes/siteAdminRoute'
import appointment from './routes/appointment'

app.use('/user', userRoutes);
app.use('/admin/super', superAdminRoutes)
app.use('/admin/site', siteAdminRoutes)
app.use('/appointments',appointment)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`)
})
