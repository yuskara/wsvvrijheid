import { useRouter } from 'next/router'

export const useChangeParams = () => {
  const router = useRouter()

  // Example
  // args { category: "photo", page: 4, sort: "likes" }
  // query { category: "photo", page: "4", sort: "likes" }
  // `/?category=photo&page=4&sort=likes`
  const changeParam = args => {
    // Extract the first key-value pair from the object
    // Example { page: 1 } => [ 'page', 1 ]
    // Example { category: "photo" } => [ 'category', 'photo' ]
    const [param, value] = Object.entries(args)[0]

    let { page } = router.query

    // If the params is not page, then we set it to 1 by default
    if (param !== 'page') page = 1

    return router.push({
      // Finally we set the query with the new params
      query: { ...router.query, page, [param]: value },
    })
  }

  return changeParam
}
