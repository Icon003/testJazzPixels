document.addEventListener("DOMContentLoaded", function () {

    // Объявляем необходимые переменные
    let eventMapButton = document.querySelector("#buttonMapShowEvents");
    let containerMapButton = document.querySelector(".map__button-container");
    let eventMenuMap = document.querySelector(".event-menu");
    let itemMap = document.querySelector(".map__container-map-item");

    // Добавляем обработчик события клик, на кнопку открытия меню с ивентами
    eventMapButton.addEventListener("click", function() {
        // Скрываем кнопки
        containerMapButton.classList.add("map__button-container--hide");
        itemMap.classList.add("map__container-map-item--hide");
        // Когда кнопки скрыты, показываем меню ивентов
        setTimeout(() => {
            eventMenuMap.classList.remove("event-menu--hide");
        }, 300);
    });
    
});
