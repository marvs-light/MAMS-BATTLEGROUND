
const rentalPrices = {
    regular: {
        1: 20,
        2: 40,
        4: 75,
        8: 150,
        10: 180,
        20: 350
    },

    vip: {
        1: 50,
        2: 95,
        4: 160,
        8: 280,
        10: 300,
        20: 600
    }
};

const computerType = document.getElementById("computerType");
const rentalDuration = document.getElementById("rentalDuration");
const calculateRental = document.getElementById("calculateRental");
const rentalResult = document.getElementById("rentalResult");

calculateRental.addEventListener("click", function () {

    const selectedComputer = computerType.value;
    const selectedDuration = rentalDuration.value;

    const total = rentalPrices[selectedComputer][selectedDuration];

    const computerName =
        selectedComputer === "regular" ? "Regular PC" : "VIP PC";

    rentalResult.innerHTML =
        "<strong>Rental Summary</strong><br>" +
        "Computer: " + computerName + "<br>" +
        "Duration: " + selectedDuration + " hour(s)<br>" +
        "Total Payment: <strong>₱" + total.toFixed(2) + "</strong>";
});


let cart = [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartMessage = document.getElementById("cartMessage");
const clearCart = document.getElementById("clearCart");



function addToCart(name, price, image) {

    const existingProduct = cart.find(function (item) {
        return item.name === name;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    displayCart();

    cartMessage.textContent = name + " added to your cart!";
}


function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <tr>
                <td colspan="5" class="empty-cart">
                    Your cart is currently empty.
                </td>
            </tr>
        `;

    } else {

        cart.forEach(function (item, index) {

            const subtotal = item.price * item.quantity;

            total += subtotal;

            const row = document.createElement("tr");

            const productCell = document.createElement("td");
            productCell.textContent = item.name;

            const priceCell = document.createElement("td");
            priceCell.textContent = "₱" + item.price.toFixed(2);

            const quantityCell = document.createElement("td");

            const quantityControls = document.createElement("div");
            quantityControls.className = "quantity-control";

            const decreaseButton = document.createElement("button");
            decreaseButton.textContent = "-";
            decreaseButton.type = "button";
            decreaseButton.setAttribute("aria-label", "Decrease quantity");

            decreaseButton.addEventListener("click", function () {
                changeQuantity(index, -1);
            });

            const quantityText = document.createElement("span");
            quantityText.textContent = item.quantity;

            const increaseButton = document.createElement("button");
            increaseButton.textContent = "+";
            increaseButton.type = "button";
            increaseButton.setAttribute("aria-label", "Increase quantity");

            increaseButton.addEventListener("click", function () {
                changeQuantity(index, 1);
            });

            quantityControls.append(
                decreaseButton,
                quantityText,
                increaseButton
            );

            quantityCell.appendChild(quantityControls);

            const subtotalCell = document.createElement("td");
            subtotalCell.textContent = "₱" + subtotal.toFixed(2);

            const actionCell = document.createElement("td");

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.type = "button";
            removeButton.className = "remove-button";

            removeButton.addEventListener("click", function () {
                removeFromCart(index);
            });

            actionCell.appendChild(removeButton);

            row.append(
                productCell,
                priceCell,
                quantityCell,
                subtotalCell,
                actionCell
            );

            cartItems.appendChild(row);
        });
    }

    cartTotal.textContent = "₱" + total.toFixed(2);
}


// Change product quantity

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();
}



function removeFromCart(index) {

    const removedProduct = cart[index].name;

    cart.splice(index, 1);

    displayCart();

    cartMessage.textContent = removedProduct + " removed from your cart.";
}


clearCart.addEventListener("click", function () {

    cart = [];

    displayCart();

    cartMessage.textContent = "Your cart has been cleared.";
});



const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productRow = button.closest(".product-row");

        const name = productRow.dataset.name;
        const price = Number(productRow.dataset.price);
        const image = productRow.dataset.image;

        addToCart(name, price, image);
    });
});



const productModal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalAddToCart = document.getElementById("modalAddToCart");

let selectedProduct = null;



const detailButtons = document.querySelectorAll(".view-details");

detailButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productRow = button.closest(".product-row");

        const productName = productRow.dataset.name;
        const productPrice = Number(productRow.dataset.price);
        const productImage = productRow.dataset.image;

        const descriptionCell = productRow.cells[1];

        selectedProduct = {
            name: productName,
            price: productPrice,
            image: productImage
        };

        modalName.textContent = productName;
        modalImage.src = productImage;
        modalImage.alt = productName;

        modalDescription.innerHTML = descriptionCell.innerHTML;

        modalPrice.textContent =
            "Price: ₱" + productPrice.toFixed(2);

        productModal.classList.add("show");
        productModal.setAttribute("aria-hidden", "false");
    });
});



function hideProductModal() {

    productModal.classList.remove("show");
    productModal.setAttribute("aria-hidden", "true");
}

closeModal.addEventListener("click", hideProductModal);



productModal.addEventListener("click", function (event) {

    if (event.target === productModal) {
        hideProductModal();
    }
});




document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        hideProductModal();
    }
});


// Add selected product to cart from popup

modalAddToCart.addEventListener("click", function () {

    if (selectedProduct !== null) {

        addToCart(
            selectedProduct.name,
            selectedProduct.price,
            selectedProduct.image
        );

        hideProductModal();
    }
});


const revealSections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

           
            observer.unobserve(entry.target);
        }
    });

}, {
    threshold: 0.15
});

revealSections.forEach(function (section) {
    observer.observe(section);
});
