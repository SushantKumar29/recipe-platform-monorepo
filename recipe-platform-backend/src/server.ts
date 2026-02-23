import dotenv from 'dotenv';

import config from './config/config.js';
import app from './app.js';

dotenv.config({ quiet: true });

async function startServer() {
  try {
    app.listen(config.port, () => {
      console.log(`🚀 Server started on port ${config.port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
