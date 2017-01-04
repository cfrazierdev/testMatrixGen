'use strict';

const {dialog} = require('electron').remote;
var Excel = require('exceljs');
var Stream = require('stream');
var exporter;

exporter = {
  export: (csvData, version) => {
    dialog.showSaveDialog(
      {
        filters: [
          {
            name: 'Excel',
            extensions: ['xlsx']
          }
        ]
      },
      (fileName) => saveFile(csvData, version, fileName)
    );
  }
}

function saveFile(csvData, version, fileName) {
  console.log(fileName);
  var workbook = new Excel.Workbook();
  var stream = new Stream.Readable();

  stream.push(csvData);
  stream.push(null);

  workbook.csv.read(stream)
    .then((worksheet) => {
      worksheet.columns.forEach((column, index) => {
        if( index === 0) {
          column.width = 50;
        }
        else {
          column.width = 15;
        }
      });

      worksheet.eachRow((row, rowNumber) => {
        if(rowNumber === 1) {
          row.eachCell((cell, rowNumber) => {
            cell.style.alignment = { wrapText: true };
          });
        }
        if(rowNumber === 2) {
          row.eachCell((cell, rowNumber) => {
            console.log(cell);
          });
        }
      });

      workbook.xlsx.writeFile(fileName);
    });
}

module.exports.exporter = exporter;
