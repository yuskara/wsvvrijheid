export const truncateText = (text, maxLen) => {
  if (!text || typeof text !== 'string') return ''

  //trim the string to the maximum length
  const str = text.substr(0, maxLen)

  //re-trim if we are in the middle of a word
  return str.substr(0, Math.min(str.length, str.lastIndexOf(' ')))
}
