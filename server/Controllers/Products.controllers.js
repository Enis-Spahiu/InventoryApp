const Product = require('../Models/Product.model');

module.exports = {
    create: (req, res) => {
        Product.create(req.body)
            .then(result => {
                return res.json({message: "Creation is successful!", result: result});
            })
            .catch(err => {
                return res.status(400).json({message: "Data not correct!", errors: err});
            });
    },
    getAll: (req, res) => {
        Product.find()  
            .then(result => {
                return res.json(result);
            })
            .catch(err => {
                return res.status(500).json({message: "Internal server error!", error: err});
            });
    },
    getOne: (req, res) => {
        Product.findOne({_id: req.params.id})
            .then(result => {
                return res.json(result);
            })
            .catch(err => {
                return res.status(500).json({message: "Internal server error!", error: err});
            })
    },
    update: (req, res) => {
        Product.updateOne({_id: req.params.id}, req.body, {runValidators: true})
            .then(result => {
                return res.json(result);
            })
            .catch(err => {
                return res.status(500).json({message: "Internal server error!", error: err});
            })
    },
    delete: (req,res) => {
        Product.deleteOne({_id: req.params.id})
            .then(result => {
                return res.json(result);
            })
            .catch(err => {
                return res.status(500).json({message: "Internal server error!", error: err});
            });
    }
}