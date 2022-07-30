import fs from 'fs'

import { db } from 'edbo/src/lib/db'

const isObject = (value: unknown) =>
  value !== null &&
  typeof value === 'object' &&
  Array.isArray(value) === false // prettier-ignore

const isPlainObject = (value: unknown) =>
  !!value &&
  !!(value = Object.getPrototypeOf(value)) &&
  !Object.getPrototypeOf(value)

const forEachObject = (
  obj: Record<number | string, unknown>,
  fn: Function,
  path: string,
) => {
  for (const key in obj) {
    const deepPath = path ? `${path}.${key}` : key
    fn.call(obj, obj[key], key, obj, deepPath)
    forEach(obj[key], fn, deepPath)
  }
}

const forEachArray = (array: unknown[], fn: Function, path: string) => {
  array.forEach((value, index, arr) => {
    const deepPath = `${path}[${index}]`
    fn.call(arr, value, index, arr, deepPath)
    forEach(arr[index], fn, deepPath)
  })
}

function forEach(value: unknown, fn: Function, path: string = '') {
  if (Array.isArray(value)) {
    forEachArray(value, fn, path)
  } else if (isPlainObject(value)) {
    // @ts-ignore
    forEachObject(value, fn, path)
  }
}

class JsonMap extends Map {
  toJSON = () => {
    const obj: Record<number | string, unknown> = {}
    for (const [key, value] of this) obj[key] = value
    return obj
  }
}

class JsonSet extends Set {
  toJSON = () => Array.from(this)
}

export const getUniqueValues = async (data: unknown[]) => {
  const dataMap = new JsonMap()

  for (let i = 0; i < data.length; i++) {
    forEach(data[i], (value: unknown, key: string, _: object, path: string) => {
      if (isObject(value)) return

      console.log({
        status: `${i} / ${data.length} | ${(i / data.length).toFixed(3)}`,
        path,
        key,
        value,
      })

      const dataMapValue: Set<unknown> | undefined = dataMap.get(key)
      if (typeof dataMapValue === 'undefined') {
        const set = new JsonSet()
        set.add(value)
        dataMap.set(key, set)
      } else {
        dataMapValue.add(value)
        dataMap.set(key, dataMapValue)
      }
    })
  }

  return dataMap
}

db.getUsers()
  .then((data) => getUniqueValues(data))
  .then((dataMap) => fs.writeFileSync('./unique.json', JSON.stringify(dataMap)))
