const xhr = new XMLHttpRequest();
url = "https://worldtimeapi.org/api/ip"
xhr.open("GET", url)

xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
        const result = JSON.parse(xhr.responseText);
        dT = result.datetime
        tZ = result.timezone
        utc = result.utc_offset
        ip = result.client_ip
        
       
        restulTz = tZ.split("/", 5)
        segundo(dT,  restulTz, utc,ip)
        
    }
}

xhr.send();

function segundo(dt, result,utc,ip) {
    var ano = parseInt(dt.substring(0, 4))
    var mes = dt.substring(5, 7)
    var dia = dt.substring(8, 10)

    var hora = dt.substring(11, 13)
    var minuto = dt.substring(14, 16)
    var segundo = dt.substring(17, 19)

    var data = new Date(ano, mes, dia, hora, minuto, segundo)


    setInterval(function () {
        var temp = data.getSeconds()
        data.setSeconds(temp + 1)
        var linha = document.getElementById("div")
        linha.innerHTML = `
        <div class="div"> 
        <h3>Seu ip é: ${ip}</h3>         
        <h3 class="h3">${result[result.length -1]}</h3>
        <p class="data">${data.getDate()}/${data.getMonth()}/${data.getFullYear()}</p>
        <p class="time">${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}</p>
        <p class="utc">${utc}</p>
        </div>
         `

    }, 1000)

}