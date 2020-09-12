const fs = require('fs');

exports.getUsers = (req, res) => {
  fs.readFile(`${__dirname}/../assets/users.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    res.json({
      status: 'success',
      data: dataJSON,
    });
  });
};

exports.getUserById = (req, res) => {
  fs.readFile(`${__dirname}/../assets/users.json`, (err, data) => {

    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Ocurrió un error'        
      });
    }

      const users = JSON.parse(data);
      const id = Number(req.params.id);
      const usersFiltrados = users.filter(user => user.id === id);

      if (!usersFiltrados.length) {
        return res.status(404).json({
          status: 'fail',
          message: 'Usuario no encontrado'
        });
      }

      res.send({
        status: "success",
        data: usersFiltrados
      });
    });
  };

  
exports.postUser = (req, res) => {

  fs.readFile(`${__dirname}/../assets/users.json`, (err, data) => 
   {
    const dataJSON = JSON.parse(data);
    const nuevoUser = req.body;    
    nuevoUser.id = dataJSON.length;
    nuevoUser.name = `User${dataJSON.length +1}`;
    nuevoUser.status = false;
    dataJSON.push(nuevoUser);
  

    fs.writeFile(
      `${__dirname}/../assets/users.json`,
      JSON.stringify(dataJSON),
      err => {
        res.status(201).json({
          status: 'success',
          message: `Ahora la lista tiene ${dataJSON.length} users.`,
          data: {
            nuevoUser,
            createdAt: req.requestedAt,
          },
        });
      },
    );
  });
};

exports.putUser = (req, res) => {
  fs.readFile(`${__dirname}/../assets/users.json`,
  (err, data) => {
    const dataJSON = JSON.parse(data);
    id = Number(req.params.id);
    const userModificado = dataJSON.filter(user => user.id === id);
    userModificado[0].status = true;      

    fs.writeFile(
      `${__dirname}/../assets/users.json`,
      JSON.stringify(dataJSON),
      err => {        
        
        res.status(202).json({
          status: 'success',
          message: "Estos son los datos con la modificación:",
          data: {
            userModificado,
            modifiedAt: req.requestedAt,
          },
        });
      },
    );   
  });
};

exports.deleteUser = (req, res) => {

  console.log("Estoy en delete");
  fs.readFile(`${__dirname}/../assets/users.json`,
  (err, data) => {
    const dataJSON = JSON.parse(data);
    id_delete = Number(req.params.id);
    const nuevoArrayDeUsers = dataJSON.filter(user => user.id !== id_delete);
    
    fs.writeFile(
      `${__dirname}/../assets/users.json`,
      JSON.stringify(nuevoArrayDeUsers),
      err => {          
        res.status(202).json({
          status: 'success',
          message: `Se borró el usuario con ID ${id_delete}. Ahora la lista tiene un total de ${nuevoArrayDeUsers.length} usuarios.`, 
        });
      },
    );   
  });
};