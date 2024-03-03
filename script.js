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
                temp: convertKelvinToCelsius(json.main.temp), 
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
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
    document.querySelector('.tempInfo').innerHTML = `${json.temp.toFixed(2)} <sup>ºC</sup>`; // Arredondar para duas casas decimais
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

function convertKelvinToCelsius(tempKelvin) {
    return tempKelvin - 273.15; 
}
