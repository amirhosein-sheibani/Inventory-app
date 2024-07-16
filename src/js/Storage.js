 // implement this array for better understanding
const products = [
  {
    id: 1,
    title: "REACT.JS",
    category: "frontend",
    quantity: 2,
    date: "2022-04-11T09:08:07.808Z",
  },
  {
    id: 2,
    title: "Veu.JS",
    category: "frontend",
    quantity: 1,
    date: "2023-11-11T09:08:07.808Z",
  },
  {
    id: 3,
    title: "Node.JS",
    category: "backend",
    quantity: 3,
    date: "2024-12-11T09:08:07.808Z",
  },
];

 // implement this array for better understanding
let categories = [
  {
    id: 1,
    title: "backend",
    desc: "this is for server section ",
    createdAt: "2021-11-15T09:08:07.808Z",
  },
  {
    id: 2,
    tile: "frontend",
    desc: "this is for client section ",
    createdAt: "2023-01-20T09:08:07.808Z",
  },
];

export default class Storage {
  // get All data (products , categories) as dynamicly of localStorage
  static getAllData(str) {
    const savedCategories = JSON.parse(localStorage.getItem(str)) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedCategories;
  }

  //set data to localstorage Dynamically
  static saveData(data, str) {
    // get all data of localstorage 
    const savedData = this.getAllData(str);
    // find data index of localstorage
    let dataIndex = savedData.findIndex((c) => c.id == data.id);

    if (str === "category") {
      // data is finded
      if (dataIndex !== -1) {
        savedData[dataIndex] = {
          title: data.title,
          desc: data.desc,
        };
      } else {
        // There is no data
        const newData = {
          id: new Date().getTime(),
          title: data.title,
          desc: data.desc,
          createdAt: new Date().toISOString(),
        };
        savedData.push(newData);
      }
    } else if (str === "products") {
      // data is finded
      if (dataIndex !== -1) {
        savedData[dataIndex] = {
          title: data.title,
          quantity: data.quantity,
          category: data.category,
        };
      } else {
        // There is no data
        const newData = {
          id: new Date().getTime(),
          title: data.title,
          quantity: data.quantity,
          category: data.category,
          createdAt: new Date().toISOString(),
        };
        savedData.push(newData);
      }
    }
    localStorage.setItem(str, JSON.stringify(savedData));
  }

  static deleteProduct(id) {
    const products = this.getAllData("products");
    const filteredProudcts = products.filter((p) => p.id != id);
    localStorage.setItem("products" , JSON.stringify(filteredProudcts))
  }
}
