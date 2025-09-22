// Task interface (for better type safety if expanded later)
interface Task {
  text: string;
  completed: boolean;
}

// DOM references with explicit typing
const inputBox = document.getElementById("input-box") as HTMLInputElement;
const listContainer = document.getElementById("list-container") as HTMLUListElement;

// Add Task
function addTask(): void {
  if (!inputBox.value.trim()) {
    alert("You must write something!");
    return;
  }

  const li: HTMLLIElement = document.createElement("li");
  li.textContent = inputBox.value;

  const span: HTMLSpanElement = document.createElement("span");
  span.textContent = "\u00d7"; // × symbol
  li.appendChild(span);

  listContainer.appendChild(li);
  inputBox.value = "";

  saveData();
}

// Event Delegation for check/remove
listContainer.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (target.tagName === "LI") {
    target.classList.toggle("checked");
    saveData();
  } else if (target.tagName === "SPAN" && target.parentElement) {
    target.parentElement.remove();
    saveData();
  }
});

// Save data to localStorage
function saveData(): void {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Load saved tasks
function showTask(): void {
  const data: string | null = localStorage.getItem("data");
  if (data) {
    listContainer.innerHTML = data;
  }
}

// Initialize
showTask();

// Expose addTask globally for button onclick
(window as any).addTask = addTask;
