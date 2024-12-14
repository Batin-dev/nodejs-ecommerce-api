const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");

// ! Load Products
const loadProducts = () => {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((products) => {
      const productList = document.getElementById("productList");
      productList.innerHTML = "";
      products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td class="product-price">${product.price}$</td>
        `;
        productList.appendChild(row);
      });
    })
    .catch((error) => console.error("An error occurred while loading products."));
};

// ! popup / modal
const openModal = (type) => {
  modal.classList.add("active");
  if (type === "add") {
    modalTitle.textContent = "Add New Product";
    modalBody.innerHTML = `
      <input type="text" id="productName" placeholder="Product Name">
      <input type="text" id="productDescription" placeholder="Product Description">
      <input type="number" id="productPrice" placeholder="Product Price">
    `;
    saveButton.onclick = () => {
      const name = document.getElementById("productName").value;
      const description = document.getElementById("productDescription").value;
      const price = document.getElementById("productPrice").value;

      fetch("http://localhost:3000/products")
        .then((response) => response.json())
        .then((products) => {
          const lastProduct = products[products.length - 1];
          const newId = lastProduct ? lastProduct.id + 1 : 1;

          const newProduct = {
            id: newId,
            name,
            description,
            price,
          };
          fetch("http://localhost:3000/products/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
          })
            .then(() => {
              modal.classList.remove("active");
              loadProducts();
            })
            .catch((error) =>
              console.error("An error occurred while adding the product.")
            );
        })
        .catch((error) => console.error("An error occurred while getting the ID."));
    };
  } else if (type === "delete") {
    modalTitle.textContent = "Delete Product";
    modalBody.innerHTML = `
      <input type="number" id="productId" placeholder="Product ID">
    `;
    saveButton.onclick = () => {
      const id = parseInt(document.getElementById("productId").value, 10);
      if (isNaN(id)) {
        console.error("Invalid ID! Please enter a valid number.");
        return;
      }
      fetch("http://localhost:3000/products/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then(() => {
          modal.classList.remove("active");
          loadProducts();
        })
        .catch((error) => console.error("An error occurred while deleting the product."));
    };
  } else if (type === "update") {
    modalTitle.textContent = "Update Product";
    modalBody.innerHTML = `
      <input type="number" id="productId" placeholder="Product ID" required>
      <input type="text" id="productName" placeholder="Product Name">
      <input type="text" id="productDescription" placeholder="Product Description">
      <input type="number" id="productPrice" placeholder="Product Price">
    `;
    saveButton.onclick = () => {
      const id = parseInt(document.getElementById("productId").value, 10);
      const name = document.getElementById("productName").value;
      const description = document.getElementById("productDescription").value;
      const price = document.getElementById("productPrice").value;

      const updatedProduct = { id, name, description, price };
      fetch("http://localhost:3000/products/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      })
        .then(() => {
          modal.classList.remove("active");
          loadProducts();
        })
        .catch((error) => console.error("An error occurred while updating the product."));
    };
  }
};

document.getElementById("addProduct").onclick = () => openModal("add");
document.getElementById("updateProduct").onclick = () => openModal("update");
document.getElementById("deleteProduct").onclick = () => openModal("delete");
document.getElementById("refreshProducts").onclick = loadProducts;

cancelButton.onclick = () => modal.classList.remove("active");

// Refresh products on load
window.onload = loadProducts;
