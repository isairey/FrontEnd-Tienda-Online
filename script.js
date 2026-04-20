import {
  deleteItemFromApi,
  fecthDataFromAPI,
  postItemToApi,
  putItemFromApi,
} from "./api/api.service.js";

let items = [
  {
    name: "Orange",
    isBought: false,
  },
  {
    name: "Apple",
    isBought: false,
  },
  {
    name: "Banana",
    isBought: false,
  },
];

const shopListDOM = document.getElementById("listId");
function printList() {
  shopListDOM.innerHTML = "";
  for (let item of items) {
    shopListDOM.innerHTML += `<li><label><input onchange="checkedItem('${
      item.id
    }') " type="checkbox" ${item.isBought ? "checked" : ""}/><span class="${
      item.isBought ? "textSpan" : ""
    }"> ${item.name} </span></label><span onclick="deleteItemFromList('${
      item.id
    }')" class="item-delete-btn">x</span> </li>`;
  }
}

async function checkedItem(itemId) {
  for (let item of items) {
    if (item.id == itemId) {
      item.isBought = !item.isBought;
      await putItemFromApi(itemId);
    }
  }

  printList();
}

async function deleteItemFromList(itemId) {
  const filterItems = [];
  for (let item of items) {
    if (item.id != itemId) {
      filterItems.push(item);
    }
  }
  items = filterItems;
  deleteItemFromApi(itemId);
  printList();
}

function capitalizerFirst(text) {
  const firstLetter = text.charAt(0);
  const rest = text.slice(1);
  return firstLetter.toUpperCase() + rest.toLowerCase();
}

async function addItemToList() {
  const inputDOM = document.getElementById("inputId");
  const newItemName = inputDOM.value.trim();
  inputDOM.value = "";

  if (!newItemName) {
    alert("debes introducir algo");
    return;
  }

  if (newItemName.length >= 25) {
    alert("Mucho Texto");
    return;
  }

  for (const item of items) {
    if (item.name.toLowerCase() == newItemName.toLowerCase()) {
      alert("El producto ya está en la lista");
      return;
    }
  }

  const newItem = {
    name: capitalizerFirst(newItemName),
    isBought: false,
  };
  await postItemToApi(newItem);
  items = await fecthDataFromAPI();
  printList();
}

async function main() {
  items = await fecthDataFromAPI();
  printList();
}

main();
window.addItemToList = addItemToList;
window.deleteItemFromList = deleteItemFromList;
window.checkedItem = checkedItem;
