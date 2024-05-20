// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
import { Router } from 'express'
import hello from './hello.ts'

const router = Router()
router.all('/hello', hello)
export default router
