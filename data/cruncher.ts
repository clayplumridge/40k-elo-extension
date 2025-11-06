import * as fs from "fs";
import * as Excel from "exceljs";

const base = new Excel.default.Workbook();
const workbook = await base.xlsx.readFile("./elo.xlsx");
const worksheet = workbook.worksheets[0];
const rows = worksheet.getRows(2, worksheet.rowCount)
    ?.map(row => ({
        name: row.getCell(3).value,
        rank: row.getCell(1).value,
        elo: row.getCell(4).value,
        record: {
            wins: row.getCell(6).value,
            losses: row.getCell(7).value,
            draws: row.getCell(8).value
        }
    })
);

if(!fs.existsSync('./out')) {
    fs.mkdirSync('./out');
}

fs.writeFile('./out/elo.json', JSON.stringify(rows?.slice(0, 5), null, 2), err => {
    if(err) {
        console.error(err);
    }
});