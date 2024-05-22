import express from 'express';
import {user_router} from './users/index.js'
import {account_router} from './account.js'

const router = express.Router();

router.use('/user', user_router)
router.use('/account', account_router)

export {router};