import app from "./app.js"
import 'dotenv/config';
import  sequelize  from "./database/connection.js";

const PORT = process.env.PORT || 5000;

async function startserver(){
    try {
       await sequelize.authenticate()
       console.log('✅ Database connection established successfully.')

       app.listen(PORT,() => {
       console.log(`🚀 Day 1 Server running on http://localhost:${PORT}/api/v1/health`);
       })
    } catch(error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1);
    }
};

startserver();
