// Selections

const addBtn = document.querySelector(".add-btn");
console.log(addBtn);
const inputValue = document.querySelector("#add-item");
console.log(inputValue);
const formSelect = document.querySelector(".form-list");
console.log(formSelect);
const alert = document.querySelector(".alert");
const alertText = document.querySelector(".alert-text");
const listItem = document.querySelector("#added-items");
console.log(listItem);
const sectionCenter = document.querySelector(".section-center");
const clearBtn = document.querySelector(".clear-btn");
console.log(clearBtn);
const btnContainer = document.querySelector(".btn-container");

// initial states

let editedElement;
let editState = false;
let editID = "";

// form submission

// load items
window.addEventListener("DOMContentLoaded", loadSavedItems);

formSelect.addEventListener("submit", addItem);

clearBtn.addEventListener("click", deleteAllItems);
// event bubbling selections for edit and delete btn
listItem.addEventListener("click", function (e) {
  // edit current item
  if (e.target.classList.contains("icon-edit")) {
    e.preventDefault();
    // current value in the input field
    let currentFormValue = document.querySelector("#add-item").value;
    console.log(currentFormValue);
    let currentItemId =
      e.target.parentElement.parentElement.parentElement.dataset.id;
    console.log("edit btn was selected");
    // current item's value will be changed to the current input field value when btn clicked
    let newCurrentTextItem =
      e.target.parentElement.parentElement.parentElement.children[0];
    console.log(newCurrentTextItem);
    newCurrentTextItem.innerHTML = currentFormValue;
    displayAlert("Item edited successfully", "green");
    // edit item in the local storage with the current value from the input field
    editLocalStorage(currentItemId, currentFormValue);
    setBackToDefault();
  }
  // delete current item
  if (e.target.classList.contains("icon-delete")) {
    e.target.closest(".list-item-new").remove();
    // current id of item when clicking the delete btn
    let deleteItemId =
      e.target.parentElement.parentElement.parentElement.dataset.id;
    console.log(deleteItemId);
    // remove from local storage
    removeFromLocalStorage(deleteItemId);
    console.log("delete btn was selected");
    displayAlert("Item deleted", "red");
  }
});

// add item function
function addItem(e) {
  e.preventDefault();
  console.log(inputValue.value);
  const value = inputValue.value;
  // random id generator
  let id = "";
  for (let i = 0; i < 6; i++) {
    let randomStringNr = Math.round(Math.random()) * i;
    console.log(randomStringNr);
    // id += randomStringNr;
    id = id + randomStringNr;
    console.log(id);
  }

  // conditions
  if (value && !editState) {
    createListItem(id, value);
    // const newElement = document.createElement("div");
    // // add class
    // newElement.classList.add("list-item-new");
    // const attr = document.createAttribute("data-id");
    // attr.value = id;
    // newElement.setAttributeNode(attr);
    // newElement.innerHTML = `<p class="added-text">${value}</p>
    //         <div class="btn-container">

    //               <button type="button" class="btn edit-btn">
    //                 <img src="Icons/Edit.svg" class="icon-edit" alt="edit button" />
    //                 Edit item
    //               </button>
    //               <button type="button" class="btn delete-btn">
    //                 <img
    //                   src="Icons/Trash Bin.svg"
    //                   class="icon-delete"
    //                   alt="delete button"
    //                 />Delete item
    //               </button>
    //       </div>`;
    // // append child
    // listItem.appendChild(newElement);
    // displayAlert
    displayAlert("Item added to the list", "green");
    console.log("item added");
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
    //   console.log("item edited");
  } else {
    displayAlert("Please enter an item", "red");
    // alertEmptyField();
    // console.log("empty value");
  }
}

// display alert
function displayAlert(text, color) {
  alertText.textContent = text;
  alert.classList.remove("alert-hidden");
  alert.classList.add(`alert-${color}`);
  // remove alter after a certain time
  setTimeout(function () {
    alertText.textContent = "";
    alert.classList.add("alert-hidden");
    alert.classList.remove("alert-red");
  }, 1000);
}

// set back to default
function setBackToDefault() {
  inputValue.value = "";
  editState = false;
  editID = "";
  console.log("set back to default");
}

// function delete all items
function deleteAllItems() {
  const items = document.querySelectorAll(".list-item-new");
  console.log(items);
  if (items.length > 0) {
    items.forEach(function (item) {
      listItem.removeChild(item);
    });
  }
  displayAlert("All items were deleted", "red");
  setBackToDefault();
  // remove all item from the local storage list
  localStorage.removeItem("itemList");
}

////////////////////////////////////////////////////////////////////////
// Local storage

// add to local storage function
function addToLocalStorage(id, value) {
  const addedItem = { id: id, value: value };
  let existingItems = getLocalStorage();
  // let existingItems = localStorage.getItem("itemList")
  //   ? JSON.parse(localStorage.getItem("itemList"))
  //   : [];
  existingItems.push(addedItem);
  localStorage.setItem("itemList", JSON.stringify(existingItems));
  console.log(existingItems);
  console.log("added to local storage");
}
// edit item in local storage function
function editLocalStorage(id, value) {
  let existingItems = getLocalStorage();
  existingItems = existingItems.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("itemList", JSON.stringify(existingItems));
}

// remove from local storage function
function removeFromLocalStorage(id) {
  let existingItems = getLocalStorage();
  let filteredItems = existingItems.filter(function (item) {
    if (item.id !== id) {
      console.log(item);
      return item;
    }
  });
  console.log(filteredItems);
  localStorage.setItem("itemList", JSON.stringify(filteredItems));
}

// current local storage list function
function getLocalStorage() {
  return localStorage.getItem("itemList")
    ? JSON.parse(localStorage.getItem("itemList"))
    : [];
}

// load item saved in the local storage

function loadSavedItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
  }
  displayAlert("items loaded", "green");
}

// function used for diplaying all the items in local storage once the DOM is loaded
function createListItem(id, value) {
  const newElement = document.createElement("div");
  // add class
  newElement.classList.add("list-item-new");
  const attr = document.createAttribute("data-id");
  attr.value = id;
  newElement.setAttributeNode(attr);
  newElement.innerHTML = `<p class="added-text">${value}</p>
            <div class="btn-container">
                  
                  <button type="button" class="btn edit-btn">
                    <img src="Icons/Edit.svg" class="icon-edit" alt="edit button" />
                    Edit item
                  </button>
                  <button type="button" class="btn delete-btn">
                    <img
                      src="Icons/Trash Bin.svg"
                      class="icon-delete"
                      alt="delete button"
                    />Delete item
                  </button>
          </div>`;
  // append child
  listItem.appendChild(newElement);
}
