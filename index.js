const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const usersRouter = require('./Routes/users');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = config.port || 5000;

// Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(config.db.url, {
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
app.use(cors());

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
});
 