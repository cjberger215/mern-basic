import config from '../config/config'
import app from './express';
// comment out before building for production
import devBundle from './devBundle';

// comment out before building for production
devBundle.compile(app);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', config.port);
});
