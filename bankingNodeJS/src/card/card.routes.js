import { Router } from 'express'
import { createCard } from './card.controller.js'

const api = Router()

api.post('/addCard', createCard)

export default api