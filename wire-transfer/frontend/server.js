
/*Load compiled build files on local server */
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(`${__dirname}/build/`));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});
const PORT = process.env.PORT || 8000;
const { log } = console;
app.listen(PORT, () => {
  log('Server started on port: ', PORT);
});
