
import express from 'express';
import bodyparser from 'body-parser'
import cors from 'cors'
import path from "path";
import { config } from 'dotenv';
import getConnection from './db/connection'
config();
const app = express()
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());
app.use(cors());
app.use(express.static('public'))

//DATABASE CONNECTION
app.use(getConnection)
app.use("/public", express.static(path.join(__dirname, "public")));
//ROUTES
import userRoutes from './routes/userRoute'
import superAdminRoutes from './routes/superAdminRoute'
import siteAdminRoutes from './routes/siteAdminRoute'
import appointment from './routes/appointment'

app.use('/user', userRoutes);
app.use('/admin/super', superAdminRoutes)
app.use('/admin/site', siteAdminRoutes)
app.use('/appointments', appointment)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`)
})
