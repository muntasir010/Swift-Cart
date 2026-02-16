function includeHTML() {
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
}

window.onload = includeHTML;
