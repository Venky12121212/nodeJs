const fs = require('fs');

/*Reading file Synchronously*/
/*let readFileContent = fs.readFileSync('hello.txt', 'utf-8');
console.log('Reading from file');
console.log (readFileContent);*/



/*writeFile Operation synchronous*/
/*fs.writeFileSync('Message.text', readFileContent, 'utf-8');
console.log('Written to the File');*/

/*Read file asynchronously*/
fs.readFile('hello.txt', 'utf-8', (err, data) => {
  if(err) throw err;
  fs.writeFile('data.text', data, 'utf-8', (err, data) =>{
      if(err) throw err;
      console.log(`Data Written to the file`);
  })
});
console.log('welcome to fs module');