document.addEventListener('DOMContentLoaded', () => {

  const navbarBurgers = document.querySelector('.navbar-burger');
  const navbarMenu = document.querySelector('.navbar-menu');

  navbarBurgers.addEventListener('click', () => {
    navbarBurgers.classList.toggle('is-active');
    navbarMenu.classList.toggle('is-active');
  });

});
