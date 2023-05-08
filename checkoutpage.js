let itemsInCart = localStorage;
let arr = [];
let cartValue = 0;
$(".cart-cnt").text(localStorage.getItem("cartItems"));

for (let i = 1; i <= 10; i++) {
  if (localStorage.getItem(i)) {
    arr.push(JSON.parse(localStorage.getItem(i)));
  }
}

let totalAmount = 0;
for (let i = 0; i < arr.length; i++) {
  totalAmount += arr[i].price * arr[i].inCart;
}

let finalAmount = document.createElement("div");
finalAmount.innerHTML = `
<div>
    <h1>Total Amount</h1>
    <p>Amount: Rs <span class="value">${totalAmount}</span></p>
    <a href="confirm.html"><button id="order-btn">Place Order</button></a>
</div>
`;

finalAmount.classList.add("final-Amount");
let rightChk = document.getElementById("right-chk");
rightChk.appendChild(finalAmount);

for (let i = 0; i < arr.length; i++) {
  document.getElementById("left-chk").innerHTML += `
    <div class="item-container">
        <div class="img-container">
            <img class="chk-img" src="${arr[i].preview}" alt="" />
        </div>
        <div class="right-container">
            <h3 class="product-name">${arr[i].name}</h3>
            <p class="product-number">x${arr[i].inCart}</p>
            <p class="product-price">Amount: Rs <span class="value">${arr[i].price}</span></p>
        </div>
    </div>
        `;
}
