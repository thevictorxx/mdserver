// export const {function name} = () =>{}
const fs = require('fs')
const path = require('path')
const index = (req, res) => {

    const data = fs.readdirSync(path.join(__dirname, "..", "docs-md"), function (err, archivos) {
        if (err) {
            onError(err);
            return;
        }
        console.log(archivos);
        return archivos;
    });

    const elementos = data.filter(element => element.includes(".md"));

    res.render('index', {
        title: "Pagina Principal",
        condition: true,
        archivos: elementos
    });


};

const test = (req, res) => {

    res.json("Ok adis");

};

module.exports = {
    index,
    test
}