import loanType from './loanType.model.js'

export const addLoanType = async(req, res)=>{
    try {
        let data = req.body
        let loanTypeData = new loanType(data)
        if(!loanTypeData) return res.status(409).send({message: 'New data not found'})
        await loanType.save()
        return res.send({message: 'Tho type of loan is added successfully.'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to add loan type.'})
    }
}