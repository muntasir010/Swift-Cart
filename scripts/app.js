async function loadSections() {
  try {
    const navRes = await fetch("components/navbar.html");
    const navData = await navRes.text();
    document.getElementById("navbar").innerHTML = navData;

    setupMobileMenu();

    const heroRes = await fetch("components/hero.html");
    document.getElementById("hero").innerHTML = await heroRes.text();

    const featRes = await fetch("components/features.html");
    document.getElementById("features").innerHTML = await featRes.text();

   const footerRes = await fetch("components/footer.html");
    if (footerRes.ok) {
        document.getElementById("footer").innerHTML = await footerRes.text();
    }
  } catch (error) {
    console.error("Loading Error:", error);
  }
}

function setupMobileMenu() {
  const menuBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.onclick = () => {
      mobileMenu.classList.toggle("hidden");
    };
  }
}

async function loadCategories() {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await res.json();
    const container = document.getElementById("category-container");

    let categoryHTML = `<button onclick="loadProducts('all')" class="btn btn-outline btn-primary rounded-full capitalize">All Products</button>`;

    categories.forEach((cat) => {
      categoryHTML += `
                <button onclick="loadProducts('${cat}')" class="btn btn-outline rounded-full capitalize">
                    ${cat}
                </button>
            `;
    });
    container.innerHTML = categoryHTML;
  } catch (err) {
    console.error("Category fetch error:", err);
  }
}

async function loadProducts(category = "all", limit = true) {
  const grid = document.getElementById("product-grid");
  const seeAllBtn = document.getElementById("see-all-container");

  grid.innerHTML =
    '<div class="col-span-full text-center"><span class="loading loading-spinner loading-lg"></span></div>';

  try {
    let url = "https://fakestoreapi.com/products";
    if (category !== "all") {
      url = `https://fakestoreapi.com/products/category/${category}`;
    }

    const res = await fetch(url);
    let products = await res.json();

    if (limit) {
      products = products.slice(0, 4);
      if (seeAllBtn) seeAllBtn.classList.remove("hidden");
    } else {
      if (seeAllBtn) seeAllBtn.classList.add("hidden");
    }

    grid.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card bg-base-100 shadow-sm border border-gray-100";
      card.innerHTML = `
                <div class="card bg-base-100 shadow-sm">
  <figure>
    <img class="h-56 object-contain p-4"
      src=${product.image}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title text-lg font-bold">
      ${product.title}
    </h2>
    <p class="text-sm font-bold text-gray-600">Price: $${product.price}</p>
    <div class="card-actions justify-end">
      <div class="badge badge-outline" onclick="showDetails(${product.id})">Details</div>
      <div class="badge badge-outline" onclick="addToCart(${product.id})">Add to Cart</div>
    </div>
  </div>
</div>
            `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

async function showDetails(id) {
  alert("Fetching details for Product ID: " + id + "\n(Modal)");
}

let count = 0;
function addToCart(id) {
  count++;
  document.getElementById("cart-count").innerText = count;
}

window.onload = async () => {
  await loadSections();
  loadCategories();
  loadProducts();
};
