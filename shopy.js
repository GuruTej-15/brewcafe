const apiLink = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee';

document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.querySelector('.content');

  fetch(apiLink)
    .then(response => response.json())
    .then(data => {
      if (data && data.data) {
        contentDiv.innerHTML = ''; 

        data.data.forEach(item => {
          const isInCart = checkIfInCart(item.id);

          const coffeeItemHTML = `
            <div class="coffee-item">
              <a href="#" style="text-decoration: none; color: inherit;">
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>Price: ₹${item.price}</p>
                <button class="add-to-cart" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}" data-image="${item.image}">
                  ${isInCart ? 'Added' : 'Add to Cart'}
                </button>
              </a>
            </div>
          `;

          const coffeeItem = document.createElement('div');
          coffeeItem.innerHTML = coffeeItemHTML;
          contentDiv.appendChild(coffeeItem);

          const addToCartButton = coffeeItem.querySelector('.add-to-cart');
          addToCartButton.addEventListener('click', (event) => {
            event.preventDefault();
            const item = {
              id: addToCartButton.getAttribute('data-id'),
              title: addToCartButton.getAttribute('data-title'),
              price: addToCartButton.getAttribute('data-price'),
              image: addToCartButton.getAttribute('data-image')
            };
            if (!checkIfInCart(item.id)) {
              addToCart(item);
              addToCartButton.textContent = 'Added';
            } else {
              alert('Item is already in the cart.');
            }
          });
        });
      } else {
        contentDiv.innerHTML = '<p>No coffee items found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching coffee data:', error);
      contentDiv.innerHTML = '<p>Error loading coffee items.</p>';
    });
});


function checkIfInCart(itemId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart.some(cartItem => cartItem.id === itemId);
}


function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
}