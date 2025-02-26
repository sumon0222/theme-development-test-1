document.addEventListener("DOMContentLoaded", function () {
    const wishlistIcons = document.querySelectorAll(".wishlist-icon");
    
    function getWishlist() {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    }

    function saveWishlist(wishlist) {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    function updateWishlistUI() {
        const wishlist = getWishlist();
        wishlistIcons.forEach(icon => {
            const productId = icon.getAttribute("data-product-id");
            if (wishlist.includes(productId)) {
                icon.classList.add("active");
            } else {
                icon.classList.remove("active");
            }
        });

        // Update Wishlist Counter
        const wishlistCounter = document.querySelector(".wishlist-counter");
        if (wishlistCounter) {
            wishlistCounter.textContent = wishlist.length;
        }
    }

    function toggleWishlist(productId) {
        let wishlist = getWishlist();

        if (wishlist.includes(productId)) {
            wishlist = wishlist.filter(id => id !== productId);
        } else {
            wishlist.push(productId);
        }

        saveWishlist(wishlist);
        updateWishlistUI();
        updateShopifyWishlist(wishlist);
    }

    async function updateShopifyWishlist(wishlist) {
        try {
            await fetch("/account", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer: {
                        metafields: [
                            {
                                namespace: "custom",
                                key: "wishlist",
                                value: JSON.stringify(wishlist),
                                type: "json"
                            }
                        ]
                    }
                })
            });
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    }

    wishlistIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            const productId = this.getAttribute("data-product-id");
            toggleWishlist(productId);
        });
    });

    updateWishlistUI();
});
