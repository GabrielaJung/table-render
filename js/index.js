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

async function requestJson() {
  await fetch("data.json").then((response) => {
    response.json().then((data) => jsonData.setData(data));
  });
}

function Table() {
  const tableElement = document.createElement("table");

  //header
  const tHeader = document.createElement("theader");
  const trHeader = document.createElement("tr");
  const tdIdHeader = document.createElement("td");
  const tdProductHeader = document.createElement("td");
  const tdSoldHeader = document.createElement("td");

  tdIdHeader.textContent = "ID";
  tdProductHeader.textContent = "Produto";
  tdSoldHeader.textContent = "Quantidade vendida";
  trHeader.append(tdIdHeader, tdProductHeader, tdSoldHeader);
  tHeader.append(trHeader);

  //body
  const tBody = document.createElement("tbody");
  tBody.append(TableBody());

  tableElement.append(tHeader, tBody);

  return tableElement;
}

function TableBody() {
  const data = jsonData.getData();
  console.log(data);

  const tbody = data.map((productInfo) => {
    const row = document.createElement("tr");
    const colId = document.createElement("td");
    const colProduct = document.createElement("td");
    const colSold = document.createElement("td");

    colId.textContent = `${productInfo.id}`;
    colProduct.textContent = `${productInfo.produto}`;
    colSold.textContent = `${productInfo.vendidos}`;

    row.append(colId, colProduct, colSold);
    return row;
  });
  console.log(tbody);
  return tbody;
}

function init() {
  const data = jsonData.getData();
  document.querySelector("body").prepend(Table());
  console.log(data);
}

requestJson();
