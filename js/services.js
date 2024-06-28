// const express = require("express");
// const bodyParser = require("body-parser");
// const fs = require("fs");

// const app = express();
// const PORT = 3000;

// // Middleware para analisar o corpo das requisições
// app.use(bodyParser.json());

// const dataFile = "data.json";

// // Endpoint para atualizar um objeto no JSON
// app.put("/update/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const newData = req.body;

//   fs.readFile(dataFile, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send("Erro ao ler o arquivo.");
//     }

//     let jsonData = JSON.parse(data);
//     let itemIndex = jsonData.findIndex((item) => item.id === id);

//     if (itemIndex !== -1) {
//       jsonData[itemIndex] = { ...jsonData[itemIndex], ...newData };
//       fs.writeFile(dataFile, JSON.stringify(jsonData, null, 2), (err) => {
//         if (err) {
//           return res.status(500).send("Erro ao escrever no arquivo.");
//         }
//         res.send(jsonData[itemIndex]);
//       });
//     } else {
//       res.status(404).send("Item não encontrado.");
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });


