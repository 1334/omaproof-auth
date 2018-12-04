const app = require(__dirname + '/server.js');
const port = 5000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running on port ${port}!`));
