var app = require('./config/server');
const multer = require('multer');
const upload = multer();
const fs = require('fs');
const ShortUID = require('short-uid');
var path = require('path');

var port = 3002;

app.listen(port, () => {
  console.log('\nServidor rodando na porta ' + port + ' \n');
});

app.post('/upFoto', upload.any(), (req, res) => {
  console.log(req.files[0]);
  //Implementaçao de IDs unicos p/ evitar conflitos()
  let idGen = new ShortUID();
  let id = idGen.randomUUID();
  let nomeArq = id + '_' + req.files[0].originalname;

  fs.writeFile('./IMG/' + nomeArq, req.files[0].buffer, err => {
    if (err) throw err;

    res.status(200).send({ status: 'ok', fileName: nomeArq });
  });
});

app.get('/ListFoto', (req, res) => {
  let nomes = new Array();
  fs.readdir('./IMG/', (err, files) => {
    if (err) throw err;
    files.forEach(x => {
      console.log(x);
      nomes.push(x);
    });
    res.status(200).send(nomes);
  });
});

app.post('/DeleteFoto', (req, res) => {
  if (req.body.nomeArq === undefined || req.body.nomeArq === '') {
    res.status(400).send('Parametro Faltando ou vazio');
  } else {
    fs.unlink('./IMG/' + req.body.nomeArq, function(err) {
      if (err) throw err;
    });
    res.status(200).send('OK');
  }
});

app.get('/getFoto/:x', (req, res) => {
  if (req.params.x === undefined || req.params.x === '') {
    res.status(400).send('Parametro Faltando ou vazio');
  } else {
    res.status(200).sendFile(path.join(__dirname, '/IMG/', req.params.x));
  }
});
