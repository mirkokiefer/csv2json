
var JSONStream = require('JSONStream')
var csv = require('csv')

var argv = require('optimist')
    .alias('a', 'array-columns')
    .argv

var arrayColumns = argv.a ? argv.a.split(',') : []

var jsonStream = JSONStream.stringify()

var csvStream = csv()
  .from.options({columns: true})
  .transform(function(row, i) {
    arrayColumns.forEach(function(column) {
      row[column] = row[column].split(',')
    })
    return row
  })
  .on('record', function(data) {
    jsonStream.write(data)
  })
  .on('end', function() {
    jsonStream.end()
  })

process.stdin.pipe(csvStream)
jsonStream.pipe(process.stdout)
