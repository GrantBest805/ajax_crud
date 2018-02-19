
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let products = [
    {
        id: 1, 
        name: 'laptop'
    },
    {
        id: 2, 
        name: 'microwave'
    },
];

let currentId = 2;

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.use(bodyParser.json());

app.get('/products', (req, res) => {
    res.send({products: products});
})

app.post('/products', (req, res) => {
    var productName = req.body.name;
    currentId++;

    products.push({
        id: currentId,
        name: productName
    });
    res.send('Successfully created product');
});

app.put('/products/:id', (req, res) => {
    var id = req.params.id;
    var newName = req.body.newName;
    var found = false;

    products.forEach((product, index) => {
        if (!found && product.id === Number(id)){
            product.name = newName;
        }
    });
    res.send('Succesfully updated product');
});

app.delete('/products/:id', (req, res) => {
    var id = req.params.id;

    var found = false;

    products.forEach((product, index) => {
        if (!found && product.id === Number(id)){
            products.splice(index, 1);
        }
    });
    res.send('Succesfully deleted product');
});

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});