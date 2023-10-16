// Сюда вводите свой api ключ

const apiKey = ""

/* Элементы на странице */

const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

// Слушаем отправку формы

form.onsubmit = function (e) {
    // Отменяем отправку формы
    e.preventDefault();

    // Берём значение из input, обрезаем пробелмы
    let city = input.value.trim();

    // Делаем запрос на сервер для получения погоды

    // Адрес запроса
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    // Выполняем запрос
    fetch(url)
        .then((Response) => {
            return Response.json()
        })
        .then((data) => {

            console.log(data);
            // Проверка на ошибку
            if (data.error) {
                // Если есть ошибка - выводится ошибка

                //Удаляем предыдущую карточку
                const prevCard = document.querySelector('.card');
                if (prevCard) prevCard.remove();

                // Отобразить карточку с ошибкой
                const html = `<div class="card">${data.error.message}</div>`;

                // Отображдаем карточку на странице
                header.insertAdjacentHTML('afterend', html);

            } else {
                // Если ошибки нет - выводим карточку

                // Отображаем полученные данные в карточке

                //Удаляем предыдущую карточку
                const prevCard = document.querySelector('.card');
                if (prevCard) prevCard.remove();

                // Разметка для карточки
                const html =
                    `<div class="card">

                    <h2  class="card-city">${data.location.name} <span>${data.location.country}</span> </h2>


                <div class="card-weather">
                    <div class="card-value">${data.current.temp_c}<sup>°c</sup> </div>
                    <img class="card_img" src="img/sun_cloud.jpg" alt="Weather">
                </div>


                <div class="card_description">${data.current.condition.text}</div>

                    </div>`

                // Отображдаем карточку на странице
                header.insertAdjacentHTML('afterend', html);
            }


        });
}