document.addEventListener("DOMContentLoaded", function() {
  // Function to get wishlist from localStorage
  function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  }

  // Function to update wishlist count
  function updateWishlistCount() {
    let wishlist = getWishlist();
    let wishlistCountElement = document.getElementById("wishlist-count");
    if (wishlistCountElement) {
      wishlistCountElement.textContent = wishlist.length;
    }
  }

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

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateWishlistCount();
    });

    // Initialize wishlist icon state
    const productId = icon.getAttribute("data-product-id");
    if (getWishlist().includes(productId)) {
      icon.classList.add("active");
    }
  });

  // Function to update the actual cart count from Shopify
  function updateCartCount() {
    fetch("/cart.js")
      .then(response => response.json())
      .then(cart => {
        let cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
          cartCountElement.textContent = cart.item_count;
        }
      })
      .catch(error => console.error("Error fetching cart:", error));
  }

  // Handle Add to Cart button click
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent page reload

      const productId = this.getAttribute("data-product-id");

      fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId, quantity: 1 }) // Send product ID
      })
      .then(response => response.json())
      .then(data => {
        console.log("Product added to cart:", data);
        
        // Change button style
        this.classList.add("added");
        this.textContent = "Added to Cart";

        // Update actual Shopify cart count
        updateCartCount();
        
        // Reset button text after a delay (optional)
        setTimeout(() => {
          this.textContent = "Add to Cart";
          this.classList.remove("added");
        }, 2000);
      })
      .catch(error => console.error("Error adding to cart:", error));
    });
  });

  // Initial cart and wishlist count update
  updateCartCount();
  updateWishlistCount();
});
