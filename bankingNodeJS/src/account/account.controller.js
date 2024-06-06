'use strict';

import Account from './account.model.js'
import User from '../user/user.model.js'
import Decimal from 'decimal.js'
import mongoose from 'mongoose';

export const test = (req, res) => {
    return res.send('Hello world')
};
