const fs = require('fs');

exports.getGatitos = (req, res) => {
  fs.readFile(`${__dirname}/../assets/cats.json`, (err, data) => {
    console.log("directorio", __dirname)
    const dataJSON = JSON.parse(data);
    res.json({
      status: 'success',
      data: dataJSON,
    });
  });
};

exports.getGatitosById = (req, res) => {
  fs.readFile(`${__dirname}/../assets/cats.json`, (err, data) => {

    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Ocurrió un error'        
      });
    }

      const gatos = JSON.parse(data);
      const id = Number(req.params.id);
      const gatosFiltrados = gatos.filter(gato => gato.id === id);

      if (!gatosFiltrados.length) {
        return res.status(404).json({
          status: 'fail',
          message: 'Gato no encontrado'
        });
      }

      res.send({
        status: "success",
        data: gatosFiltrados
      });
    });
  };

exports.getGatitosByRefugio = (req, res) => {
  console.log(req.params)
  res.send("Me pediste un gatito en particular")
};

exports.postGatitos = (req, res) => {

  fs.readFile(`${__dirname}/../assets/cats.json`, (err, data) => 
   {
    const dataJSON = JSON.parse(data);
    const nuevoGato = req.body;    
    nuevoGato.id = dataJSON.length;
    nuevoGato.name = "Gatito Lindo";
    nuevoGato.shortDesc = "Es un gatito recién agregado a la lista";
    nuevoGato.sexo = "m";
    dataJSON.push(nuevoGato);
  

    fs.writeFile(
      `${__dirname}/../assets/cats.json`,
      JSON.stringify(dataJSON),
      err => {
        res.status(201).json({
          status: 'success',
          message: `Ahora la lista tiene ${dataJSON.length} gatitos.`,
          data: {
            nuevoGato,
            createdAt: req.requestedAt,
          },
        });
      },
    );
  });
};

exports.putGatitos = (req, res) => {
  fs.readFile(`${__dirname}/../assets/cats.json`,
  (err, data) => {
    const dataJSON = JSON.parse(data);
    id = Number(req.params.id);
    const gatoModificado = dataJSON.filter(gato => gato.id === id);
    gatoModificado[0].longDesc = `Ahora también forma parte de los gatitos más lindos de esta lista`;
        

    fs.writeFile(
      `${__dirname}/../assets/cats.json`,
      JSON.stringify(dataJSON),
      err => {        
        
        res.status(202).json({
          status: 'success',
          message: "Estos son los datos con la modificación:",
          data: {
            gatoModificado,
            modifiedAt: new Date()
          },
        });
      },
    );   
  });
};

exports.deleteGatitos = (req, res) => {

  console.log("Estoy en delete");
  fs.readFile(`${__dirname}/../assets/cats.json`,
  (err, data) => {
    const dataJSON = JSON.parse(data);
    id_delete = Number(req.params.id);
    const nuevoArrayDeGatos = dataJSON.filter(gato => gato.id !== id_delete);
    
    fs.writeFile(
      `${__dirname}/../assets/cats.json`,
      JSON.stringify(nuevoArrayDeGatos),
      err => {          
        res.status(202).json({
          status: 'success',
          message: `Se borró el gatito con ID ${id_delete}. Ahora la lista tiene un total de ${nuevoArrayDeGatos.length} gatitos.`, 
        });
      },
    );   
  });
};