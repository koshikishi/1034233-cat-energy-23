'use strict';

// Оживляет мобильное меню
const navMain = document.querySelector(`.main-nav`);
const navToggle = navMain.querySelector(`.main-nav__toggle`);

navMain.classList.remove(`main-nav--nojs`);

navToggle.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  navMain.classList.toggle(`main-nav--closed`);
  navMain.classList.toggle(`main-nav--opened`);
});

// Оживляет слайдер живого примера
const slider = document.querySelector(`.slider`);

if (slider) {
  const sliderList = slider.querySelector(`.slider__list`);
  const sliderButtonBefore = slider.querySelector(`.slider__button--before`);
  const sliderButtonAfter = slider.querySelector(`.slider__button--after`);
  const sliderToggle = slider.querySelector(`.slider__toggle`);
  const sliderRange = slider.querySelector(`.slider__range`);

  const SLIDER_RANGE_MIN = 0;
  const SLIDER_RANGE_MAX = 100;

  slider.classList.remove(`slider--nojs`);

  sliderButtonBefore.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    toggleSlider(false);
  });

  sliderButtonAfter.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    toggleSlider(true);
  });

  sliderToggle.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (sliderToggle.classList.contains(`slider__toggle--after`)) {
      toggleSlider(false);
    } else {
      toggleSlider(true);
    }
  });

  sliderRange.addEventListener(`input`, (evt) => {
    evt.preventDefault();

    rangeSlider(sliderRange.value);

    if (+sliderRange.value === SLIDER_RANGE_MAX && sliderToggle.classList.contains(`slider__toggle--after`)) {
      sliderToggle.classList.replace(`slider__toggle--after`, `slider__toggle--before`);
    }

    if (+sliderRange.value === SLIDER_RANGE_MIN && sliderToggle.classList.contains(`slider__toggle--before`)) {
      sliderToggle.classList.replace(`slider__toggle--before`, `slider__toggle--after`);
    }
  });

  // Изменяет пропорции изображений "до"/"после" в соответствии с переданным значением
  function rangeSlider(value) {
    sliderList.style.gridTemplateColumns = `${value}% ${SLIDER_RANGE_MAX - value}%`;
  }

  // Переключает слайдер "до" или "после"
  function toggleSlider(state) {
    sliderRange.value = state ? SLIDER_RANGE_MIN : SLIDER_RANGE_MAX;
    rangeSlider(sliderRange.value);

    if (state) {
      sliderToggle.classList.replace(`slider__toggle--before`, `slider__toggle--after`);
    } else {
      sliderToggle.classList.replace(`slider__toggle--after`, `slider__toggle--before`);
    }
  }
}

// Инициализирует интерактивную карту
function initMap() {
  const mapCoordinates = {
    mobile: {
      lat: 59.939002,
      lng: 30.322329
    },
    tablet: {
      lat: 59.939802,
      lng: 30.322279
    },
    desktop: {
      lat: 59.939102,
      lng: 30.317329
    }
  };
  const zoom = {
    mobile: 14,
    tablet: 15,
    desktop: 16
  };

  const map = new google.maps.Map(document.querySelector(`.contacts__map`), {
    zoom: zoom[getCurrentViewportSizeType()],
    center: mapCoordinates[getCurrentViewportSizeType()],
    disableDefaultUI: true
  });

  const markerCoordinates = {
    lat: 59.938702,
    lng: 30.322629
  };
  const icon = {
    mobile: `img/map-marker-mobile.png`,
    tablet: `img/map-marker-desktop.png`,
    desktop: `img/map-marker-desktop.png`,
  };

  const marker = new google.maps.Marker({
    position: markerCoordinates,
    map,
    icon: icon[getCurrentViewportSizeType()]
  });

  let currentViewportSizeType = getCurrentViewportSizeType();

  window.addEventListener(`resize`, () => {
    if (currentViewportSizeType !== getCurrentViewportSizeType()) {
      currentViewportSizeType = getCurrentViewportSizeType();

      map.setZoom(zoom[getCurrentViewportSizeType()]);
      map.setCenter(mapCoordinates[getCurrentViewportSizeType()]);
      marker.setIcon(icon[getCurrentViewportSizeType()]);
    }
  });

  // Определяет тип устройства по размеру вьюпорта
  function getCurrentViewportSizeType() {
    if (window.matchMedia(`(min-width: 1400px)`).matches) {
      return `desktop`;
    } else if (window.matchMedia(`(min-width: 768px)`).matches) {
      return `tablet`;
    } else {
      return `mobile`;
    }
  };
}

// Делает проверку полей ввода формы
const form = document.querySelector(`.form`);

if (form) {
  const formRequiredInputs = form.querySelectorAll(`.form__input[required]`);

  for (let input of formRequiredInputs) {
    input.addEventListener(`change`, (evt) => {
      evt.preventDefault();

      if (input.value) {
        input.parentElement.classList.remove(`form__field--invalid`);
      } else {
        input.parentElement.classList.add(`form__field--invalid`);
      }
    });
  }

  const formSubmitButton = form.querySelector(`.button--form`);

  formSubmitButton.addEventListener(`click`, (evt) => {
    for (let input of formRequiredInputs) {
      if (!input.value) {
        evt.preventDefault();

        input.parentElement.classList.add(`form__field--invalid`);
      }
    }
  });
}
