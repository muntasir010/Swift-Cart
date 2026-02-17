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
    container.className =
      "flex flex-wrap justify-center items-center gap-3 mb-10";

    let categoryHTML = `<button onclick="loadProducts('all')" class="btn btn-primary p-3 rounded-xl capitalize">All Products</button>`;

    categories.forEach((cat) => {
      categoryHTML += `
        <button onclick="loadProducts('${cat}')" class="btn btn-primary p-3 rounded-xl capitalize">
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

  grid.innerHTML = '<div class="col-span-full text-center"></div>';

  try {
    let url = "https://fakestoreapi.com/products";
    if (category !== "all") {
      url = `https://fakestoreapi.com/products/category/${category}`;
    }

    const res = await fetch(url);
    let products = await res.json();

    if (limit) {
      products = products.slice(0, 3);
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
  <figure class="bg-gray-100">
    <img class="h-56  object-contain p-4"
      src=${product.image}
      alt="Shoes" />
  </figure>
  <div class="card-body">

    <h2 class="flex justify-between items-center">
      <span class="badge badge-primary">${product.category}</span> <span class="flex items-center"> <img src="/assest/icons8-rating-64.png" class="w-6 h-6 inline mr-1"/> ${product.rating.rate} (${product.rating.count})</span>
    </h2>
    <h2 class="card-title text-lg font-bold">
      ${product.title}
    </h2>
    <p class="text-sm font-bold text-gray-600">Price: $${product.price}</p>
    <div class="card-actions justify-between mt-4">
      <div class="btn btn-outline border-2 badge badge-outline" onclick="showDetails(${product.id})"><img src="/assest/icons8-eye-24.png" class="w-6 h-6 inline mr-1"/> Details</div>
      <div class="btn btn-primary badge badge-outline" onclick="addToCart(${product.id})"><img src="/assest/icons8-trolley-cart-32.png" class="w-6 h-6 inline mr-1"/> Add to Cart</div>
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

async function showDetails(id) {
  const modal = document.getElementById("product_modal");
  const content = document.getElementById("modal-content");

  content.innerHTML =
    '<div class="text-center py-10"><span class="loading loading-spinner loading-lg"></span></div>';
  modal.showModal();

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();

    content.innerHTML = `
            <div class="flex flex-col md:flex-row gap-6 p-2">
                <div class="md:w-1/2 bg-gray-50 rounded-xl p-4">
                    <img src="${data.image}" class="w-full h-64 object-contain" />
                </div>
                <div class="md:w-1/2">
                    <h2 class="text-2xl font-bold text-gray-800">${data.title}</h2>
                    <div class="flex items-center gap-2 my-2">
                        <span class="badge badge-secondary">${data.category}</span>
                        <span class="text-yellow-500 font-bold">⭐ ${data.rating.rate}</span>
                    </div>
                    <p class="text-gray-600 text-sm my-4">${data.description}</p>
                    <p class="text-3xl font-black text-indigo-600 mb-6">$${data.price}</p>
                    <button onclick="addToCart(${data.id})" class="btn btn-primary w-full">Add to Cart</button>
                </div>
            </div>
        `;
  } catch (err) {
    content.innerHTML = '<p class="text-red-500">Failed to load details.</p>';
  }
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
