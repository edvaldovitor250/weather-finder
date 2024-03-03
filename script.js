document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        showWarning("Carregando...");

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=9c31ccf1b2f16a6e8baa8e773bcb5ae4&lang=pt`;

        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200) {
            clearInfo();
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });

            document.querySelector('.temperatura').innerHTML = `${Math.round(json.main.temp)}°C`;
            document.querySelector('.humidade').innerHTML = `${Math.round(json.main.humidity)}%`;
            document.querySelector('.descricao').innerHTML = `${json.weather[0].description}`;
            document.querySelector('.imagem').src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
        } else {
            clearInfo();
            document.querySelector('.aviso').innerHTML = 'Ocorreu um erro, tente novamente mais tarde';
        }
    } else {
        clearInfo();
        document.querySelector('.aviso').innerHTML = 'Por favor, insira o nome da cidade.';
    }
});

function showInfo(json) {
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector(".temp img").setAttribute("src", `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}
