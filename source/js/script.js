'use strict';

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
  const sliderList = slider.querySelector(`.slider__list`);
  const sliderButtonBefore = slider.querySelector(`.slider__button--before`);
  const sliderButtonAfter = slider.querySelector(`.slider__button--after`);
  const sliderToggle = slider.querySelector(`.slider__toggle`);
  const sliderRange = slider.querySelector(`.slider__range`);

  slider.classList.remove(`slider--nojs`);

  sliderButtonBefore.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    toggleSlider(`before`);
  });

  sliderButtonAfter.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    toggleSlider(`after`);
  });

  sliderToggle.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (sliderToggle.classList.contains(`slider__toggle--after`)) {
      toggleSlider(`before`);
    } else {
      toggleSlider(`after`);
    }
  });

  sliderRange.addEventListener(`input`, (evt) => {
    evt.preventDefault();

    rangeSlider(sliderRange.value);

    if (+sliderRange.value === 100 && sliderToggle.classList.contains(`slider__toggle--after`)) {
      sliderToggle.classList.replace(`slider__toggle--after`, `slider__toggle--before`);
    }

    if (!+sliderRange.value && sliderToggle.classList.contains(`slider__toggle--before`)) {
      sliderToggle.classList.replace(`slider__toggle--before`, `slider__toggle--after`);
    }
  });

  // Изменяет пропорции изображений "до"/"после" в соответствии с переданным значением
  let rangeSlider = (value) => {
    sliderList.style.gridTemplateColumns = `${value}% ${100 - value}%`;
  };

  // Переключает слайдер "до" или "после"
  let toggleSlider = (state) => {
    sliderRange.value = (state === `before`) ? 100 : 0;
    rangeSlider(sliderRange.value);

    if (state === `before`) {
      sliderToggle.classList.replace(`slider__toggle--after`, `slider__toggle--before`);
    } else {
      sliderToggle.classList.replace(`slider__toggle--before`, `slider__toggle--after`);
    }
  };
}

// Инициализирует интерактивную карту
function initMap() {
  const mapCoordinates = {};

  if (window.matchMedia(`(min-width: 1330px)`).matches) {
    mapCoordinates.lat = 59.939102;
    mapCoordinates.lng = 30.317329;
  } else if (window.matchMedia(`(min-width: 768px)`).matches) {
    mapCoordinates.lat = 59.939802;
    mapCoordinates.lng = 30.322279;
  } else {
    mapCoordinates.lat = 59.939002;
    mapCoordinates.lng = 30.322329;
  }

  const map = new google.maps.Map(document.querySelector(`.contacts__map`), {
    zoom: window.matchMedia(`(min-width: 1330px)`).matches ? 16 : 15,
    center: mapCoordinates,
    disableDefaultUI: true
  });

  const markerCoordinates = {
    lat: 59.938702,
    lng: 30.322629
  };
  const icon = `img/map-marker.png`;

  const marker = new google.maps.Marker({
    position: markerCoordinates,
    map,
    icon
  });
}
