import * as fs from "fs";
import * as Excel from "exceljs";

const base = new Excel.default.Workbook();
const workbook = await base.xlsx.readFile("./elo.xlsx");
const worksheet = workbook.worksheets[0];
const rows = worksheet.getRows(2, worksheet.rowCount - 1)
    ?.map(row => ({
        name: `${row.getCell(3).value}`,
        rank: row.getCell(1).value,
        elo: row.getCell(9).value,
        record: {
            wins: row.getCell(4).value,
            losses: row.getCell(5).value,
            draws: row.getCell(6).value
        }
    })
    );

if (!rows) {
    throw new Error('Failed to produce any rows');
}

if (!fs.existsSync('./out')) {
    fs.mkdirSync('./out');
}

const output = {
    publishedTimestamp: Date.now(),
    elo: rows
};

fs.writeFile('./out/elo.json', JSON.stringify(output, null, 2), err => {
    if (err) {
        console.error(err);
    }
});