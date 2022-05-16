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

    if (acc[key]?.data === null) acc[key] = null

    return acc
  }, attributes)
}

export const transformStrapiData = response => {
  if (!response || !response.data) {
    console.warn('No response provided!')
    return { result: null, pagination: null }
  }

  if (response.data && Array.isArray(response.data)) {
    return {
      pagination: response.meta.pagination,
      result: response.data.map(({ id, attributes }) => {
        return transformAttributes(id, attributes)
      }),
    }
  }

  return {
    pagination: response.meta.pagination,
    result: transformAttributes(response.data.id, response.data.attributes),
  }
}

export const normalizeStrapiData = data => {
  const isObject = data => Object.prototype.toString.call(data) === '[object Object]'
  const isArray = data => Object.prototype.toString.call(data) === '[object Array]'

  const flatten = data => {
    if (!data.attributes) return data

    return {
      id: data.id,
      ...data.attributes,
    }
  }

  if (isArray(data)) {
    return data.map(item => normalizeStrapiData(item))
  }

  if (isObject(data)) {
    if (isArray(data.data)) {
      data = [...data.data]
    } else if (isObject(data.data)) {
      data = flatten({ ...data.data })
    } else if (data.data === null) {
      data = null
    } else {
      data = flatten(data)
    }

    for (const key in data) {
      data[key] = normalizeStrapiData(data[key])
    }

    return data
  }

  return data
}

export const _transformStrapiData = data => {
  return {
    pagination: data.meta.pagination,
    result: normalizeStrapiData(data),
  }
}
