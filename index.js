const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const usersRouter = require('./Routes/users');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions={origin:"*",credentials:true,optionSuccessStatus:200};
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerJsDoc = require('swagger-jsdoc')
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";


const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();



const specs = swaggerJsDoc(swaggerDocument)


// Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {customCssUrl: CSS_URL}));

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());


const mongooseOptions={
  useNewUrlParser:true,
  useUnifiedTopology:true
};
mongoose.connect(process.env.MongoDB_URI,
mongooseOptions,err=>{
  if(err){
      console.log(err)
  }
  else{
      console.log("Connected to MongoDB")
  }
});




// Routes
app.use('/api/users', usersRouter);

app.get("/",(req,res)=>{
  res.status(200).json({
      team_name:"Mesho Devs",dev_team:["Mesho","Mesho254"].sort()})
  });

app.use("*",(req,res)=>{
    res.status(500).json({status:"error",message:"This route does not exist"})
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`You can Test the API here ${"http://localhost:5000/api-docs/"}`);
});
 