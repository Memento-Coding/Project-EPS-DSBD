$(document).ready(async function () {
    const formPagoAportes = document.getElementById('formPagoAportes');

   await get('https://api-borvo.fly.dev/api/v1/cotizantes/?limit=1000')
        .then(response => response.json())
        .then(data => data.results.forEach(async function (element) {
            await get('https://api-borvo.fly.dev/api/v1/afiliados/' + element.dni.substr(42, element.dni.length))
                .then(response => response.json())
                .then(data => {
                    formPagoAportes['cotizante'].innerHTML += `<option value="${element.id}">${data.nombre + " " + data.apellido}</option>`;
                })

        }));

    get('https://api-borvo.fly.dev/api/v1/empresas/?limit=1000')
        .then(response => response.json())
        .then(data => data.results.forEach(function (element) {
            formPagoAportes['empresa'].innerHTML += `<option value="${element.nit_rut}">${element.razon_social}</option>`;
            
        }));

    formPagoAportes.onsubmit = function(e){
        e.preventDefault();
        registrarPago(formPagoAportes['cotizante'].value,
        formPagoAportes['empresa'].value,
        formPagoAportes['fecha'].value,
        formPagoAportes['valor'].value)
    }

    async function registrarPago(cotizante, empresa, fecha, valor){
        data = {
            cotizante: 'http://api-borvo.fly.dev/api/v1/cotizantes/' + cotizante + '/',
            empresa: 'http://api-borvo.fly.dev/api/v1/empresas/' + empresa + '/',
            fecha: fecha,
            valor: valor
        }

        const response = await fetch('https://api-borvo.fly.dev/api/v1/pagos-aportes/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(data),
        }).catch(err => {
            swal("Error", "" + err, "warning");
        });
    
        if (response.ok) {
            swal("Éxito", "Se ha realizado un registro correctamente.", "success");
        } else {
            swal("Ops!", "No fue posible realizar el registro.", "error");
        }
    }

    class Excel{
        constructor(content){
            this.content = content;
        }
    
        header(){
            return this.content[0]
            }
            rows(){
                return new RowCollection(this.content.slice(1, this.content.length))
            }
    }
    
    class RowCollection{
        constructor(rows){
            this.rows = rows;
        }
    first(){
        return new Row(this.rows[0])
    }
    
    get(index){
        return  new Row(this.rows[index])
    }
    
    count(){
        return this.rows.length
    }
    }
    
    class Row{
        constructor(row){
            this.row = row
        }
        fecha(){
            return this.row[2]
    }
        valor(){
            return this.row[3]
    }
        id(){
            return this.row[0]
    }
        nit(){
            return this.row[1]
    }
    }
    
    const excelInput = document.getElementById('excel-input')
    
    excelInput.addEventListener('change', async function(){
        const content = await readXlsxFile(excelInput.files[0])    
        const excel = new Excel(content)
    
        for (let index = 0; index < excel.rows().count(); index++) {
            const row = excel.rows().get(index);
            registrarPago(row.id(), row.nit(),row.fecha(),row.valor());
                         
        }
    })
});