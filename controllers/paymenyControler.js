const payments = require("../Models/paymentModel");
const pets = require("../Models/petsModel");
const stripe = require("stripe")(process.env.STRIPESECRETKEY);

exports.payment = async (req, res) => {
  try {
    const userId = req.payload;
    const { petId, name, mobile, pin, address, price } = req.body;

    if (!petId || !name || !mobile || !pin || !address)
      return res.status(400).json({ message: "All fields are required" });

    const pet = await pets.findById(petId);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    const finalPrice = Number(price.toString().replace(/[^0-9.]/g, ""));
    if (isNaN(finalPrice) || finalPrice <= 0)
      return res.status(400).json({ message: "Invalid price" });

    const newPayment = new payments({
      userId,
      petId,
      name,
      mobile,
      pin,
      address,
      price: finalPrice,
      status: "pending", // mark completed only after webhook
    });
    await newPayment.save();

    // Use a valid public image URL or fallback placeholder
    const petImage = pet.image && pet.image.startsWith("http")
      ? pet.image
      : "https://via.placeholder.com/300x200.png?text=Pet+Image";

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: pet.breed || "Pet",
              description: `${pet.gender || ""} | ${pet.category || ""}`,
              images: [petImage],
            },
            unit_amount: Math.round(finalPrice * 100), // paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://pet-shop-frontend-black.vercel.app/paymentsuccess",
      cancel_url: "https://pet-shop-frontend-black.vercel.app/paymenterror",
      metadata: { paymentId: newPayment._id.toString() },
    });

    // ✅ Return session URL for frontend
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getorders = async (req, res) => {
  try {
    const response = await payments.find()
      .populate("petId", "category breed gender age color size price image")
      .populate("userId", "username email");
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getuserorders = async (req, res) => {
  try {
    const userId = req.payload;
    const response = await payments.find({ userId })
      .populate("petId", "category breed gender age color size price image")
      .populate("userId", "username email");
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};


exports.updateorderStatus = async (req, res) => {
    try {
        userId = req.payload; 
        const { id, status } = req.body; 
        const updated = await payments.findByIdAndUpdate(id, {userId, status }, { new: true });
        res.status(200).json(updated);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};
