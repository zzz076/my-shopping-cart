// import "./css/all.css";

const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const cartLeave = document.querySelector(".cart-leave");
const cartBuy = document.querySelector(".cart-buy");
const addCartBtns = document.querySelectorAll(".add-cart");
// 點擊購物車以切換視窗
cartIcon.onclick = () => {
  cart.classList.toggle("active");
};
// 點擊右上X以關閉視窗
cartLeave.onclick = () => {
  cart.classList.remove("active");
};
// 再載入途中註冊事件
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const addCartBtns = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCartBtns.length; i++) {
    const addCartBtn = addCartBtns[i];
    addCartBtn.addEventListener("click", addCartClick);
  }

  //   更新物品數量同步更新價格
  const quantityInputs = document.getElementsByClassName("cart-item-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", updateQuantity);
  }
  //   註冊每一個垃圾桶按鈕
  const tarshCans = document.getElementsByClassName("cart-box-delete");
  for (let i = 0; i < tarshCans.length; i++) {
    let tarshCan = tarshCans[i];
    tarshCan.addEventListener("click", deleteCartItem);
  }
  // 點擊購物車購買按鈕以彈出結帳視窗並清空購物車、金額
  cartBuy.addEventListener("click", clickBuyBtn);
  // 註冊fliter按鈕
  const tagBtns = document.getElementsByClassName('tag-btn')
  for (let i = 0; i < tagBtns.length; i++) {
    let tagBtn = tagBtns[i]
    tagBtn.addEventListener('click', clickTagBtn)
  }
  // 註冊cartContent
  // const cartContent =document.querySelector('.cart-content')
  // cartContent.addEventListener('resize', slider)
}

// 購物車的部分
// 更新物品數量的Value
function updateQuantity(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartAmount();
}

function clickBuyBtn() {
  alert("已將您的結帳請求送出");
  //   清空購物車裡的所有東西
  const cartContent = document.querySelector(".cart-content");
  cartContent.innerHTML = "";
  // 更新總金額
  updateCartAmount();
}
// 點擊購物車垃圾桶按鈕以清除該項cart-box

function deleteCartItem(event) {
  event.target.parentElement.remove();
  updateCartAmount();
}

// 更新所有購物車商品金額

// 更新購物車下方的總金額
function updateCartAmount() {
  const cartContent = document.getElementsByClassName("cart-content")[0];
  const cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;

  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    const Eachprice = cartBox.getElementsByClassName("cart-price")[0];
    const Eachquantity =
      cartBox.getElementsByClassName("cart-item-quantity")[0];
    const price = parseFloat(Eachprice.innerText.replace("$", ""));
    const quantity = Eachquantity.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

// Shop的部分

function addCartClick(event) {
  const productBox = event.target.parentElement;
  const productTitle = productBox.querySelector(".product-title").innerHTML;
  const productImg = productBox
    .querySelector(".product-img")
    .getAttribute("src");
  const productTag = productBox.querySelector(".tag").innerHTML;
  const productPrice = productBox.querySelector(".product-price").innerHTML;
  const gender = productTag == "男款" ? "men" : "women";
  console.log(gender);
  addProductToCart(productTitle, productImg, productTag, productPrice, gender);
  updateCartAmount();
}

// 把獲得的資訊放進購物車
function addProductToCart(
  productTitle,
  productImg,
  productTag,
  productPrice,
  gender
) {
  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  const cartContent = document.getElementsByClassName("cart-content")[0];
  const cartItemNames = cartContent.getElementsByClassName(
    "cart-describe-title"
  );
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == productTitle) {
      alert("此物品已在購物車");
      return;
    }
  }
  const cartBoxContent = ` 
                          <img
                          src="${productImg}"
                          alt=""
                          class="cart-img"
                          />
                          <div class="cart-describe">
                          <div class="cart-describe-title">${productTitle}</div>
                          <div class="cart-describe-tag">
                          <div class="tag ${gender}">${productTag}</div>
                          </div>
                          <div class="cart-price">${productPrice}</div>
                          <input type="number" value="1" class="cart-item-quantity" />
                          </div>
                          <i class="fa-solid fa-trash cart-box-delete"></i>`;

  cartBox.innerHTML = cartBoxContent;
  cartContent.append(cartBox);
  cartBox
    .getElementsByClassName("cart-box-delete")[0]
    .addEventListener("click", deleteCartItem);
  cartBox
    .getElementsByClassName("cart-item-quantity")[0]
    .addEventListener("change", updateQuantity);
}


// 註冊款式TAG按紐 並連結到fliter函式
const menCheckbox = document.getElementById("men-checkbox");
const womenCheckbox = document.getElementById("women-checkbox");
// menCheckbox.addEventListener("click", filterPrductBox);
// womenCheckbox.addEventListener("click", filterPrductBox);
// function filterPrductBox(event) {
//   // 點擊來源是男標籤true 女標籤 false

//   let sourceGender =
//     event.target == document.querySelector("#men-checkbox") ? true : false;
//   // 點擊來源男標籤
//   if (sourceGender) {
//     if (womenCheckbox.classList.contains("active")) {
//       console.log("123");
//     }
//     const productBoxes = document.getElementsByClassName("product-box");
//     event.target.classList.toggle("active");
//     for (let i = 0; i < productBoxes.length; i++) {
//       const productBox = productBoxes[i];
//       const gender = productBox.querySelector(".women");
//       if (gender) {
//         gender.parentElement.parentElement.classList.toggle("hide");
//       }
//     }
//   } // 點擊來源女標籤
//   if (!sourceGender) {
//     const productBoxes = document.getElementsByClassName("product-box");
//     event.target.classList.toggle("active");
//     for (let i = 0; i < productBoxes.length; i++) {
//       const productBox = productBoxes[i];
//       const gender = productBox.querySelector(".men");
//       if (gender) {
//         gender.parentElement.parentElement.classList.toggle("hide");
//       }
//     }
//   }
//   // const productMen = productBoxes.getElementsByClassName('men').parentElement
//   // console.log(productMen)
// }

// test
filterObjects("all");
// function filterObjects(c) {
//   var x, i;
//   console.log(c)
//   x = document.getElementsByClassName("product-box");
//   // console.log(x)
//   if (c == "all")c = "";
//   for ( i = 0; i < x.length; i++) {
//     removeClass(x[i], "show");
//     console.log(c);
//     console.log(x[i].className.indexOf('men-stuff'))
//     if (x[i].className.indexOf(c) > -1) 
//     addClass(x[i], "show");
    
//   }
// }
filterObjects("all");
function filterObjects(event) {
  let x = document.getElementsByClassName("product-box");
  if (event == "all") event = "";
  for (var i = 0; i < x.length; i++) {
    removeClass(x[i], "show");
    // console.log(x[i].className.indexOf(event));
    if (x[i].className.indexOf(event) > -1) {
      addClass(x[i], "show");
    }
  }
}
// function addClass(element, name) {
//   var i, arr1, arr2;
//   arr1 = element.className.split(" ");
//   arr2 = name.split(" ");
//   for ( i = 0; i < arr2.length; i++) {
//     if (arr1.indexOf(arr2[i]) == -1) {
//       element.className += " " + arr2[i];
//     }
//   }
// }

function addClass(element, name) {
  var arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (var i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// function removeClass(element, name) {
//   var i, arr1, arr2;
//   arr1 = element.className.split(" ");
//   arr2 = name.split(" ");
//   for ( i = 0; i < arr2.length; i++) {
//     while (arr1.indexOf(arr2[i]) > -1) {
//       console.log(arr2[i])
//       arr1.splice(arr1.indexOf(arr2[i]), 1);
//     }
//   }
//   element.className = arr1.join(" ");
// }

function removeClass(element, name) {
  var arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (var i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// 點TagBtn已切換
function clickTagBtn(event){
  const allTagBtn = document.querySelector('.all-tag-btn')
  const menTagBtn = document.querySelector('.men-tag-btn')
  const womenTagBtn = document.querySelector('.women-tag-btn')

  switch(event.target){
    case allTagBtn:
    event.target.classList.toggle('active')
    womenTagBtn.classList.remove('active')
    menTagBtn.classList.remove('active')
      break;
    case menTagBtn:
      event.target.classList.toggle('active')
      allTagBtn.classList.remove('active')
      womenTagBtn.classList.remove('active')
      break;
    case womenTagBtn:
      event.target.classList.toggle('active')
      allTagBtn.classList.remove('active')
      menTagBtn.classList.remove('active')
      break;
  }
}