const feedbacks = require("../Models/feedbackModel");

exports.addfeedback = async (req, res) => {
  try {
    const { feedback } = req.body;
    const userId = req.payload;
    console.log(userId);
    


    if (!feedback) {
      return res.status(400).json({ error: "Feedback message is required" });
    }

    const newFeedback = new feedbacks({ userId, feedback });
    await newFeedback.save();

    res.status(200).json(newFeedback);
  } catch (e) {
    console.error("Add Feedback Error:", e.message);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getfeedback = async (req, res) => {
  try {
    const response = await feedbacks.find().populate("userId", "username email");
    res.status(200).json(response);
  } catch (e) {
    console.error("Get Feedback Error:", e.message);
    res.status(500).json({ error: "Server Error" });
  }
};
