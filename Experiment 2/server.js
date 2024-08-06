const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve the images directory as static files
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve the static HTML and JavaScript files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
