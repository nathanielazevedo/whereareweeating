import bcrypt from 'bcryptjs'
import Party from '../models/Party'
import { TypedRequest, TypedRequestParams } from '../interfaces/Request'
import { Response, Request } from 'express'
import {
  likesToObj,
  getWinner,
  getRestaurants,
  CreatePartyReq,
  FetchRestaurantsReq as FRR,
  makeVotesObjects,
  partyNotFound,
} from './utils'

// Fetch Restaurants -> Restaurant[]
export const fetchRestaurants = async (req: FRR, res: Response) => {
  try {
    const restaurants = await getRestaurants(req.body)
    if (restaurants?.data?.error) throw new Error()
    else res.status(200).json(restaurants)
  } catch {
    res.status(404).send()
  }
}

// Create Party -> party
export const createParty = async (req: CreatePartyReq, res: Response) => {
  try {
    const party = new Party({
      ...req.body,
      ...makeVotesObjects(req.body),
      password: await bcrypt.hash(req.body.password, 10),
      r_winner: null,
      h_winner: null,
      d_winner: null,
      voters_so_far: 0,
    })
    res.status(200).json(await party.save())
  } catch (error) {
    console.log(error)
    res.status(404).send()
  }
}

// Get Party -> party
type gP = TypedRequestParams<{ id: string }>
export const getParty = async (req: gP, res: Response) => {
  try {
    const party = await Party.findOne({ _id: req.params.id })
    if (!party) return partyNotFound(res)
    else res.status(200).json(party)
  } catch {
    res.status(404).send()
  }
}

// Vote Party -> updated party
type vP = TypedRequest<
  { id: string },
  { rLikes: string[]; hLikes: string[]; dLikes: string[] }
>
export const voteParty = async (req: vP, res: Response) => {
  const id = req.params.id
  const { rLikes, hLikes, dLikes } = req.body
  try {
    const party = await Party.findOne({ _id: id })
    if (!party) return partyNotFound(res)
    else {
      const r_votes = likesToObj(rLikes, party.r_votes)
      const h_votes = hLikes ? likesToObj(hLikes, party.h_votes) : null
      const d_votes = dLikes ? likesToObj(dLikes, party.d_votes) : null
      const voters_so_far = Number(party.voters_so_far) + 1
      const info = { voters_so_far, r_votes, h_votes, d_votes }
      if (voters_so_far === party.max_voters) {
        const vOH = party.vote_on_hours
        const vOD = party.vote_on_days
        const hTVO = party.hours_to_vote_on
        const dTVO = party.days_to_vote_on
        const r_winner = getWinner(party.restaurants, party.r_votes)
        const h_winner = vOH ? getWinner(hTVO, party.h_votes).id : null
        const d_winner = vOD ? getWinner(dTVO, party.d_votes).id : null
        const w = { r_winner, h_winner, d_winner }
        await Party.updateOne({ _id: id }, { ...w, ...info })
      } else {
        await Party.updateOne(
          { _id: id },
          { voters_so_far, r_votes, h_votes, d_votes }
        )
      }
      const updatedParty = await Party.findOne({ _id: id })
      res.status(201).json(updatedParty)
    }
  } catch (err) {
    res.status(404).send()
  }
}

// Validate Password -> success
type vPR = TypedRequest<{ id: string }, { password: string }>
export const validatePassword = async (req: vPR, res: Response) => {
  try {
    const party = await Party.findOne({ _id: req.params.id })
    if (!party) return partyNotFound(res)
    else if (!party.password) return partyNotFound(res)
    else {
      bcrypt.compare(req.body.password, party.password, function (err, result) {
        if (result) res.status(200).json({ message: 'success' })
        else res.status(404).json({ message: 'incorrect password' })
      })
    }
  } catch (err) {
    res.status(404).send()
  }
}

// Finish Party -> updated party
type ePR = TypedRequestParams<{ id: string }>
export const endParty = async (req: ePR, res: Response) => {
  try {
    const party = await Party.findOne({ _id: req.params.id })
    if (!party) return partyNotFound(res)
    else {
      const vOH = party.vote_on_hours
      const vOD = party.vote_on_days
      const hTVO = party.hours_to_vote_on
      const dTVO = party.days_to_vote_on
      const r_winner = getWinner(party.restaurants, party.r_votes)
      const h_winner = vOH ? getWinner(hTVO, party.h_votes).id : null
      const d_winner = vOD ? getWinner(dTVO, party.d_votes).id : null
      const w = { r_winner, h_winner, d_winner }
      await Party.updateOne({ _id: req.params.id }, { ...w })
      const updatedParty = await Party.findOne({ _id: req.params.id })
      res.status(200).json(updatedParty)
    }
  } catch (err) {
    res.status(404).send()
  }
}

// Update Party -> updated party
type uPR = TypedRequest<{ id: string }, { name?: string }>
export const updateParty = async (req: uPR, res: Response) => {
  try {
    const party = await Party.findOne({ _id: req.params.id })
    if (!party) return partyNotFound(res)
    
    const updates: any = {}
    if (req.body.name !== undefined) updates.name = req.body.name
    
    await Party.updateOne({ _id: req.params.id }, updates)
    const updatedParty = await Party.findOne({ _id: req.params.id })
    res.status(200).json(updatedParty)
  } catch (err) {
    console.log(err)
    res.status(404).send()
  }
}

// Get All Parties -> parties[] (development only)
export const getAllParties = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 50
    const skip = (page - 1) * limit

    const [parties, total] = await Promise.all([
      Party.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Party.countDocuments({})
    ])

    res.status(200).json({
      parties,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + parties.length < total
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
}

// Delete Party -> success (development only)
type dP = TypedRequestParams<{ id: string }>
export const deleteParty = async (req: dP, res: Response) => {
  try {
    const party = await Party.findOne({ _id: req.params.id })
    if (!party) return partyNotFound(res)
    
    await Party.deleteOne({ _id: req.params.id })
    res.status(200).json({ success: true, message: 'Party deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
}
