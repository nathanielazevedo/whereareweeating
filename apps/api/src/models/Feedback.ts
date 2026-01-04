import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema(
  {
    liked: { type: Boolean, required: true },
    message: { type: String, default: '' },
    userAgent: String,
    ipAddress: String,
  },
  { timestamps: true }
)

const Feedback = mongoose.model('feedback', feedbackSchema)

export default Feedback
