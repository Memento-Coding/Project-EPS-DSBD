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
        return this.row[0]
}
    valor(){
        return this.row[1]
}
    dni(){
        return this.row[2]
}
    nit(){
        return this.row[3]
}
}
class ExcelPrinter{
    static print(tableId, excel){

        const table = document.getElementById(tableId) 
        excel.header().forEach(title=>{
            table.querySelector("thead>tr").innerHTML += `<td>${title}</td>`
        })

        for (let index = 0; index < excel.rows().count(); index++) {
            const row = excel.rows().get(index);
            table.querySelector('tbody').innerHTML +=  `
            <tr>
            <td>${row.fecha()}</td>
            <td>${row.valor()}</td>
            <td>${row.dni()}</td>
            <td>${row.nit()}</td>
            </tr>
            `            
        }

    }
}

const excelInput = document.getElementById('excel-input')

excelInput.addEventListener('change', async function(){
    const content = await readXlsxFile(excelInput.files[0])    
    const excel = new Excel(content)

    console.log(ExcelPrinter.print('excel-table', excel))
 
})
