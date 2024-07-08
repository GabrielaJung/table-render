const jsonData = {
  constructor() {
    this.data = {};
  },

  getData() {
    return this.data;
  },

  setData(value) {
    this.data = value;
    debugger;
    const tableBody = document.querySelector("body").children[0];
    if (tableBody.tagName === 'TABLE') tableBody.remove();
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
  const colProductHeader = trHeader.insertCell(1);
  const colSoldHeader = trHeader.insertCell(2);

  colProductHeader.textContent = "Produto";
  colSoldHeader.textContent = "Quantidade vendida";

  colProductHeader.addEventListener("click", () => {
    orderTable(tableElement, 1);
  });
  colSoldHeader.addEventListener("click", () => {
    orderTable(tableElement, 2);
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
  // const data = jsonData.getData();
  document.querySelector("body").prepend(Table());
}

function orderTable(table, col) {
  const unorderedData = jsonData.getData();
  console.log(unorderedData);

  // let sortedData;
  if (col === 1) {
    jsonData.setData(
      [...unorderedData].sort((a, b) => a.produto.localeCompare(b.produto))
    );
  } else if (col === 2) {
    jsonData.setData(
      [...unorderedData].sort((a, b) => a.vendidos - b.vendidos)
    );
  }

  console.log(jsonData.getData());
  console.log(table);
}

requestJson();
