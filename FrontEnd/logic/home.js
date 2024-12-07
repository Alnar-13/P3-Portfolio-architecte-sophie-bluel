// ******************************* CALL GET API ALL WORKS ******************************* //
const token = localStorage.getItem("token");

const getApi = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

// ******************************* CALL GET API CATEGORIES ******************************* //

const getCategoriesApi = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("error");
  }
};

getApi().then((data) => {
  const allCategoriesButton = document.querySelector("#all-filter");
  allCategoriesButton.addEventListener("click", () => renderGallery(data));
  renderGallery(data);
});

getCategoriesApi().then((categories) => {
  const buttonsContainer = document.querySelector("#js-filter-box");

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerText = category.name;
    button.classList.add("button-filter");

    button.addEventListener("click", async () => {
      const getData = await getApi();
      const filteredData = getData.filter(
        (data) => data.categoryId === category.id
      );
      renderGallery(filteredData);
    });

    buttonsContainer.appendChild(button);
  });
});

// background button filter active //

getCategoriesApi().then(() => {
  const filterButtons = document.querySelectorAll(".button-filter");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((buttons) => {
        buttons.classList.remove("active");
      });
      button.classList.add("active");
    });
  });
});

const renderGallery = (items) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  items.forEach((item) => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("box");
    gallery.appendChild(galleryItem);
    galleryItem.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.title}" class="item__img">
         <h3 class="item__title">${item.title}</h3>
 `;
  });
};

// smooth scroll //

const linkPortfolio = document.querySelector("#js-projets-link");
const linkContact = document.querySelector("#js-contact-link");
const portfolioSection = document.querySelector("#portfolio");
const contactSection = document.querySelector("#contact");

linkPortfolio.addEventListener("click", (event) => {
  event.preventDefault();
  portfolioSection.scrollIntoView({
    behavior: "smooth",
  });
});

linkContact.addEventListener("click", (event) => {
  event.preventDefault();
  contactSection.scrollIntoView({
    behavior: "smooth",
  });
});
const isLogged = () => (token ? true : false);

const loginButtonUpdate = () => {
  const loginButton = document.querySelector("#js-login-button");
  if (isLogged()) {
    loginButton.href = "#";
    loginButton.innerText = "logout";
    loginButton.addEventListener("click", () => {
      logOut();
      loginButton.innerText = "login";
    });
  }
};

// update UI if admin mode activated //

const updateUI = () => {
  const filter = document.querySelector("#js-filter-box");
  const alignItems = document.querySelector("#introduction");
  const buttonEditGallery = document.querySelector("#js-button-edit-gallery");

  if (isLogged()) {
    filter.style.display = "none";
    alignItems.style.alignItems = "inherit";
    buttonEditGallery.style.display = "inline-flex";
  }
};
window.addEventListener("load", () => {
  loginButtonUpdate();
  updateUI();
});

loginButtonUpdate();