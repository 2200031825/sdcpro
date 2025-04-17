require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerDocs = require("./config/swagger");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
const userRoutes = require("./routes/userRoutes");
const ProjectRoutes = require('./routes/projectRoutes');
app.use("/users", userRoutes);
app.use("/projects", ProjectRoutes);

// Initialize Swagger Docs
swaggerDocs(app);

// Database connection using Seq  uelize (local setup)
const sequelize = require('./db');
sequelize.sync()  // Syncing models with database
  .then(() => { 
    console.log('✅ Database synced');
  })
  .catch(err => console.error('❌ Error syncing database:', err));

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running on localhost!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
