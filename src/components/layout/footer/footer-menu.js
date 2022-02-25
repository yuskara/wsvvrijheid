import ROUTES from 'config/routes.json'

const { project, about, contact, terms, privacy, volunteer, donate } = ROUTES

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
      children: [project.en, volunteer.en, donate.en],
    },
    nl: {
      label: 'Menu',
      children: [project.nl, volunteer.nl, donate.nl],
    },
    tr: {
      label: 'Menu',
      children: [project.tr, volunteer.tr, donate.tr],
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
