import { Parser } from '../src/parser'
import { Zap20210101 } from '../types/types'

describe('Parser', () => {
  describe('#constructor', () => {
    it('raises when an unsupported schema version is specified', () => {
      expect(() => {
        new Parser('zap-20190101')
      }).toThrow(
        'There are no versions in the zap namespace with the 20190101 calendar version'
      )

      expect(() => {
        new Parser('coinbase-20190101')
      }).toThrow('There are no versions with the coinbase project name')
    })
  })

  describe('#parse', () => {
    it('it parses the metadata', () => {
      const parser = new Parser('zap-20210101')
      const json = {
        description: 'blah',
        mimeType: 'application/json',
        name: 'who cares',
        version: 'zap-01012021'
      }

      const result = parser.parse(JSON.stringify(json))
      expect(isZap20210101(result)).toBe(true)
      expect(result).toMatchObject(json)
    })
  })
})

function isZap20210101(json: Object): json is Zap20210101 {
  return (
    'name' in json && 'mimeType' in json && 'version' in json && 'description' in json
  )
}
