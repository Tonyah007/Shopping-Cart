    let carts = document.querySelectorAll('.add-cart');
    
    let products = [
    {
        name: "Friends Boku hoodie",
        tag: "Friends-Boku-hoodie",
        price: 250,
        inCart: 0
    },
    {
        name: "Anime custom air jordan 13 sneakers",
        tag: "Anime-custom-air-jordan-13-sneakers",
        price: 400,
        inCart: 0
    },
    {
        name: "Naruto Hightops sneakers",
        tag: "Naruto-Hightops",
        price: 300,
        inCart: 0
    },
    {
        name: "Naruto hokage hoodie",
        tag: "Naruto-hokage-hoodie",
        price: 200,
        inCart: 0
        }
    ];

    for (let i=0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i]);
            totalCost(products[i]);
        })
    }
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}


    function cartNumbers(product) {
        let productNumbers = localStorage.getItem('cartNumbers');
        
// To convert the productNumbers from a string to a number, we use the parseInt function

        productNumbers = parseInt(productNumbers);
        if( productNumbers ) {
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('.cart span').textContent = productNumbers + 1;
        } else {
            localStorage.setItem('cartNumbers', 1);
            document.querySelector('.cart span').textContent = 1;
        }
        setItems(product);
        
    }
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify (cartItems));
    console.log("My cartItems are", cartItems);
}

function totalCost(product) {
    

    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

    // Whenever we get data from the local storage, it comes as a string so most times we have to change it using the parse function

}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    
    console.log(cartItems);
    if ( cartItems && productContainer ) {
            productContainer.innerHTML = '';
            Object.values(cartItems).map(item => {
                productContainer.innerHTML += `
                <div class="products">
                    <i class="fa-solid fa-circle-xmark"></i>
                    <image src="/images/${item.tag}.jpg">
                    <span>${item.name}</span>
                </div>
                <div class="price">$${item.price}</div>
                <div class="quantity">
                    <i class="fa-sharp fa-solid fa-circle-arrow-left"></i>
                    <span>${item.inCart}</span>
                    <i class="fa-sharp fa-solid fa-circle-arrow-right"></i>
                </div>
                <div class="total">
                    ${item.inCart * item.price}
                </div>
                `;
            });

            productContainer.innerHTML += `
                <div class="total-container">
                    <h4 class="total-title">
                        Grand Total
                    </h4>
                    <h4 class="grand-total">
                        $${cartCost}
                    </h4>
                </div>
            `;
    }}


onLoadCartNumbers();
displayCart();