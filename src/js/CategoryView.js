import Storage from "./Storage.js";

const form = document.querySelector("#category-form");
const formTitle = document.querySelector("#category-title");
const formDescription = document.querySelector("#category-description");
const categorySelect = document.querySelector("#product-category");
const toggleAddCategoryBtn = document.querySelector("#toggle-add-category");
const chevron = document.querySelector("#chevron");
const cancelAddCategory = document.querySelector("#cancel-add-category");

class CategoryView {
  constructor() {
    form.addEventListener("submit", (e) => this.addNewCategory(e));
    toggleAddCategoryBtn.addEventListener("click", this.showCategoryForm);
    cancelAddCategory.addEventListener("click", this.cancelAddCategory);
    this.categories = [];
  }

  addNewCategory(e) {
    e.preventDefault();
    let title = formTitle.value.trim();
    let desc = formDescription.value.trim();
    if (title || desc) {
      const newCategory = {
        title,
        desc,
      };
      Storage.saveData(newCategory, "category");
      this.categories = Storage.getAllData("category");
      this.createOptionsList();
      form.reset();
      form.classList.add("hidden");
      chevron.classList.remove("rotate-180")
      chevron.classList.add("animate-pulse")
    } else return null;
  }

  setApp() {
    // Filling the array on the first run
    this.categories = Storage.getAllData("category");
  }

  createOptionsList() {
    let result = `<option class="bg-slate-500 text-slate-300" value="">Select Category</option>`;
    this.categories.forEach((category) => {
      result += `<option class="bg-slate-500 text-slate-300" value="${category.title}">${category.title}</option>`;
    });
    categorySelect.innerHTML = result;
  }

  showCategoryForm() {
    chevron.classList.remove("animate-pulse");
    chevron.classList.add("rotate-180");
    form.classList.remove("hidden");
  }

  cancelAddCategory() {
    form.classList.add("hidden");
    chevron.classList.remove("rotate-180");
    chevron.classList.add("animate-pulse");
  }
}

export default new CategoryView();
