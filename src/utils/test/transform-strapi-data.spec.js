import { transformStrapiData } from '..'
import artists from './artists.json'
import artistsResult from './artists-result.json'

describe('Transform Data', () => {
  it('Transforms one level nested data', () => {
    const transformedData = transformStrapiData(artists)
    expect(transformedData).toStrictEqual(artistsResult)
  })
})
