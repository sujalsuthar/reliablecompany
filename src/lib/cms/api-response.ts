import { NextResponse } from 'next/server'

export function cmsDatabaseErrorResponse(error: unknown) {
  const message =
    error instanceof Error ? error.message : 'CMS database is temporarily unavailable'

  const isConnectionIssue =
    /MongoServerSelectionError|timed out|ECONNREFUSED|ENOTFOUND|network|SSL/i.test(message)

  console.error('[cms] database error:', error)

  return NextResponse.json(
    {
      error: 'database_unavailable',
      message: isConnectionIssue
        ? 'Cannot reach MongoDB Atlas. Check MONGODB_URI, Atlas cluster status (not paused), and Network Access (allow Masar server IP or 0.0.0.0/0).'
        : message,
    },
    { status: 503 },
  )
}
