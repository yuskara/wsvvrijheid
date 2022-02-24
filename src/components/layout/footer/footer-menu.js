import ROUTES from 'config/routes.json'

const { event, about, contact, terms, privacy, blog } = ROUTES

export const FOOTER_MENU = [
  {
    en: {
      label: 'Foundation',
      children: [about.en, contact.en],
    },
    nl: {
      label: 'Stichting',
      children: [about.nl, contact.nl],
    },
    tr: {
      label: 'Vakıf',
      children: [about.tr, contact.tr],
    },
  },
  {
    en: {
      label: 'Menu',
      children: [event.en, blog.en],
    },
    nl: {
      label: 'Menu',
      children: [event.nl, blog.nl],
    },
    tr: {
      label: 'Menu',
      children: [event.tr, blog.tr],
    },
  },
  {
    en: {
      label: 'Support',
      children: [terms.en, privacy.en],
    },
    nl: {
      label: 'Steun',
      children: [terms.nl, privacy.nl],
    },
    tr: {
      label: 'Destek',
      children: [terms.tr, privacy.tr],
    },
  },
]
