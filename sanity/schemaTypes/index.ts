import { type SchemaTypeDefinition } from 'sanity'
import { authorType } from './authorType'
import { blockContentType } from './blockContentType'
import { factCheckType } from './factCheckType'
import { opinionPostType } from './opinionPostType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorType, blockContentType, factCheckType, opinionPostType],
}
