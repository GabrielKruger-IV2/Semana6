var listener = document.getElementById("selectContinente")
listener.addEventListener("change", function () {

    selectReg = document.getElementById("selectRegiao")
    selectReg.innerHTML = `<option value="" selected disabled>Carregando...</option>`

    const select = document.getElementById('selectContinente');
    const valueSelect = select.options[select.selectedIndex].value;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://worldtimeapi.org/api/timezone/${valueSelect}`)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            const result = JSON.parse(this.responseText);
            var objR = []

            for (var i = 0; i < result.length; i++) {
                var txtQ = quebraTexto(result[i])
                if (objR.includes(txtQ[1]) === false) {
                    objR.push(txtQ[1])
                }
            }
            selectReg.innerHTML = ``
            for (i = 0; i < objR.length; i++) {
                selectReg.innerHTML += "<option value=" + objR[i] + ">" + objR[i] + "</option>"
            }
        }
    }
    xhr.send()
})


function quebraTexto(obj) {
    var separa = obj.split("/")

    var tmz = separa[0]
    separa.shift();
    var regiaoSeparada = separa
    if (regiaoSeparada.length > 1) {
        regiaoSeparada = regiaoSeparada.join("/")
    } else {
        regiaoSeparada = regiaoSeparada[0]
        if (regiaoSeparada === undefined) {
            regiaoSeparada = tmz
        }
    }

    const reg = [tmz, regiaoSeparada]
    return reg

}

var listener = document.getElementById("selectRegiao")
listener.addEventListener("change", function () {

    const select1 = document.getElementById('selectContinente');
    const valueSelect1 = select1.options[select1.selectedIndex].value;

    const select2 = document.getElementById('selectRegiao');
    const valueSelect2 = select2.options[select2.selectedIndex].value;


    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", `https://worldtimeapi.org/api/timezone/${valueSelect1}/${valueSelect2}`)

    xhr2.onreadystatechange = function () {

        if (xhr2.readyState == 4 && xhr2.status == 200) {

            const result = JSON.parse(this.responseText);
            dT = result.datetime
            tZ = result.timezone
            utc = result.utc_offset

           var restulTz = tZ.split("/", 5)

           paraSec()
            segundo(dT,  restulTz, utc)
        }
    }
    xhr2.send()
})
var mytime

function segundo(dt, result,utc) {
    var ano = parseInt(dt.substring(0, 4))
    var mes = dt.substring(5, 7)
    var dia = dt.substring(8, 10)

    var hora = dt.substring(11, 13)
    var minuto = dt.substring(14, 16)
    var segundo = dt.substring(17, 19)

    var data = new Date(ano, mes, dia, hora, minuto, segundo)
    mytime = setInterval(function () {
      
        var temp = data.getSeconds()
        data.setSeconds(temp + 1)
        var linha = document.getElementById("div1")
        
        linha.innerHTML = `
        <div class="div" id="div">          
        <h3 class="h3">${result[result.length -1]}</h3>
        <p class="data">${data.getDate()}/${data.getMonth()}/${data.getFullYear()}</p>
        <p class="time">${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}</p>
        <p class="utc">${utc}</p>
        </div>
         `

    }, 1000)

}
function paraSec(){
    clearInterval(mytime)
}