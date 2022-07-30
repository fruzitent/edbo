import { pgDsn } from 'edbo/src/config/consts'
import { Offer, Program, User } from 'edbo/src/types/edbo'
import {
  createPool,
  DatabasePool,
  sql,
  TaggedTemplateLiteralInvocation,
} from 'slonik'

class Database {
  #db: DatabasePool

  constructor(url: string) {
    this.#db = createPool(url)
  }

  async #query<T>(query: TaggedTemplateLiteralInvocation<T>) {
    return await this.#db.connect((connection) => connection.any(query))
  }

  async addOffer(offer: Offer) {
    const data = sql.jsonb(JSON.stringify(offer))

    const query = sql`
      insert into edbo.public.offers (data)
      values (${data})
    `

    await this.#query(query)
  }

  async getOffers(usid?: Offer['usid'][]) {
    const conditions = [sql`true`]

    if (typeof usid !== 'undefined') {
      const array = sql.array(usid, 'jsonb')
      const filter = sql`jsonb_extract_path(data, 'usid') = any (${array})`
      conditions.push(filter)
    }

    const query = sql<{ data: Offer }>`
      select *
      from edbo.public.offers
      where ${sql.join(conditions, sql` and `)}
    `

    const res = await this.#query(query)
    return res.map((value) => value.data)
  }

  async addProgram(program: Program) {
    const { ids, n, speciality, uid, un } = program

    const query = sql`
      insert into edbo.public.programs (ids, n, speciality, uid, un)
      values (${ids}, ${n}, ${speciality}, ${uid}, ${un})
    `

    await this.#query(query)
  }

  async getPrograms(uids?: Program['uid'][]) {
    const conditions = [sql`true`]

    if (typeof uids !== 'undefined') {
      const array = sql.array(uids, 'numeric')
      const filter = sql`uid = any (${array})`
      conditions.push(filter)
    }

    const query = sql<Program>`
      select *
      from edbo.public.programs
      where ${sql.join(conditions, sql` and `)}
    `

    return await this.#query(query)
  }

  async addUser(user: User) {
    const data = sql.jsonb(JSON.stringify(user))

    const query = sql`
      insert into edbo.public.users (data)
      values (${data})
    `

    await this.#query(query)
  }

  async getUsers(prids?: User['prid'][]) {
    const conditions = [sql`true`]

    if (typeof prids !== 'undefined') {
      const array = sql.array(prids, 'jsonb')
      const filter = sql`jsonb_extract_path(data, 'prid') = any (${array})`
      conditions.push(filter)
    }

    const query = sql<{ data: User }>`
      select *
      from edbo.public.users
      where ${sql.join(conditions, sql` and `)}
    `

    const res = await this.#query(query)
    return res.map((value) => value.data)
  }

  async getIds() {
    const data: string[] = []
    const programs = await this.getPrograms()
    for (const program of programs) {
      const ids = program.ids.split(',')
      data.push(...ids)
    }
    return data
  }
}

export const db = new Database(pgDsn)
