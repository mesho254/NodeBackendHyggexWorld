const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const usersRouter = require('./Routes/users');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions={origin:"*",credentials:true,optionSuccessStatus:200};
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });


// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api/users', usersRouter);

app.get("/",(req,res)=>{
  res.status(200).json({
      team_name:"Mesho Devs",dev_team:["Mesho","Mesho254"].sort()})
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`You can Test the API here ${"http://localhost:5000/api-docs/"}`);
});
 