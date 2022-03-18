export const flattenAttributes = data => {
  if (!data) return null

  if (Array.isArray(data)) {
    if (data.length === 0) return []
    return data.map(({ id, attributes }) => ({ id, ...attributes }))
  }

  return { id: data.id, ...data.attributes }
}

export const transformAttributes = (id, attributes) => {
  return Object.keys(attributes).reduce((acc, key) => {
    acc.id = id

    if (acc[key]?.data) {
      acc[key] = flattenAttributes(acc[key].data)
      if (Array.isArray(acc[key])) {
        acc[key].forEach(item => {
          // Recursive for nested fields
          transformAttributes(item.id, item)
        })
      }
    }

    return acc
  }, attributes)
}

export const transformStrapiData = response => {
  if (!response) {
    console.warn('No response provided!')
    return null
  }

  if (response.data && Array.isArray(response.data)) {
    return response.data.map(({ id, attributes }) => {
      return transformAttributes(id, attributes)
    })
  }

  return transformAttributes(response.data.id, response.data.attributes)
}
