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

  } catch (error) {
    console.error("Loading Error:", error);
  }
}

function setupMobileMenu() {
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.onclick = () => {
      mobileMenu.classList.toggle('hidden');
    };
  }
}

window.onload = loadSections;