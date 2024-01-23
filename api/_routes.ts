/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Router } from 'express'
import vercel from './vercel.ts'

const router = Router()
router.all('/vercel', vercel)
export default router
