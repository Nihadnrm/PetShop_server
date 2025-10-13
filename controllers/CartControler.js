const carts = require("../Models/cartModel")

exports.addcart = async (req, res) => {
  try {
    const userId = req.payload;
    const { petId, quantity } = req.body;

    const existing = await carts.findOne({ userId, petId });

    if (existing) {
      existing.quantity += quantity; // increment/decrement

      if (existing.quantity <= 0) {
        await carts.deleteOne({ _id: existing._id });
        return res.status(200).json({ removed: true }); // simpler flag
      }

      await existing.save();
      return res.status(200).json({ ...existing.toObject(), removed: false });
    } else {
      const newcart = new carts({ userId, petId, quantity });
      await newcart.save();
      return res.status(200).json({ ...newcart.toObject(), removed: false });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Something went wrong" });
  }
};


exports.getcart = async (req, res) => {
    try {
        const userId = req.payload
        const response = await carts.find({ userId }).populate("petId", "category breed gender age color size price image")
        res.status(200).json(response)
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e)

    }

}
exports.deletecart=async(req,res)=>{
  try{
  const {id}=req.params
    const response=await carts.findByIdAndDelete(id)
    res.status(200).json(response)
  }catch (e) {
        console.log(e);
        res.status(400).json(e)

    }
   

}

