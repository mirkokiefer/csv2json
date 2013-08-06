
var fs = require('fs')
var JSONStream = require('JSONStream')
var csv = require('csv')

var fileStream = fs.createWriteStream(__dirname + '/test.json', {encoding: 'utf8'})
var jsonStream = JSONStream.stringify()
jsonStream.pipe(fileStream)

var arrayColumns = ['regions']

csv()
  .from.path(__dirname + '/input.csv', {columns: true})
  .transform(function(row, i) {
    for (var key in row) {
      if (arrayColumns.indexOf(key) > -1) {
        row[key] = row[key].split(',')
      }
    }
    return row
  })
  .on('record', function(data) {
    jsonStream.write(data)
  })
  .on('end', function() {
    jsonStream.end()
  })
