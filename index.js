const xhr = new XMLHttpRequest();
url = "https://worldtimeapi.org/api/timezone"
xhr.open("GET", url)


xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
        const result = JSON.parse(xhr.responseText);

        var id1 = "div1"
        var id2 = "div2"
        var id3 = "div3"
        var id4 = "div4"
        var id5 = "div5"
        var id6 = "div6"
        var id7 = "div7"
        var id8 = "div8"
        var id9 = "div9"
        var id10 = "div10"
        var id11 = "div11"
        var id12 = "div12"

        for (i = 0; i < 12; i++) {
            rN = getRandomInt(0, 387)

            if (i == 0) {
                chamaRequest(result[rN], id1)
            }
            if (i == 1) {
                chamaRequest(result[rN], id2)
            }
            if (i == 2) {
                chamaRequest(result[rN], id3)
            }
            if (i == 3) {
                chamaRequest(result[rN], id4)
            }
            if (i == 4) {
                chamaRequest(result[rN], id5)
            }
            if (i == 5) {
                chamaRequest(result[rN], id6)
            }
            if (i == 6) {
                chamaRequest(result[rN], id7)
            }
            if (i == 7) {
                chamaRequest(result[rN], id8)
            }
            if (i == 8) {
                chamaRequest(result[rN], id9)
            }
            if (i == 9) {
                chamaRequest(result[rN], id10)
            }
            if (i == 10) {
                chamaRequest(result[rN], id11)
            }
            if (i == 11) {
                chamaRequest(result[rN], id12)
            }
        }

    }

}
xhr.send();


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function chamaRequest(restoUrl, id) {
    const xhr2 = new XMLHttpRequest();
    url2 = "https://worldtimeapi.org/api/timezone/" + restoUrl
    xhr2.open("GET", url2)


    xhr2.onreadystatechange = function () {
        if (xhr2.status == 200 && xhr2.readyState == 4) {
            const result2 = JSON.parse(xhr2.responseText);
            dT = result2.datetime
            tZ = result2.timezone
            utc = result2.utc_offset

            restulTz = tZ.split("/", 5)

            var linha = document.getElementById(id)
            segundo(dT, id, restulTz, utc)

  



        }
    }
    xhr2.send();
}

function segundo(dt, id, result,utc) {
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
        var linha = document.getElementById(id)
        linha.innerHTML = `
        <div class="div">          
        <h3 class="h3">${result[result.length -1]}</h3>
        <p class="data">${data.getDate()}/${data.getMonth()}/${data.getFullYear()}</p>
        <p class="time">${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}</p>
        <p class="utc">${utc}</p>
        </div>
         `

    }, 1000)

}