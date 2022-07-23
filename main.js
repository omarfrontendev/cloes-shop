const shopContainer = document.querySelector('.shop-content');
const cartContainer = document.querySelector('.cart-container');
const itemContainer = document.querySelector('.row-content');
const totalResult = document.querySelector('.result');
const imgItems = document.querySelectorAll('.img-item');


const itemsArray = [
    {
        id: 1,
        url: `./images/jeans1.jpg`,
        name: `Ripped Skinny Jeans`,
        price: `22.99`,
    },
    {
        id: 2,
        url: `./images/jeans2.jpg`,
        name: `Ripped Skinny Jeans`,
        price: `21.99`,
    },
    {
        id: 3,
        url: `./images/jeans3.jpg`,
        name: `Ripped Skinny Jeans`,
        price: `24.99`,
    },
    {
        id: 4,
        url: `./images/jeans4.jpg`,
        name: `Ripped Skinny Jeans`,
        price: `26.99`,
    },
    {
        id: 5,
        url: `./images/jeans2.jpg`,
        name: `Ripped Skinny Jeans`,
        price: `22.99`,
    },
    {
        id: 6,
        url: `./images/jeans1.jpg`,
        name: `Ripped Skinny Jeans`,
        price: `28.99`,
    },
    {
        id: 7,
        url: `./images/jeans4.jpg`,
        name: `Ripped Skinny Jeans`,
        price: `20.99`,
    },
    {
        id: 8,
        url: `./images/jeans3.jpg`,
        name: `Ripped Skinny Jeans`,
        price: `24.99`,
    }
];


window.addEventListener('DOMContentLoaded', getImgs);
cartContainer.addEventListener('input', updatePriceItem);
cartContainer.addEventListener('click', deleteItem);
shopContainer.addEventListener('click', addToCart);
shopContainer.addEventListener('click', bidImg);

function bidImg(e) {
    const item = e.target;
    if (item.classList.contains('img-item')) {
        const img = item.querySelector('img');
        console.log(img)
        const overlay = document.createElement('div');
        overlay.classList.add("overlay");
        const divImg = document.createElement('div');
        divImg.classList.add('div-img')
        const myImg = document.createElement('img');
        myImg.setAttribute('src', `${img.src}`);
        const close = document.createElement('div')
        close.classList.add('close');
        close.innerHTML = '<i class="fas fa-times-circle"></i';
        divImg.appendChild(myImg);
        overlay.appendChild(close);
        overlay.appendChild(divImg);
        document.body.appendChild(overlay)

        close.addEventListener('click',()=> {
            overlay.remove();
        })
    }
}



function getImgs() {
    const itemsCard = itemsArray.map(item => {
        return `<div class="content-box" id = "${item.id}">
                <div class="img-item">
                    <img src="${item.url}"  class= "my-img">
                </div>
                <p class="name-item">${item.name}</p>
                <div class="price-item">
                    <p>$${item.price}</p>
                    <button class="cart-btn">add to cart</button>
                </div>
            </div>`
    })
    shopContainer.innerHTML = itemsCard.join('');
    const addToCartBtns = shopContainer.querySelectorAll('.cart-btn')

};


function addToCart(e) {
    const element = e.target;
    if (element.classList.contains('cart-btn')) {
        element.classList.toggle('active');
        const price = element.previousElementSibling;
        const parent = element.parentElement.parentElement;
        const img = parent.querySelector('.my-img');
        const name = parent.querySelector('.name-item');
        // console.log(parent.id)
        if (!cartContainer.classList.contains('show')) {
            cartContainer.classList.add('show');
        };
        itemContainer.innerHTML += `<div class="item" data-id = "${parent.id}">
                        <div class="item-img">
                            <img src="${img.src}">
                            <p>${name.textContent}</p>
                        </div>
                        <div class="price">
                            <p>${price.textContent}</p>
                        </div>
                        <div class="total-price">
                            <p>${price.textContent}</p>
                        </div>
                        <div class="quantity">
                            <input type="number" class="quant-input">
                            <i class="fas fa-trash-alt"></i>
                        </div>
                    </div>`
        const items = itemContainer.querySelectorAll('.item');
        const totalPriceItem = itemContainer.querySelectorAll('.total-price p');
        updateTotalPrice()
    }
}

function updateTotalPrice() {
    const totalPriceItem = itemContainer.querySelectorAll('.total-price p')
    const numsArray = [];
    totalPriceItem.forEach(priceItem => {
        numsArray.push(Math.round(priceItem.textContent.replace("$", "") * 100) / 100);
        let sum = numsArray.reduce((a, b) => {
            return a + b;
        }, 0);
        totalResult.innerHTML = "$" + Math.round(sum * 100) / 100;
    });

}

function updatePriceItem(e) {
    const item = e.target;
    if (e.target.classList.contains('quant-input')) {
        if (item.value <= 0) {
            console.log('not available')
        } else {
            const parent = item.parentElement.parentElement;
            const priceInner = parent.querySelector('.total-price p');
            const priceItem = parent.querySelector('.price p').textContent.replace('$', "");
            priceInner.textContent = "$" + Math.round(item.value * priceItem * 100) / 100;
            // totalPriceItems();
            updateTotalPrice()
        };
        
        
    };
};

function deleteItem(e) {
    const item = e.target;
    if (item.classList.contains('fa-trash-alt')) {
        const parent = item.parentElement.parentElement;
        parent.remove();
        const childrenShop = shopContainer.querySelectorAll('.content-box');
        childrenShop.forEach(child => {
            const btn = child.querySelector('.cart-btn')
            if (child.id == parent.dataset.id) {
                btn.classList.remove('active');
            }
        })
        if (itemContainer.childElementCount == 0) {
            cartContainer.classList.remove('show');
        };
        updateTotalPrice();
    }
}