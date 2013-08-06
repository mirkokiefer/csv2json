#csv2json

Node.js utility script to convert csv files to json.

You can pass in array columns which will be split at commas.

```
cat test/input.csv | node index.js -a 'regions' > test.json
```
