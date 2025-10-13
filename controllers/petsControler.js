const pets = require("../Models/petsModel")

exports.addpet = async (req, res) => {

    try {
        const { category, breed, gender, age, color, size, price, image } = req.body


        const newpets = new pets({ category, breed, gender, age, color, size, price, image })
        await newpets.save()
        res.status(200).json(newpets)

    }
    catch (e) {
        console.log(e);
        res.status(400).json(e)

    }
}

exports.getpet = async (req, res) => {
    try {
        const respons = await pets.find()
        res.status(200).json(respons)
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e)

    }

}

exports.editpet = async (req, res) => {
    try {
        const { id } = req.params
        const { category, breed, gender, age, color, size, price, image } = req.body
        const response = await pets.findByIdAndUpdate(id, { category, breed, gender, age, color, size, price, image })
        res.status(200).json(response)

    }
    catch (e) {
        console.log(e);
        res.status(400).json(e)

    }

}

exports.deletepet = async (req, res) => {
    try {
        const { id } = req.params
        const respons = await pets.findByIdAndDelete(id)
        res.status(200).json(respons)
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e)


    }

}