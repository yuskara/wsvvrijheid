import { ROUTES } from '~config'

const { activity, lotus, artStop, samenvvv, academy, blog, club, donate, volunteer, about, contact } = ROUTES

export const HEADER_MENU = [
  activity,
  {
    en: {
      label: ' Projects',
      children: [lotus.en, artStop.en, samenvvv.en, academy.en],
    },
    nl: {
      label: ' Projects',
      children: [lotus.nl, artStop.nl, samenvvv.nl, academy.nl],
    },
    tr: {
      label: ' Projects',
      children: [lotus.tr, artStop.tr, samenvvv.tr, academy.tr],
    },
  },
  blog,
  club,
  donate,
  {
    en: {
      label: 'Wsvvrijheid',
      children: [volunteer.en, about.en, contact.en],
    },
    nl: {
      label: 'Wsvvrijheid',
      children: [volunteer.nl, about.nl, contact.nl],
    },
    tr: {
      label: 'Wsvvrijheid',
      children: [volunteer.tr, about.tr, contact.tr],
    },
  },
]
