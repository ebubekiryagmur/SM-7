import express from 'express';
import authRoutes from './routes/authRoutes.js';


const PORT=3000

const app = express();

app.use(express.json())

app.use('/auth', authRoutes);


app.listen(PORT,()=>{
    console.log("Sunucu Ayakta")
})
