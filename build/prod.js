const sass = require('node-sass')
const path = require('path')
const fs = require('fs')

const outFile = path.resolve(__dirname, '../public/css/styles.css')

sass.render({
  file: path.resolve(__dirname, '../public/scss/styles.scss'),
  outFile,
  outputStyle: 'compressed',
}, (err, result) => {
  if(!err) {
    fs.writeFile(outFile, result.css, (err) => {
      if(!err) {
        console.log('Output file to css/styles.css')
      }else{
        console.log('Error writing file: '+err.message)
      }
    })
  }else{
    console.log('Error rendering css: '+err.message)
  }
})
