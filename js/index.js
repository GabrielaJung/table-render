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

function Table() {
  const tableElement = document.createElement("table");

  //header
  const tHeader = tableElement.createTHead();

  const trHeader = tHeader.insertRow(0);
  trHeader.insertCell(0).textContent = "ID";
  trHeader.insertCell(1).textContent = "Produto";
  trHeader.insertCell(2).textContent = "Quantidade vendida";

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

    // colId.setAttribute("id", productInfo.id);
    // colProduct.setAttribute("id", productInfo.produto);
    // colSold.setAttribute("id", productInfo.vendidos);

    // dblclick event listener
    colId.addEventListener("dblclick", () => {
      colId.setAttribute("contenteditable", true);
      editableComponent.setData(colId);

      // console.log(parseInt(colId.textContent));
    });

    colProduct.addEventListener("dblclick", () => {
      colProduct.setAttribute("contenteditable", true);
      editableComponent.setData(colProduct);

      // console.log(colProduct.textContent);
    });

    colSold.addEventListener("dblclick", () => {
      colSold.setAttribute("contenteditable", true);
      editableComponent.setData(colSold);

      // console.log(parseInt(colSold.textContent));
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
