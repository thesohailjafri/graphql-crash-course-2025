import 'dotenv/config'
import 'express-async-errors'
// External Imports
import cors from 'cors'
import express from 'express'
import http from 'http'
import { expressMiddleware } from '@apollo/server/express4'

import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { resolvers, typeDefs } from './lib/graphql/schema.js'
import { ApolloServer } from '@apollo/server'
import { GraphContext } from './types'
import { connectDb } from './lib/db/index.js'
import { asyncErrorMiddleware } from './middlewares/index.js'

// Constants
const port = process.env.PORT || 3001
const env = process.env.NODE_ENV
const graphqlPath = '/graphql'
const app = express()
const httpServer = http.createServer(app)

// Middleware Initialization
function initializeMiddleware(appRef: typeof app) {
  appRef.use(cors())
  appRef.use(express.urlencoded({ limit: '2mb', extended: true }))
  appRef.use(express.json({ limit: '2mb' }))
  appRef.use(asyncErrorMiddleware)
}

// Apollo Server Initialization
const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: env !== 'production',
})

// Server Startup Function
async function startServer() {
  try {
    await connectDb()
    await apolloServer.start()
    initializeMiddleware(app)
    app.get('/', (_, res) => res.send('Server is running'))
    app.use(
      graphqlPath,
      expressMiddleware(apolloServer, {
        context: async ({ req }) =>
          ({
            req,
          } as GraphContext),
      }),
    )

    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))
    console.log(`🚀 Apollo Server :: http://localhost:${port}${graphqlPath}`)
  } catch (error) {
    console.error('Error starting server:', error)
  }
}

startServer()
