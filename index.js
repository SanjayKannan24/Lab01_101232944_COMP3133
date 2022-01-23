const csv = require("csv-parser")
var fs = require("fs")

var readStream = fs.createReadStream("input_countries.csv")

const files = ["canada" , "usa"]
files.forEach(f => {
    fs.unlink(`${f}.txt`, (err) => {
        if(err){
            console.log(err)
            return
        }
        console.log(f + ".txt deleted successfully...")
    })
})

readStream.pipe(csv()).on("data" , (data) => {
    if(data.country == "Canada"){
        fs.writeFileSync("canada.txt" , `${data.country} , ${data.year} , ${data.population}\n` , {flag : 'a'})
    }
    else if(data.country == "United States"){
        fs.writeFileSync("usa.txt" , `${data.country} , ${data.year} , ${data.population}\n` , {flag : 'a'})
    }
    
})