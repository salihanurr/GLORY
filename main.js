const products = [

  {
    id: 1,
    title: "Saten Fular",
    price: 1500,
    image: "images/2.png"
  },
  {
    id: 2,
    title: "Blazer Ceket ve Etek Takım",
    price: 1500,
    image:"images/3.png"
  },
  {
    id: 3,
    title: "Pırlanta Minimal Yüzük",
    price: 1500,
    image:"images/4.png"
  },
  {
    id: 4,
    title: "Krem Kedi Göz Güneş Gözlüğü",
    price: 1500,
    image:"images/5.png"
  },
  {
    id: 5,
    title: "Zarif İnci Kolye ve Küpe Takım",
    price: 1500,
    image:"images/6.png"
  },
  {
    id: 6,
    title: "Fitilli Esnek Örme Alt Üst Takım",
    price: 1500,
    image:"images/7.png"
  },
  {
    id: 7,
    title: "Bilekten Bağlamalı Favria Deri Babet",
    price: 1500,
    image:"images/8.png"
  },
  {
    id: 8,
    title: "Kaşmir Panço",
    price: 1500,
    image:"images/9.png"
  },
  {
    id: 9,
    title: "Bambu Örme Siyah Elbise",
    price: 1500,
    image:"images/10.png"
  },
  {
    id: 10,
    title: "Mavi Cam Tasarım Küpe",
    price: 1500,
    image:"images/11.png"
  },
  {
    id: 11,
    title: "Siyah Tasarım Trençkot",
    price: 1500,
    image:"images/12.png"
  },
  {
    id: 12,
    title: "Klasik Kısa Topuklu Stiletto",
    price: 1500,
    image:"images/13.png"
  },
  {
    id: 13,
    title: "Cepli Kaşe Kaban",
    price: 1500,
    image:"images/14.png"
  },
  {
    id: 14,
    title: "Beli Kuşaklı Blazer Ceket",
    price: 1500,
    image:"images/15.png"
  },
  {
    id: 15,
    title: "İnci Grisi Saten Gömlek",
    price: 1500,
    image:"images/16.png"
  },
  {
    id: 16,
    title: "Klasik Kapitone Çanta",
    price: 1500,
    image:"images/17.png"
  },
  {
    id: 17,
    title: "Beli Kemerli Çizgili Blazer Ceket",
    price: 1500,
    image:"images/18.png"
  },
  {
    id: 18,
    title: "Vintage Fransız Bere",
    price: 1500,
    image:"images/19.png"
  },
  {
    id: 19,
    title: "Zarif Retro Elbise",
    price: 1500,
    image:"images/20.png"
  },
  {
    id: 20,
    title: "Sakura Çiçeği Kolye ve Küpe Takım ",
    price: 1500,
    image:"images/21.png"
  },
  {
    id: 21,
    title: "Balon Kol Çiçek Baskılı Elbise ",
    price: 1500,
    image:"images/22.png"
  },
  {
    id: 22,
    title: "Ekru Deri Mokosen Ayakkabı ",
    price: 1500,
    image:"images/23.png"
  },
  {
    id: 23,
    title: "Camel Palazzo Pantolon ",
    price: 1500,
    image:"images/24.png"
  },
  {
    id: 24,
    title: "Havuç Kesim Klasik Pantolon ",
    price: 1500,
    image:"images/25.png"
  },
  {
    id: 25,
    title: "Keten Klasik Yelek ",
    price: 1500,
    image:"images/26.png"
  },
  {
    id: 26,
    title: "V Yaka Lorenzo Elbise ",
    price: 1500,
    image:"images/27.png"
  },
  {
    id: 27,
    title: "Klasik Kloş Midi Etek",
    price: 1500,
    image:"images/28.png"
  },
  {
    id: 28,
    title: "Vintage Balon Kol Bluz",
    price: 1500,
    image:"images/29.png"
  },


  
];

//Get the products list and elements
const productsList = document.getElementById("productList");
const cartItemsElement = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");

//Store Cart Items In Local Storage
let cart =JSON.parse(localStorage.getItem("cart")) || [];

//Render Products On Page
function renderProducts() {
    productsList.innerHTML = products
    .map(
      (product) => `
    <div class="product">
      <img src="${product.image}" alt="${product.title}" class="product-img">
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-price">${product.price.toFixed(2)}TL</p>
        <a class="add-to-cart" data-id="${product.id}">Sepete Ekle</a>
      </div>
    </div>
        `
    )
    .join("");
    //Add to Cart
    const addToCartButtons = document.getElementsByClassName("add-to-cart");
    for(let i = 0; i < addToCartButtons.length; i++){
        const addToCartButton = addToCartButtons[i];
        addToCartButton.addEventListener("click", addToCart);
   }
}

// Add to Cart
function addToCart(event){
    const productID = parseInt(event.target.dataset.id);
    const product = products.find((product) => product.id === productID );

    if(product) {
       // If product already in cart
       const exixtingItem =cart.find((item) => item.id === productID); 

       if(exixtingItem){
          exixtingItem.quantity++;
       }else{
        const cartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1,
        };
        cart.push(cartItem);
       }

       //Change Add to cart text to added
       event.target.textContent = "Sepete Eklendi";
       updateCartIcon();
       saveToLocalStorage();
       renderCartItems();
       calculateCartTotal();
      
       
    }
}

//Remove from cart
function removeFromCart(event){
    const productID = parseInt(event.target.dataset.id);
    cart = cart.filter((item)=> item.id !== productID);
    saveToLocalStorage();
    renderCartItems();
    calculateCartTotal();
    updateCartIcon();
}
//Quantity Change
function changeQuantity(event){
    const productID = parseInt(event.target.dataset.id);
    const quantity =parseInt(event.target.value);
    
    if(quantity > 0){
        const cartItem = cart.find((item) => item.id === productID);
        if(cartItem){
            cartItem.quantity = quantity;
            saveToLocalStorage();
            calculateCartTotal();
            updateCartIcon();

        }
    }

}

//SaveToLocalStorage
function saveToLocalStorage() {
   localStorage.setItem("cart",JSON.stringify(cart));
}

//Render Prodcuts On Cart Page
function renderCartItems(){
    cartItemsElement.innerHTML = cart
    .map(
          (item) =>`
        <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" />
        <div class="cart-item-info">
            <h2 class="cart-item-title">${item.title}</h2>
            <input 
             class ="cart-item-quantity" 
             type="number" 
             name="" 
             min="1" 
             value="${item.quantity}" 
             data-id="${item.id}"
            />
        </div>
        <h2 class="cart-item-price">${item.price}TL</h2>
        <button class="remove-from-cart" data-id="${item.id}">Sil</button>
    </div>
        `
    )
    .join("");
    //Remove from cart
    const removeButtons = document.getElementsByClassName("remove-from-cart");
    for(let i = 0; i < removeButtons.length; i++){
        const removeButton = removeButtons[i];
        removeButton.addEventListener("click", removeFromCart);
    }

   //Quantity Change
   const quantityInputs =document.querySelectorAll(".cart-item-quantity");
   quantityInputs.forEach((input) => {
      input.addEventListener("change", changeQuantity);
   })
}

// Claculate Total
function calculateCartTotal(){
    const total = cart.reduce((sum, item)=> sum+ item.price * item.quantity, 0);
    cartTotalElement.textContent = `Tutar: ${total.toFixed(2)}TL`
}

//Check if on kart page
if(window.location.pathname.includes("cart.html")){
  renderCartItems();
  calculateCartTotal();
}else{
  renderProducts();
}

// Cart Icon Quntity
const cartIcon = document.getElementById("cart-icon");

function updateCartIcon() {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity,0);
    cartIcon.setAttribute("data-quantity", totalQuantity);
}

updateCartIcon();

function updateCartIconOnCartChange(){
    updateCartIcon();
} 

window.addEventListener("storage",updateCartIconOnCartChange);

function updateCartIcon() {
    const totalQuantity = cart.reduce((sum, item) => sum+ item.quantity, 0);
    const cartIcon = document.getElementById("cart-icon");
    cartIcon.setAttribute("data-quantity", totalQuantity);
}

// Ürün detay sayfasını aç
function openProductDetailsPage(productId) {
  window.location.href = `product_details.html?id=${productId}`;
}


// Ürünlerin üzerine tıklama olayını dinle
function listenProductClick() {
  const productImages = document.querySelectorAll('.product-img');

  productImages.forEach(productImage => {
      productImage.addEventListener('click', (event) => {
          const productId = parseInt(event.target.closest('.product').querySelector('.add-to-cart').getAttribute('data-id'));
          openProductDetailsPage(productId);
      });
  });
}


// Sayfa yüklendiğinde ürün tıklama olayını başlat
document.addEventListener('DOMContentLoaded', () => {
  listenProductClick();
  

});

 renderProducts();
 listenProductClick();
  renderCartItems();
  calculateCartTotal();



