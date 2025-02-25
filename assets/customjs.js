
//cart and wishlist count 

document.addEventListener("DOMContentLoaded", function() {
  // Function to get wishlist from localStorage
  function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  }

  // Function to get cart from localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  // Function to update cart count
  function updateCartCount() {
    let cart = getCart();
    document.getElementById("cart-count").textContent = cart.length;
  }

  // Function to update wishlist count
  function updateWishlistCount() {
    let wishlist = getWishlist();
    document.getElementById("wishlist-count").textContent = wishlist.length;
  }

  // Handle Add to Cart button click
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", function() {
      const productId = this.getAttribute("data-product-id");
      let cart = getCart();

      if (cart.includes(productId)) {
        // Remove product from cart
        cart = cart.filter(id => id !== productId);
        this.classList.remove("added");
        this.textContent = "Add to Cart";
      } else {
        // Add product to cart
        cart.push(productId);
        this.classList.add("added");
        this.textContent = "Added to Cart";
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
    });

    // Initialize button state
    const productId = button.getAttribute("data-product-id");
    let cart = getCart();
    if (cart.includes(productId)) {
      button.classList.add("added");
      button.textContent = "Added to Cart";
    }
  });

  // Handle Wishlist icon click
  document.querySelectorAll(".wishlist-icon").forEach(icon => {
    icon.addEventListener("click", function() {
      const productId = this.getAttribute("data-product-id");
      let wishlist = getWishlist();

      if (wishlist.includes(productId)) {
        // Remove product from wishlist
        wishlist = wishlist.filter(id => id !== productId);
        this.classList.remove("active");
      } else {
        // Add product to wishlist
        wishlist.push(productId);
        this.classList.add("active");
      }

      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      updateWishlistCount();
    });

    // Initialize icon state
    const productId = icon.getAttribute("data-product-id");
    let wishlist = getWishlist();
    if (wishlist.includes(productId)) {
      icon.classList.add("active");
    }
  });

  // Initial cart and wishlist count update
  updateCartCount();
  updateWishlistCount();
});