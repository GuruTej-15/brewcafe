document.addEventListener("DOMContentLoaded", () => {
    const dataList = document.querySelector('.data-list');
    const priceAmount = document.getElementById('price-amount');
    const priceDiscount = document.getElementById('price-discount');
    const priceSubtotal = document.getElementById('price-subtotal');
    const itemNumber = document.getElementById('item-number');
  
    //load cart items from localStorage
    function loadCartItems() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      if (cart.length === 0) {
        dataList.innerHTML = '<p>Your cart is empty.</p>';
        updatePriceSummary(0, 0, 0);
        updateItemNumber(0);
        return;
      }
  
      dataList.innerHTML = ''; // Clear existing content
  
      let totalMRP = 0;
      let totalDiscount = 0;
      let subtotal = 0;
      let totalItems = 0;
  
      cart.forEach(item => {
        const itemHTML = `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>Price: ₹${item.price}</p>
            <p class="quantity">Quantity: ${item.quantity || 1}</p>
            <button class="plus-button">+</button>
            <button class="minus-button">-</button>
            <button class="delete-button">Delete</button>
          </div>
        `;
  
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = itemHTML;
        dataList.appendChild(itemDiv);
  
        const plusButton = itemDiv.querySelector('.plus-button');
        const minusButton = itemDiv.querySelector('.minus-button');
        const deleteButton = itemDiv.querySelector('.delete-button');
  
        plusButton.addEventListener('click', () => {
          item.quantity = (item.quantity || 1) + 1;
          updateCartItem(item);
          loadCartItems();
        });
  
        minusButton.addEventListener('click', () => {
          if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartItem(item);
            loadCartItems();
          }
        });
  
        deleteButton.addEventListener('click', () => {
          removeCartItem(item.id);
          loadCartItems();
        });
  
        totalMRP += item.price * (item.quantity || 1);
        subtotal += item.price * (item.quantity || 1); 
        totalItems += item.quantity || 1;
      });
  
      updatePriceSummary(totalMRP, totalDiscount, subtotal);
      updateItemNumber(totalItems);
    }
  
    //update cart item in localStorage
    function updateCartItem(updatedItem) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.map(item => item.id === updatedItem.id ? updatedItem : item);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    //remove cart item from localStorage
    function removeCartItem(itemId) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter(item => item.id !== itemId);
      if (cart.length === 0) {
        localStorage.removeItem('cart');
      } else {
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  
    //update price summary
    function updatePriceSummary(totalMRP, totalDiscount, subtotal) {
      priceAmount.textContent = totalMRP;
      priceDiscount.textContent = totalDiscount;
      priceSubtotal.textContent = subtotal;
    }
  
    // update item number
    function updateItemNumber(totalItems) {
      itemNumber.textContent = totalItems;
    }
  

    loadCartItems();
  });