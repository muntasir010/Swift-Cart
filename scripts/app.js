function loadSections() {
  const navbarDiv = document.getElementById("navbar");
  if (navbarDiv) {
    fetch("components/navbar.html")
      .then((response) => {
        if (response.ok) return response.text();
        throw new Error("Navbar file not found");
      })
      .then((data) => {
        navbarDiv.innerHTML = data;
      })
      .catch((error) => console.error(error));
  }

  const heroDiv = document.getElementById("hero");
  if (heroDiv) {
    fetch("components/hero.html")
      .then((response) => {
        if (response.ok) return response.text();
        throw new Error("Hero section file not found");
      })
      .then((data) => {
        heroDiv.innerHTML = data;
      })
      .catch((error) => console.error(error));
  }
}

window.onload = loadSections;