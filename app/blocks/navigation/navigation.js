document.addEventListener("DOMContentLoaded", function () {

    // Объявляем необходимые переменные
    let buttonNavigation = document.querySelectorAll(".navigation__button");
    let dataButtonNavigation;
    let activeButtonNavigation;
    let activeDataButtonNavigation;
    let classesToAdd = [];
    let classesToRemove = [];

    // Добавляем обработчик события клик, на кнопки навигации
    for(let i = 0; i < buttonNavigation.length; i++) {
        buttonNavigation[i].addEventListener("click", function() {
            // Находим активную кнопку в навигации
            activeButtonNavigation = document.querySelector(".navigation__button--active");
            // Считываем дата атрибут с именем кнопки
            activeDataButtonNavigation = activeButtonNavigation.getAttribute("data-name");
            // Заполняем массив классами которые необходимо удалить
            classesToRemove = [`navigation__button--active` , `navigation__button--${activeDataButtonNavigation}-active`];
            // Удаляем классы
            activeButtonNavigation.classList.remove(...classesToRemove);
            // Если у кнопки на которую кликнули нет активного класса
            if(!this.classList.contains("navigation__button--active")) {
                // Считываем дата атрибут с именем кнопки
                dataButtonNavigation = this.getAttribute("data-name");
                // Заполняем массив классами которые необходимо добавить
                classesToAdd = [`navigation__button--active`, `navigation__button--${dataButtonNavigation}-active`]
                // Добавляем классы
                this.classList.add(...classesToAdd);
                if(dataButtonNavigation == "events") {
                    document.location.href = "map.html";
                } else if (dataButtonNavigation == "feeds") {
                    document.location.href = "/";
                }
            }
        });
    }
    
});