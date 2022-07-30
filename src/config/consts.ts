import { stringifyDsn } from 'slonik'

export const pgDsn = stringifyDsn({
  databaseName: process.env.PGDATABASE || 'edbo',
  host: process.env.PGHOST || 'localhost',
  password: process.env.PGPASSWORD || '',
  port: process.env.PGPORT || 5432,
  username: process.env.PGUSER || '',
})
