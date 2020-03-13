document.addEventListener("DOMContentLoaded", function () {
    
	// Объявляем необходимые переменные
	let itemPositionTouchStart;
	let itemPositionTouchEnd;
	let itemResultSwipe;
	let listItem = document.querySelectorAll(".feed-item");
	let buttonBookmark = document.querySelectorAll(".feed-item__bookmark-button");
	let additionalLabelContainer;
	let	iconNewEventContainer;

	// Добавляем обработчики касания и отпускания пальца, на элементы ленты
	for(let i = 0; i < listItem.length; i++ ) {
		listItem[i].addEventListener("touchstart", itemTouchStart, { passive: true });
		listItem[i].addEventListener("touchend", itemTouchEnd, { passive: true });
	}

	function itemTouchStart(e) {
		// Считываем точку в которой пользователь коснулся экрана
		itemPositionTouchStart = e.changedTouches[0].pageX;
	}

	function itemTouchEnd(e) {
		// Считываем точку в которой пользователь отпустил палец
		itemPositionTouchEnd = e.changedTouches[0].pageX;
		// Высчитываем разницу между точкой касания и точкой отпускания пальца
		itemResultSwipe = itemPositionTouchEnd - itemPositionTouchStart;
		// Если результат больше 100, то произошёл свайп вправо
		if(itemResultSwipe > 100) {
			// Добавляем классы элементам, для сдвига блока и показа кнопки добавления в закладки
			this.querySelector(".feed-item__content").classList.add('feed-item__content--swipe');
			this.querySelector(".feed-item__bookmark-button").classList.add('feed-item__bookmark-button--active');
		// Если результат меньше -100, то произошёл свайп влево
		} else if(itemResultSwipe < -100) {
			// Если кнопка имеет класс активной, то есть видна пользователю, то мы удаляем классы и возвращаем элемент к его стандартному виду
			if(this.querySelector(".feed-item__bookmark-button").classList.contains('feed-item__bookmark-button--active')) {
				this.querySelector(".feed-item__content").classList.remove('feed-item__content--swipe');
				this.querySelector(".feed-item__bookmark-button").classList.remove('feed-item__bookmark-button--active');
			}
		}
    }

    // Добавляем обработчик события клик, на кнопки добавления в закладки
	for(let i = 0; i < buttonBookmark.length; i++) {
		buttonBookmark[i].addEventListener("click", function() {
			// Находим контейнер с меткой избранного элемента у элемента на кнопку которого мы кликнули
			additionalLabelContainer = this.nextElementSibling.querySelector(".feed-item__additional-label-container");
			// Находим контейнер с иконкой нового элемента на кнопку которого мы кликнули
			iconNewEventContainer = this.nextElementSibling.querySelector(".feed-item__icon-new-event-container");
			// Удаляем классы и возвращаем элемент к его стандартному виду
			this.classList.remove('feed-item__bookmark-button--active');
			this.nextElementSibling.classList.remove('feed-item__content--swipe');
			// Если у элемента была активна иконка нового элемента, то скрываем её
			if(!iconNewEventContainer.classList.contains("feed-item__icon-new-event-container--hide")) {
				iconNewEventContainer.classList.add("feed-item__icon-new-event-container--hide");
			}
			// В зависимости от состояния метки избранного, удаляем или добавляем класс, тем самым добавляем или удаляем элемент из избранного
			additionalLabelContainer.classList.toggle("feed-item__additional-label-container--hide");
		});
    }
    
});