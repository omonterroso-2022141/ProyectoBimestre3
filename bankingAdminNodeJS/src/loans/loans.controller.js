'use strict'

import Loans from './loans.model.js'
import LoanType from '../loanType/loanType.model.js'

export const apllyForLoan = async (req, res) => {
    try {
        let data = req.body
        let loan = new Loans(data)

        if (!loan) {
            return res.status(404).send({ message: 'Data for loan not found' })
        }

        // Buscar el tipo de préstamo para obtener la tasa de interés
        let loanTypeInfo = await LoanType.findOne({ _id: data.loanType })

        if (!loanTypeInfo) {
            return res.status(404).send({ message: 'Loan type not found' })
        }

        // Calcular el interés basado en la tasa de interés anual
        let interestRate = loanTypeInfo.interestRate
        let loanAmount = parseFloat(loan.amount.toString()) // Convertir Decimal128 a número

        // Calcular el interés simple para un año
        let interest = loanAmount * (interestRate / 100)

        return res.send({
            message: 'Loan applied successfully',
            loan: {
                ...data,
                interest: interest.toFixed(2) // Redondear el interés a 2 decimales
            }
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error applying for loan' })
    }
}
