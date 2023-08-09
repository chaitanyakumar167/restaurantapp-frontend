var form = document.getElementById("addForm");
var table_1 = document.getElementById("table-1");
var table_2 = document.getElementById("table-2");
var table_3 = document.getElementById("table-3");
var filter = document.getElementById("filter");
// Get input values
var tableNumber = document.getElementById("tableNumber");
var amount = document.getElementById("amount");
var dishName = document.getElementById("dishName");

// Form submit event
form.addEventListener("submit", addItem);

// Add item
async function addItem(e) {
  e.preventDefault();

  let obj = {
    amount: amount.value,
    dishName: dishName.value,
    tableNumber: tableNumber.value,
  };

  await axios
    .post("http://localhost:5000/add", obj)
    .then((res) => (obj.id = res.data))
    .catch((err) => console.log(err));

  show(obj);
  amount.value = "";
  dishName.value = "";
  tableNumber.value = "";
}

function show(obj) {
  // Create new li element
  var li = document.createElement("li");
  // Add class
  li.className = "list-group-item";

  // Create del button element
  var deletebtn = document.createElement("button");

  // Add classes to del button
  deletebtn.className = "btn btn-danger btn-sm float-right delete";

  // Append text node
  deletebtn.appendChild(document.createTextNode("X"));

  // Add text node with input value
  li.textContent =
    obj.amount +
    " " +
    "-" +
    " " +
    obj.dishName +
    " " +
    "-" +
    " " +
    obj.tableNumber;

  deletebtn.onclick = async () => {
    const id = obj.id;
    switch (obj.tableNumber) {
      case "Table 1":
        table_1.removeChild(li);
        break;
      case "Table 2":
        table_2.removeChild(li);
        break;
      case "Table 3":
        table_3.removeChild(li);
        break;
      default:
        console.log("something went wrong");
    }
    await axios
      .delete(`http://localhost:5000/delete/${id}`)
      .catch((err) => console.log(err));
  };

  li.appendChild(deletebtn);

  switch (obj.tableNumber) {
    case "Table 1":
      table_1.appendChild(li);
      break;
    case "Table 2":
      table_2.appendChild(li);
      break;
    case "Table 3":
      table_3.appendChild(li);
      break;
    default:
      console.log("something went wrong");
  }
}

function showAllExpenses() {
  table_1.innerHTML = "";
  table_2.innerHTML = "";
  table_3.innerHTML = "";
  axios
    .get("http://localhost:5000/all-orders")
    .then((res) => {
      const data = res.data;
      for (let i = 0; i < data.length; i++) {
        show(data[i]);
      }
    })
    .catch((err) => console.log(err));
}

window.addEventListener("DOMContentLoaded", showAllExpenses);
