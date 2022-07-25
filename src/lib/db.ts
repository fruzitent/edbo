import { Pool, PoolConfig } from 'pg'
import SQL, { SQLStatement } from 'sql-template-strings'

import type { Offer, Program } from 'edbo/src/types/edbo'

class Database {
  #db: Pool

  constructor(config?: PoolConfig) {
    this.#db = new Pool(config)
  }

  async #query<T>(sql: SQLStatement | string, values?: unknown[]) {
    const client = await this.#db.connect()
    const result = await client.query<T>(sql, values)
    client.release(true)
    return result
  }

  async addOffer(offer: Offer) {
    const sql = SQL`
      INSERT INTO edbo.public.offers (data)
      VALUES (${offer})
    `
    await this.#query(sql)
  }

  async getOffers(usid?: Offer['usid'][]) {
    const sql = SQL`
      SELECT *
      FROM edbo.public.offers
    `
    const filter = SQL`
      WHERE jsonb_extract_path(data, 'usid') = ANY (${usid})
    `
    if (typeof usid !== 'undefined') sql.append(filter)
    const result = await this.#query<{ data: Offer }>(sql)
    return result.rows.map((value) => value.data)
  }

  async addProgram(program: Program) {
    const sql = SQL`
      INSERT INTO edbo.public.programs (ids, n, uid, un)
      VALUES (${program.ids}, ${program.n}, ${program.uid}, ${program.un})
    `
    await this.#db.query(sql)
  }

  async getPrograms(uids?: Program['uid'][]) {
    const sql = SQL`
      SELECT *
      FROM edbo.public.programs
    `
    const filter = SQL`
      WHERE uid = ANY(${uids})
    `
    if (typeof uids !== 'undefined') sql.append(filter)
    const result = await this.#query<Program>(sql)
    return result.rows
  }
}

export const db = new Database()
