import * as express from 'express';
import { Request, Response } from 'express';
import {CsvParser} from './models/csv_parser';
const csvParser = new CsvParser();
const app = express();
const {
  PORT = 3000,
} = process.env;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'hello world',
  });
});
app.listen(PORT, () => {
  console.log('server started at http://localhost:'+PORT);
});

app.get( '/api/getcvs',  (req: Request, res: Response) => {
    csvParser.getCsv((data)=> {
        //console.log(data);
        res.json(data);
    });
});