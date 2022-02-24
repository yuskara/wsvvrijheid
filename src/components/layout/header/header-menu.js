import ROUTES from 'config/routes.json'

const { event, about, contact, blog } = ROUTES

export const HEADER_MENU = [
  event,
  blog,
  {
    en: {
      label: 'Samenvvv',
      children: [about.en, contact.en],
    },
    nl: {
      label: 'Samenvvv',
      children: [about.nl, contact.nl],
    },
    tr: {
      label: 'Samenvvv',
      children: [about.tr, contact.tr],
    },
  },
]
