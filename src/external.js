document.addEventListener('DOMContentLoaded', () => {

  const navbarBurgers = document.querySelector('.navbar-burger');
  const navbarMenu = document.querySelector('.navbar-menu');
  const options = document.getElementsByClassName('navbar-item');

  function toggleActive() {
    navbarBurgers.classList.toggle('is-active');
    navbarMenu.classList.toggle('is-active');
  }

  navbarBurgers.addEventListener('click', () => {
    toggleActive();
  });

  for (let i=0; i < options.length; i++ ) {
    options[i].addEventListener('click', () => {
      toggleActive();

    });
  }


});
