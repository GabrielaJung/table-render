// export async function editJson(id, updatedData, json, key) {
//   const itemFinded = json.find((item) => {
//     return item.id == id;
//   });
//   const newJson = json.flatMap((item) => {
//     if (item.id !== id) return item;
//     if (key == "produto") item.produto = updatedData.produto;
//     if (key == "vendidos") item.vendidos = updatedData.vendidos;
//     return item;
//   });
//   debugger;

//   fetch("data.json", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

export function sortTable(cellIndex) {
  var i,
    x,
    y,
    shouldSwitch,
    switchcount = 0;

  const table = document.querySelector("table");
  let switching = true;
  // Set the sorting direction to ascending:
  let dir = "asc";
  /* Make a loop that will continue until
    no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    let rows = table.rows;
    /* Loop through all table rows (except the
      first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
        one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[cellIndex];
      y = rows[i + 1].getElementsByTagName("TD")[cellIndex];
      /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
