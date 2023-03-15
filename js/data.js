let pag = 1;
let searcher = null
let tamanoConsulta = 0;

function getTable() { 
    let url = ''
    if (searcher){
        url = `http://10.15.20.15:4001/api/inventario/search/${searcher.column}/${searcher.value}?pag=${pag}`
    }else{
        url = `http://10.15.20.15:4001/api/inventario?pag=${pag}`
    }

    var requestOptions = {
        method: 'GET'
    };
      fetch(url, requestOptions)
        .then(response => response.json())
        .then((result)=>{  
        let tabla = document.getElementById('data-sheet')
        tabla.innerHTML = '' 
        result.forEach(element => {
            tabla.innerHTML += `<tr> <td>${element.Material}</td> <td>${element['Texto breve de material']}</td> <td>${element['Ce.']}</td> <td>${element.UMB}</td> 
            <td>${element['Libre utilización']}</td> </tr>`
        });
        // paginatorEnd.innerHTML = searcher ? ` / Numero de Resultados: ${result.length}` : '';
    },(error)=>{
        console.log(error)
    })
}

getTable();

function getTableCount() { 
    let url = ''
    if (searcher){
        url = `http://10.15.20.15:4001/api/inventario/search/${searcher.column}/${searcher.value}/count?pag=${pag}`
    }else{
        url = `http://10.15.20.15:4001/api/inventario/count?pag=${pag}`
    }

    var requestOptions = {
        method: 'GET'
    };

      fetch(url, requestOptions)
        .then(response => response.json())
        .then((result)=>{  
        console.log('result',result["count "]);
        const numPags = Math.round(result["count "]/5)
        paginatorEnd.innerHTML = ` de ${numPags}`;
    },(error)=>{
        console.log(error)
    })
}

getTableCount()

function nextAndPrevious(step) {
    if(step === -1 && pag === 1){
        return
    }
    if(step === 1) {
        pag += 1;
    }else{
        pag -= 1;
    }
    getTable();
    console.log('pag', pag)
    paginator.innerHTML = pag;
}

function search() {
    let searchInput = document.getElementById('search');
    let select = document.getElementById('select-search');
    pag = 1;
    if (searchInput.value) {
        searcher = {
            column: select.value, 
            value: searchInput.value.replaceAll("/", "%2F")
        }
    } else {
        searcher = null 
    }
    getTable();
    getTableCount()
}

/*Button con Enter*/

function submit(e) {
    if (e.code === 'Enter') {
        document.getElementById('submit').click();
    }
}

document.getElementById("submit").onclick = function() {
    search();
}