// DOM references with explicit typing
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
// Add Task
function addTask() {
    if (!inputBox.value.trim()) {
        alert("You must write something!");
        return;
    }
    const li = document.createElement("li");
    li.textContent = inputBox.value;
    const span = document.createElement("span");
    span.textContent = "\u00d7"; // × symbol
    li.appendChild(span);
    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
}
// Event Delegation for check/remove
listContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "LI") {
        target.classList.toggle("checked");
        saveData();
    }
    else if (target.tagName === "SPAN" && target.parentElement) {
        target.parentElement.remove();
        saveData();
    }
});
// Save data to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
// Load saved tasks
function showTask() {
    const data = localStorage.getItem("data");
    if (data) {
        listContainer.innerHTML = data;
    }
}
// Initialize
showTask();
// Expose addTask globally for button onclick
window.addTask = addTask;
