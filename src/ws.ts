/* eslint-disable no-console */
import process from 'node:process'
import type { IncomingMessage } from 'node:http'
import type { WebSocket } from 'ws'
import { WebSocketServer } from 'ws'

const PORT = Number(process.env.PORT) || 5631

const connections = new Map<WebSocket, IncomingMessage['headers']>()
const wss = new WebSocketServer({
  path: '/_ws',
  port: PORT,
}, () => {
  console.log(`server is running at http://127.0.0.1:${PORT}/`)
})
wss.on('connection', (ws, req) => {
  connections.set(ws, req.headers)
  console.log(`client connected${ws.url}`)

  ws.on('message', (message) => {
    ws.send(`server received: ${message}`)
  })
  ws.on('close', () => {
    connections.delete(ws)
  })
  ws.on('pong', () => {

  })
  ws.ping()
})

wss.on('error', (err) => {
  console.error(err)
})
setInterval(() => {
  connections.forEach((_, ws) => {
    ws.ping()
  })
}, 3 * 1000)
