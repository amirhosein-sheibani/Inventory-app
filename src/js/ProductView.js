import Storage from "./Storage.js";

const form = document.querySelector("#product-form");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort");

class ProductView {
  constructor() {
    this.products = Storage.getAllData("products");
    form.addEventListener("submit", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.sortBy = selectedSort.value || "newest";
  }

  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filtredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductsList(filtredProducts);
  }

  addNewProduct(e) {
    e.preventDefault();
    const title = document.querySelector("#product-title").value;
    const quantity = document.querySelector("#product-quantity").value;
    const category = document.querySelector("#product-category").value;

    if (!title || !quantity || !category) return;

    const newProduct = {
      title,
      quantity: Number(quantity),
      category,
    };

    Storage.saveData(newProduct, "products");
    this.products = Storage.getAllData("products");
    this.createProductsList(this.products);
    this.countQuantity();
    form.reset();
  }

  setApp() {
    this.products = Storage.getAllData("products");
    this.countQuantity();
  }

  countQuantity() {
    const appBarCounter = document.querySelector("#appbar-counter");
    let sumTotal = this.products.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
    appBarCounter.innerText = sumTotal;
  }

  createProductsList(products) {
    const productsDom = document.querySelector("#products-list");
    let result = ``;
    products.forEach((product) => {
      const date = new Date(product.createdAt).toLocaleDateString("fa-IR");
      result += `<div class="w-full flex items-center justify-between text-slate-300">
              <span class="font-bold">${product.title}</span>
              <div class="flex items-center justify-center gap-x-5">
                <span>${date}</span>
                <p
                  class="px-2 border border-slate-400 text-slate-400 rounded-xl"
                >
                  ${product.category}
                </p>
                <span class="counter">${Number(product.quantity)}</span>
                <button
                  class="px-2 border border-red-400 text-red-500 rounded-xl"
                  id="delete-btn"
                  data-id="${product.id}"
                >
                  delete
                </button>
              </div>
            </div>`;
      productsDom.innerHTML = result;
      const deleteBtns = document.querySelectorAll("#delete-btn");
      deleteBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          this.deleteProduct(e.target.dataset.id);
        });
      });
    });
  }

  deleteProduct(id) {
    Storage.deleteProduct(id);
    this.products = Storage.getAllData("products");
    this.createProductsList(this.products);
    this.countQuantity();
  }

  sortProducts(e) {
    const value = e.target.value;
    this.sortBy = value;
    if (this.sortBy === "newest") {
      this.products.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (this.sortBy === "oldest") {
      this.products.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }
    this.createProductsList(this.products);
  }
}

export default new ProductView();
