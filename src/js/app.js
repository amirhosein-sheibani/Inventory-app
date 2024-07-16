import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";


document.addEventListener("DOMContentLoaded", () => {
  // set App category form
  CategoryView.setApp();
  // set App product form
  ProductView.setApp();
  // display category options list for first loaded
  CategoryView.createOptionsList();
  // displaye product List for first loaded
  ProductView.createProductsList(ProductView.products);
});
