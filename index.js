const fruits = [
  "Apple",
  "Mango",
  "Orange",
  "Grapes",
  "Banana",
  "Dates",
  "Guava",
  "PineApple",
  "Pomegranate",
  "Damson",
  "strawberry",
  "Avocado",
];

const searchInput = document.getElementById("search-input");
const selectedTags = document.getElementById("selected-tags");
const dropDownList = document.getElementById("dropdown-list");
const clearAllBtn = document.getElementById("clear-all");

let selectedItems = new Set();
renderList(fruits);

// render fruits list
function renderList(fruits) {
  dropDownList.innerHTML = fruits
    .map((item) => `<li data-value="${item}">${item}</li>`)
    .join("");
  dropDownList.style.display = "flex";

  // add click event to each fruit item
  const listItems = dropDownList.querySelectorAll("li");
  listItems.forEach((item) => {
    item.addEventListener("click", () => addFruits(item.dataset.value));
  });
}

// add fruits in selectedItems
function addFruits(fruit) {
  if (!selectedItems.has(fruit)) {
    selectedItems.add(fruit);
  }
  selectedFruits(selectedItems);
  dropDownList.style.display = "none";
}

//delete fruits from selectedItems
function deleteFruits(fruit) {
  selectedItems.delete(fruit);
  selectedFruits(selectedItems);
}

// show selectedItems
function selectedFruits(fruits) {
  selectedTags.innerHTML = Array.from(fruits)
    .map(
      (item) =>
        `<span data-value="${item}">${item}<button class="remove-btn" onclick="deleteFruits('${item}')">&times;</button></span>`
    )
    .join("");
}

//search for fruits
searchInput.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  const filteredFruits = fruits.filter(
    (fruit) => fruit.toLowerCase().includes(searchText) // Pass the searchText here
  );
  renderList(filteredFruits);
  dropDownList.style.display = "flex";
});

//clear all selected items
clearAllBtn.addEventListener("click", () => {
  selectedItems.clear();
  selectedFruits(selectedItems);
});

//close dropdown if click outside
document.addEventListener("click", (e) => {
  if (!dropDownList.contains(e.target) && e.target !== searchInput) {
    dropDownList.style.display = "none";
  }
});
