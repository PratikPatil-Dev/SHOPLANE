// Create two empty arrays to store the list of clothing and accessories
var clothingList = [];
var accessoryList = [];

// Update the cart count value on page load from local storage
$(".cart-cnt").text(localStorage.getItem("cartItems"));

$(document).ready(function () {
  // Initialize slick carousel with custom settings
  $(".sampleSlick").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  // Make API call to get the list of products
  $.get(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
    function (productList) {
      // Loop through the product list and push each item to either clothing or accessory list
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].isAccessory == true) {
          accessoryList.push(productList[i]);
        } else {
          clothingList.push(productList[i]);
        }
      }

      let clothingWrapper = document.getElementById("clothing-wrapper");
      let accessoryWrapper = document.getElementById("accessory-wrapper");

      // Loop through the clothing list and create HTML structure for each item

      for (let i = 0; i < clothingList.length; i++) {
        let div1 = `
        <a href="productpage.html?id=${i + 1}">
          <div class="cloth-card">
            <div class="img-sec">
            <img src="${clothingList[i].preview}"
            </div>
            <div class="info-sec">
                <h1>${clothingList[i].name}</h1>
                <p>${clothingList[i].brand}</p>
                <h3>Rs ${clothingList[i].price}</h3>
            </div>
          </div>
        </a>
    `;
        clothingWrapper.innerHTML += div1;
      }

      // Loop through the accessory list and create HTML markup for each item
      // Use a different loop variable to ensure product IDs start from 7 for accessories
      for (let i = 0, j = 6; i < accessoryList.length; i++, j++) {
        let div2 = `
        <a href="productpage.html?id=${j}">
          <div class="acc-card">
            <div class="img-sec">
            <img src="${accessoryList[i].preview}"
            </div>
            <div class="info-sec">
                <h1>${accessoryList[i].name}</h1>
                <p>${accessoryList[i].brand}</p>
                <h3>Rs ${accessoryList[i].price}</h3>
            </div>
          </div>
        </a>
    `;
        accessoryWrapper.innerHTML += div2;
      }

      // Get the heading DOM elements and add the heading text
      let heading1 = document.getElementById("heading1");
      let firstHeading = "Clothing for Men and Women";
      heading1.innerHTML += firstHeading;

      let heading2 = document.getElementById("heading2");
      let secondHeading = "Accessories for Men and Women";
      heading2.innerHTML += secondHeading;
    }
  );
});
