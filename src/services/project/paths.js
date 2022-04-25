import { request } from '~lib'

export const getProjectPaths = async locales =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await request({
          url: 'api/projects',
          locale,
        })

        const projects = responses?.result

        return projects.map(({ code }) => ({
          params: { code },
          locale,
        }))
      }),
    )
  ).flat()
