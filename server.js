const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.static(__dirname)); 

// Utiliser res.sendFile pour envoyer le fichier index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
});

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
