document.querySelector('.busca').addEventListener('submit', async (event)=>{
        event.preventDefault();

        let input = document.querySelector('#searchInput').value
        
        if (input !== '') {
            showWarning("Carregando...")

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=9c31ccf1b2f16a6e8baa8e773bcb5ae4&lang=pt-br`
        
        
        }
})

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
    
}