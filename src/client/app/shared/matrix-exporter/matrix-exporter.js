var Excel = require('exceljs');
var Stream = require('stream');
var exporter;

exporter = {
  export: (csvData, version) => {
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

        workbook.xlsx.writeFile(version.ProductReleaseVersion + ' ' + new Date().toISOString().slice(0, 10) + '.xlsx');
      });
  }
}

module.exports.exporter = exporter;
