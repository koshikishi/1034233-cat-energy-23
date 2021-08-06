// Оживляет мобильное меню
const navMain = document.querySelector(`.main-nav`);
const navToggle = navMain.querySelector(`.main-nav__toggle`);

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

// Оживляет слайдер живого примера
const slider = document.querySelector(`.slider`);

if (slider) {
  const sliderItemBefore = slider.querySelector(`.slider__item--before`);
  const sliderItemAfter = slider.querySelector(`.slider__item--after`);
  const sliderButtonBefore = slider.querySelector(`.slider__button--before`);
  const sliderButtonAfter = slider.querySelector(`.slider__button--after`);
  const sliderToggle = slider.querySelector(`.slider__toggle`);
  const sliderRange = slider.querySelector(`.slider__range`);

  slider.classList.remove(`slider--nojs`);

  sliderButtonBefore.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (sliderItemAfter.classList.contains(`slider__item--shown`)) {
      toggleSliderToBefore();
    }

    if (+sliderRange.value !== 100) {
      sliderRange.value = 100;

      rangeSlider(sliderRange.value);
    }
  });

  sliderButtonAfter.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (sliderItemBefore.classList.contains(`slider__item--shown`)) {
      toggleSliderToAfter();
    }

    if (+sliderRange.value) {
      sliderRange.value = 0;

      rangeSlider(sliderRange.value);
    }
  });

  sliderToggle.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (sliderItemAfter.classList.contains(`slider__item--shown`)) {
      toggleSliderToBefore();
    } else {
      toggleSliderToAfter();
    }
  });

  sliderRange.addEventListener(`input`, (evt) => {
    evt.preventDefault();

    rangeSlider(sliderRange.value);

    if (+sliderRange.value === 100) {
      toggleSliderToBefore();
    }

    if (!+sliderRange.value) {
      toggleSliderToAfter();
    }
  });

  window.addEventListener(`resize`, () => {
    if (window.matchMedia(`(max-width: 767px)`).matches) {
      sliderItemBefore.style.removeProperty(`right`);
      sliderItemAfter.style.removeProperty(`left`);
    } else {
      rangeSlider(sliderRange.value);
    }
  });

  // Переключает слайдер на слайд "до"
  let toggleSliderToBefore = () => {
    sliderItemAfter.classList.remove(`slider__item--shown`);
    sliderItemBefore.classList.add(`slider__item--shown`);

    sliderToggle.classList.replace(`slider__toggle--after`, `slider__toggle--before`);
  };

  // Переключает слайдер на слайд "после"
  let toggleSliderToAfter = () => {
    sliderItemBefore.classList.remove(`slider__item--shown`);
    sliderItemAfter.classList.add(`slider__item--shown`);

    sliderToggle.classList.replace(`slider__toggle--before`, `slider__toggle--after`);
  };

  // Изменяет пропорции изображений "до"/"после" в соответствии с переданным значением
  let rangeSlider = (value) => {
    sliderItemBefore.style.right = `${100 - value}%`;
    sliderItemAfter.style.left = `${value}%`;
  };
}
