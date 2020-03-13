document.addEventListener("DOMContentLoaded", function () {

    // Инициализируем слайдер
	let glider = new Glider(document.querySelector('#glider'), {
		slidesToShow: 1.05,
		// slidesToShow: 1.1,
		slidesToScroll: 1.05,
		// slidesToScroll: 1.13,
		dots: '#paginationSlider',
	});

	// Добавляем слайдеру обработчик события касания пальца
	glider.ele.addEventListener("touchstart", gliderTouchStart, { passive: true });
	// Добавляем слайдеру обработчик события отпускания пальца
	glider.ele.addEventListener("touchend", gliderTouchEnd, { passive: true });

	// Объявляем необходимые переменные
	let gliderPositionTouchStart;
	let gliderPositionTouchEnd;
	let gliderResultSwipe;
	let counterSlide = 0;

	function gliderTouchStart(e) {
		// Считываем точку в которой пользователь коснулся экрана
		gliderPositionTouchStart = e.changedTouches[0].pageX;
	}
	
	function gliderTouchEnd(e) {
		// Считываем точку в которой пользователь отпустил палец
		gliderPositionTouchEnd = e.changedTouches[0].pageX;
		// Высчитываем разницу между точкой касания и точкой отпускания пальца
		gliderResultSwipe = gliderPositionTouchEnd - gliderPositionTouchStart;
		// Если результат меньше -100, то произошёл свайп влево
		if(gliderResultSwipe < -100) {
			// Если счётчик меньше чем количество слайдов, то переключаем на следующий слайд и добавляем к счётчику 1
			if(counterSlide < glider.slides.length-1) {
				glider.scrollItem(glider.slide+1);
				counterSlide++;
			// Если нет, то переключаемся на первый слайд и обнуляем счётчик
			} else {
				glider.scrollItem(0);
				counterSlide = 0;
			}
		// Если результат больше 100, то произошёл свайп вправо
		} else if(gliderResultSwipe > 100) {
			// Если счётчик больше 0, то переключаем на предыдущий слайд и отнимаем от счётчика 1
			if(counterSlide > 0) {
				glider.scrollItem(glider.slide-1);
				counterSlide--;
			// Если нет, то переключаемся на последний слайд и присваиваем счётчику значение равное колличеству слайдов
			} else {
				glider.scrollItem(glider.slides.length-1);
				counterSlide = glider.slides.length-1;
			}
		}
    }
    
});