import Card from './card.model.js'
import Decimal from 'decimal.js'

export const createCard = async(req,res)=>{
    try {
        let data = req.body
        let card = new Card.save(data)
        if(!card) return res.status(404).send({message: 'Data for card not found'})
        data.cardNumber = 
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error creating card'})
    }
}