window.onload = function () {
  let user = document.getElementsByClassName("user")[0].innerText.slice(14);
  console.log(user);
  window.localStorage.setItem("user", user);
};

const goToContactPage = () => {
  window.location.assign("/pages/contact.html");
};

const goToAboutPage = () => {
  window.location.assign("/pages/about.html");
};
