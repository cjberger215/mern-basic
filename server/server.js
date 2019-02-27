import mongoose from 'mongoose';
import config from '../config/config';
import app from './express';

// comment out before building for production
import devBundle from './devBundle';

devBundle.compile(app);

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', config.port);
});
