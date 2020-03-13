document.addEventListener("DOMContentLoaded", function () {

    // Объявляем необходимые переменные
    let swipeArea = document.querySelector(".event-menu__area-close-event-menu");
    let containerMapButton = document.querySelector(".map__button-container");
    let eventMenuMap = document.querySelector(".event-menu");
    let itemMap = document.querySelector(".map__container-map-item");
    let mapMenuPositionTouchStart;
    let mapMenuPositionTouchEnd;
    let mapMenuResultSwipe;

    // Добавляем области свайпа в меню ивентов обработчик события касания пальца
    swipeArea.addEventListener("touchstart", mapMenuTouchStart, { passive: true });
    // Добавляем области свайпа в меню ивентов обработчик события отпускания пальца
    swipeArea.addEventListener("touchend", mapMenuTouchEnd, { passive: true });

    function mapMenuTouchStart(e) {
        // Считываем точку в которой пользователь коснулся экрана
        mapMenuPositionTouchStart = e.changedTouches[0].pageY;
    }

    function mapMenuTouchEnd(e) {
        // Считываем точку в которой пользователь отпустил палец
        mapMenuPositionTouchEnd = e.changedTouches[0].pageY;
        // Высчитываем разницу между точкой касания и точкой отпускания пальца
        mapMenuResultSwipe = mapMenuPositionTouchEnd - mapMenuPositionTouchStart;
        // Если результат больше 10, то произошёл свайп вниз
        if(mapMenuResultSwipe > 10) {
            // Добавляем класс для скрытия меню ивентов
            eventMenuMap.classList.add("event-menu--hide");
            // Когда меню скрыто, показываем кнопки на карте
            setTimeout(() => {
                itemMap.classList.remove("map__container-map-item--hide");
                containerMapButton.classList.remove("map__button-container--hide")
            }, 300);
        }
    }

});