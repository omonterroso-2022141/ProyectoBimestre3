import accountType from "./accountType.model.js"

export const test = (req, res) =>{
    return res.send('Hello world')
}

export const add = async(req, res)=>{
    try {
        let data = req.body
        if(!data) return res.status(404).send({message: 'Data not found'})
        const existingType = await accountType.findOne({name: data.name})
        if(existingType) return res.status(409).send({message: 'Account type already exists.'})
        let type = new accountType(data)
        await type.save()
        return res.send({message: 'Account type added successfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to add account type'})
    }
}