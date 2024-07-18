import { Router } from "express";
import { createCard } from "./card.controller.js";

const api = Router()

api.post('/createCard', createCard)

export default api;