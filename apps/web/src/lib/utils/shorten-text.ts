const MAXIMAL_TEXT_LENGTH = 50

export const shortenText = (text: string) => {
  if (text.length <= MAXIMAL_TEXT_LENGTH) {
    return text
  }
  return `${text.substr(0, MAXIMAL_TEXT_LENGTH)}...`
}
