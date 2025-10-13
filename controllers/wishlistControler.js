const wishlists = require("../Models/wishlistModel")

exports.addwishlist = async (req, res) => {
    try {
        const userId = req.payload
        const { petId } = req.body

        const already = await wishlists.findOne({ userId, petId });
        if (already) {
            return res.status(409).json({ message: "Pet already in wishlist" });
        }
        else {
            const newWish = new wishlists({ petId, userId });
            await newWish.save();
            res.status(200).json(newWish);
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e)

    }
}

exports.getwishlist = async (req, res) => {
    try {
        userId=req.payload
        const response = await wishlists.find({userId}).populate("petId", "category breed gender age color size price image")
        res.status(200).json(response)
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e)


    }


}

exports.deletewishlist=async(req,res)=>{
    try{
       const {id}=req.params
    const response= await wishlists.findByIdAndDelete(id)
    res.status(200).json(response)
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e)


    }
   
}