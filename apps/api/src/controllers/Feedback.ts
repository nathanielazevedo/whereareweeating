import { Request, Response } from 'express'
import Feedback from '../models/Feedback'

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { liked, message } = req.body

    if (typeof liked !== 'boolean') {
      return res.status(400).json({ error: 'liked field is required and must be a boolean' })
    }

    const feedback = new Feedback({
      liked,
      message: message || '',
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip || req.socket.remoteAddress,
    })

    await feedback.save()

    res.status(201).json({ success: true, message: 'Feedback received' })
  } catch (error) {
    console.error('Error creating feedback:', error)
    res.status(500).json({ error: 'Failed to save feedback' })
  }
}

export const getAllFeedback = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 50
    const skip = (page - 1) * limit

    const [feedback, total] = await Promise.all([
      Feedback.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Feedback.countDocuments({})
    ])

    res.status(200).json({
      feedback,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + feedback.length < total
      }
    })
  } catch (error) {
    console.error('Error fetching feedback:', error)
    res.status(500).json({ error: 'Failed to fetch feedback' })
  }
}
