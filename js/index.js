// import { editJson } from "./utils.js"

import { sortTable } from "./utils.js";

const jsonData = {
  constructor() {
    this.data = {};
  },

  getData() {
    return this.data;
  },

  setData(value) {
    this.data = value;
    init();
  },
};

const editableComponent = {
  constructor() {
    this.data = null;
  },

  getData() {
    return this.data;
  },

  setData(value) {
    this.data = value;
  },
};

async function requestJson() {
  await fetch("data.json").then((response) => {
    response.json().then((data) => jsonData.setData(data));
  });
}

// TODO: try to make a function do update json data
// ? Ask felps if need to

function Table() {
  const tableElement = document.createElement("table");

  //header
  const tHeader = tableElement.createTHead();

  const trHeader = tHeader.insertRow(0);
  trHeader.insertCell(0).textContent = "ID";
  trHeader.insertCell(1).textContent = "Produto";
  trHeader.insertCell(2).textContent = "Quantidade vendida";

  trHeader.cells[0].setAttribute("id", "id");
  trHeader.cells[1].setAttribute("id", "produto");
  trHeader.cells[2].setAttribute("id", "vendidos");

  trHeader.addEventListener("click", (e) => {
    sortTable(e.target.cellIndex);
    console.log(e.target.id);
  });
  //body
  const tBody = tableElement.createTBody();
  TableBody({ tBody: tBody });

  tableElement.append(tHeader, tBody);

  return tableElement;
}

function TableBody({ tBody }) {
  const data = jsonData.getData();
  console.log(data);

  data.forEach((productInfo, index) => {
    const row = tBody.insertRow(index);

    const colId = row.insertCell(0);
    const colProduct = row.insertCell(1);
    const colSold = row.insertCell(2);

    colId.textContent = productInfo.id;
    colProduct.textContent = productInfo.produto;
    colSold.textContent = productInfo.vendidos;

    colId.setAttribute("id", productInfo.id);

    colProduct.addEventListener("dblclick", () => {
      colProduct.setAttribute("contenteditable", true);
      editableComponent.setData(colProduct);

      // colProduct.addEventListener("input", function () {
      //   const updatedData = {
      //     produto: colProduct.textContent,
      //   };
      //   editJson(productInfo.id, updatedData, jsonData.getData(), "produto");
      // });
    });

    colSold.addEventListener("dblclick", () => {
      colSold.setAttribute("contenteditable", true);
      editableComponent.setData(colSold);

      // putDataJson("data.json", jsonData.getData()).then((data) => {
      //   console.log(data); // JSON data parsed by `data.json()` call
      // });

      // colSold.addEventListener("input", function () {
      //   const updatedData = {
      //     vendidos: parseInt(colSold.textContent),
      //   };
      //   editJson(productInfo.id, updatedData, jsonData.getData(), "vendidos");
      // });
    });

    // when click out editable component, remove permission to edit it
    document.onclick = function (e) {
      const editableCell = editableComponent.getData();
      if (!editableCell) return;
      if (e.target !== editableCell) {
        editableCell.setAttribute("contenteditable", false);
        editableComponent.setData(null);
      }
    };
  });
  return tBody;
}

function init() {
  const data = jsonData.getData();
  document.querySelector("body").prepend(Table());
}

requestJson();
