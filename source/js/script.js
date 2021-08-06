// Оживляет мобильное меню
const navMain = document.querySelector(`.main-nav`);
const navToggle = document.querySelector(`.main-nav__toggle`);

navMain.classList.remove(`main-nav--nojs`);

navToggle.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  if (navMain.classList.contains(`main-nav--closed`)) {
    navMain.classList.remove(`main-nav--closed`);
    navMain.classList.add(`main-nav--opened`);
  } else {
    navMain.classList.remove(`main-nav--opened`);
    navMain.classList.add(`main-nav--closed`);
  }
});
