const app = require('./app');
const { PORT, TEST } = require('./config');

app.get('/', (request,response) => response.send(TEST));
app.listen(PORT, () => console.log(`Listening: port ${ PORT }`));