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

  tableElement.append(tHeader, tBody);

  return tableElement;
}

function init() {
  const data = jsonData.getData();
  console.log(data);
}

requestJson();

document.querySelector("body").prepend(Table());
