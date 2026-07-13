/**
 * cPanel / Masar Cloud SA — Node.js application entry point.
 *
 * Setup in cPanel:
 * 1. Upload project files (or deploy via Git)
 * 2. Run: npm install && npm run build
 * 3. Set environment variables (MONGODB_URI, SITE_URL, ADMIN_*, etc.)
 * 4. Node.js App → Application startup file: server.js
 * 5. Node.js App → Application mode: Production
 */
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const hostname = process.env.HOSTNAME || '0.0.0.0'
const port = parseInt(process.env.PORT || process.env.NODE_PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev, hostname, port, dir: __dirname })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true)
        await handle(req, res, parsedUrl)
      } catch (error) {
        console.error('[server] request error:', error)
        res.statusCode = 500
        res.end('Internal Server Error')
      }
    })
      .once('error', (error) => {
        console.error('[server] failed to start:', error)
        process.exit(1)
      })
      .listen(port, hostname, () => {
        console.log(`> Reliable Company ready on http://${hostname}:${port}`)
        console.log(`> NODE_ENV=${process.env.NODE_ENV || 'development'}`)
      })
  })
  .catch((error) => {
    console.error('[server] Next.js prepare failed:', error)
    process.exit(1)
  })
