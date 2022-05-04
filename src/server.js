const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT } = require('./config');
const petsRoutes = require('./api/petsRoutes');
const prescripRoutes = require('./api/prescriptionsRoutes');
const medicRoutes = require('./api/medicationsRoutes');
const logsRoutes = require('./api/logsRoutes');

const app = express();

// Middle ware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json('hello'));

// Routes
app.use('/api', petsRoutes);
app.use('/api', prescripRoutes);
app.use('/api', medicRoutes);
app.use('/api', logsRoutes);

// 404

app.all('*', (req, res) => {
  res.statusCode(404).json({ error: 'Page not found' });
});
//

app.listen(PORT, () => console.log('server is runnig on port', +PORT));
