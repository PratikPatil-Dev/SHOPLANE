// Get the product id from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

var apiData;
var cartItems = parseInt(localStorage.getItem("cartItems")) || 0;
var selectedImage = "image0";

// Function to handle when an image is clicked
function imageClicked(i) {
  console.log(i);
  document.getElementById(selectedImage).classList.remove("active");
  let id = "image" + i;
  selectedImage = id;
  document.getElementById(id).classList.add("active");
  document.querySelector("#left-section img").src = apiData.photos[i];
}

// Function to add items to cart
function addItems(id) {
  apiData["inCart"] += 1;
  localStorage.setItem(id, JSON.stringify(apiData));
  cartItems = parseInt(cartItems) + 1;
  localStorage.setItem("cartItems", cartItems);
  $(".cart-cnt").text(localStorage.getItem("cartItems"));
}

// Fetch product data from the API
$.get(
  "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId,
  function (productData) {
    let leftSec = document.getElementById("left-section");
    let rightSec = document.getElementById("right-section");
    apiData = productData;

    productData["inCart"] = 0;  

    leftSec.innerHTML += `<img src="${productData.preview}" class="leftPreview">`;

    rightSec.innerHTML += `
          <h1 id="name">${productData.name}</h1>
          <h4 id="brand">${productData.brand}</h4>
          <h3 id="price">Price: Rs <span id="value">${productData.price}</span></h3>
          <h3 id="desc">Description</h3>
          <p id="description">${productData.description}</p>
          <p id="preview">Products Preview
          </p>
          <div id="previewDiv"></div>`;

    // Add all the product images to the preview section in the right section
    for (i = 0; i < productData.photos.length; i++) {
      if (i == 0) {
        document.getElementById("previewDiv").innerHTML += `
            <img src=${productData.photos[i]} class="image active" id="image${i}" onclick="imageClicked(${i})"/>
          `;
      } else {
        document.getElementById("previewDiv").innerHTML += `
            <img src=${productData.photos[i]} class="image" id="image${i}" onclick="imageClicked(${i})"/>
          `;
      }
    }

    rightSec.innerHTML += `<button id="btn" onclick="addItems(${apiData.id})">Add to cart</button>`;

    return productData;
  }
);
