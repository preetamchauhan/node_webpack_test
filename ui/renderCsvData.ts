
import {ajax} from 'rxjs/ajax';

(function processCsvData(){
    ajax(`http://localhost:3000/api/getcvs`).subscribe(data=>{
        console.log(data.response);
        var _data: any = data.response;
        var location = document.getElementById('csv');
        var div = document.createElement('div');
        var tableData = `<table>`;
        _data.forEach((row, index) => {
            if(index == 0){
                tableData = tableData + '<tr>';
                var keys = Object.keys(row);
                keys.forEach(key=>{
                    tableData = tableData + `<th>${key}</th>`;
                });
                tableData = tableData + '</tr>';
                tableData = tableData + '<tr>';
                keys.forEach(key=>{
                    tableData = tableData + `<td>${row[key]}</td>`;
                });
                tableData = tableData + '</tr>';
            }
            else{
                tableData = tableData + '<tr>';
                var keys = Object.keys(row);
                keys.forEach(key=>{
                    tableData = tableData + `<td>${row[key]}</td>`;
                });
                tableData = tableData + '</tr>';
            }
        });
        tableData = tableData + '</table>';
        //location.append(tableData);
        div.innerHTML = tableData;
        location.append(div);
    })
    })();