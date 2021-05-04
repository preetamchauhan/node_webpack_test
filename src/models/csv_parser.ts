import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as stripBom from 'strip-bom-stream';
export class CsvParser{
    public getCsv(callback){
        var data = [];
        var chunk;
       var readableStream = fs.createReadStream('input/test_csv_data.csv', 'utf8')
       .pipe(stripBom())
       .pipe(csv());
       readableStream.on('readable', ()=> {
        while ((chunk=readableStream.read()) != null) {
            console.log(chunk);
            // chunk = chunk.split(/\r?\n/); 
            data.push(chunk);
        }
    });
            
    readableStream.on('end', () => {
            console.log('CSV file successfully processed');
            callback(data);
          });
    readableStream.on('error', (err) => {
            console.log(err.stack);
            callback(err);
          });
    }
}