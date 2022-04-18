
import express from 'express';
import bodyparser from 'body-parser'
import cors from 'cors'
import getConnection from './db/connection'
const app = express()
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());
app.use(cors());
//DATABASE CONNECTION
app.use((req, res, next) => {
    getConnection(req, res)
    next()
})
//ROUTES
import userRoutes from './routes/userRoute'
import superAdminRoutes from './routes/superAdminRoute'
import siteAdminRoutes from './routes/siteAdminRoute'
app.use('/user', userRoutes);
app.use('/admin/super', superAdminRoutes)
app.use('/admin/site', siteAdminRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`)
})
