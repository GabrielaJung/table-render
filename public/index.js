const jsonData = {
  constructor() {
    this.data = {};
  },

  getData() {
    return this.data;
  },

  setData(value) {
    this.data = value;
    const table = document.querySelector("body").children[0];
    if (table.tagName === "TABLE") {
      table.children[1].remove();

      const tBody = table.createTBody();

      TableBody({ tBody: tBody });

      table.append(tBody);
    } else {
      init();
    }
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

  const colIdHeader = trHeader.insertCell(0);
  const colProductHeader = trHeader.insertCell(1);
  const colSoldHeader = trHeader.insertCell(2);

  colIdHeader.textContent = "ID";
  colProductHeader.textContent = "Produto";
  colSoldHeader.textContent = "Quantidade vendida";

  colIdHeader.setAttribute("className", "asc");

  trHeader.childNodes.forEach((cell, index) => {
    cell.onclick = () => {
      const order = changeColOrder(cell.getAttribute("classname"));

      trHeader.childNodes.forEach((headerCell) => {
        if (headerCell === cell) return;
        headerCell.removeAttribute("classname");
      });

      cell.setAttribute("className", order);

      orderTable(index, order);
    };
  });

  //body
  const tBody = tableElement.createTBody();
  TableBody({ tBody: tBody });

  tableElement.append(tHeader, tBody);

  return tableElement;
}

function TableBody({ tBody }) {
  const data = jsonData.getData();

  data.forEach((productInfo, index) => {
    const row = tBody.insertRow(index);

    const colId = row.insertCell(0);
    const colProduct = row.insertCell(1);
    const colSold = row.insertCell(2);

    colId.textContent = productInfo.id;
    colProduct.textContent = productInfo.produto;
    colSold.textContent = productInfo.vendidos;

    // dblclick event listener
    colId.addEventListener("dblclick", () => {
      colId.setAttribute("contenteditable", true);
      editableComponent.setData(colId);
    });

    colProduct.addEventListener("dblclick", () => {
      colProduct.setAttribute("contenteditable", true);
      editableComponent.setData(colProduct);
    });

    colSold.addEventListener("dblclick", () => {
      colSold.setAttribute("contenteditable", true);
      editableComponent.setData(colSold);
    });

    // when click out editable component, remove permission to edit it
    document.onclick = function (e) {
      const editableCell = editableComponent.getData();
      if (!editableCell) return;

      if (e.target !== editableCell) {
        editableCell.setAttribute("contenteditable", false);
        editableComponent.setData(null);

        // todo: fazer aqui o salvamento do dado

        const id = parseInt(editableCell.parentNode.cells.item(0).textContent);
        console.log(id);
      }
    };
  });
  return tBody;
}

function init() {
  document.querySelector("body").prepend(Table());
}

function orderTable(col, order) {
  const unorderedData = jsonData.getData();

  if (col === 1) {
    const orderedData = [...unorderedData].sort((a, b) =>
      a.produto.localeCompare(b.produto)
    );
    jsonData.setData(order === "asc" ? orderedData : orderedData.reverse());
  } else {
    const orderedData = [...unorderedData].sort((a, b) => {
      const aCol = col === 0 ? a.id : a.vendidos;
      const bCol = col === 0 ? b.id : b.vendidos;
      return aCol - bCol;
    });
    jsonData.setData(order === "asc" ? orderedData : orderedData.reverse());
  }
}

function changeColOrder(order) {
  // const order = col.getAttribute("className");

  if (!order || order === "desc") {
    return "asc";
  }

  return "desc";
}

requestJson();
