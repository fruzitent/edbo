import { Pool, PoolConfig } from 'pg'
import SQL, { SQLStatement } from 'sql-template-strings'

import type { Offer, Program, User } from 'edbo/src/types/edbo'

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
      insert into edbo.public.offers (data)
      values (${offer})
    `
    await this.#query(sql)
  }

  async getOffers(usid?: Offer['usid'][]) {
    const sql = SQL`
      select *
      from edbo.public.offers
    `
    const filter = SQL`
      where jsonb_extract_path(data, 'usid') = any (${usid})
    `
    if (typeof usid !== 'undefined') sql.append(filter)
    const result = await this.#query<{ data: Offer }>(sql)
    return result.rows.map((value) => value.data)
  }

  async addProgram(program: Program) {
    const sql = SQL`
      insert into edbo.public.programs (ids, n, uid, un)
      values (${program.ids}, ${program.n}, ${program.uid}, ${program.un})
    `
    await this.#db.query(sql)
  }

  async getPrograms(uids?: Program['uid'][]) {
    const sql = SQL`
      select *
      from edbo.public.programs
    `
    const filter = SQL`
      where uid = any (${uids})
    `
    if (typeof uids !== 'undefined') sql.append(filter)
    const result = await this.#query<Program>(sql)
    return result.rows
  }

  async addUser(user: User) {
    const sql = SQL`
      insert into edbo.public.users (data)
      values (${user})
    `
    await this.#query(sql)
  }

  async getUsers(prid?: User['prid'][]) {
    const sql = SQL`
      select *
      from edbo.public.users
    `
    const filter = SQL`
      where jsonb_extract_path(data, 'prid') = any (${prid})
    `
    if (typeof prid !== 'undefined') sql.append(filter)
    const result = await this.#query<{ data: User }>(sql)
    return result.rows.map((value) => value.data)
  }
}

export const db = new Database()
