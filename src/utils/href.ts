export function tryCreateHrefFromContact(contact: string) {
  let href = ''

  if (!href) {
    if (contact.includes('@')) {
      href = `mailto:${contact.trim()}`
    } else if (contact.trim().startsWith('+')) {
      href = `tel:${contact.replace(/[^0-9\\.\\+]+/g, '')}`
    }
  }

  return href
}
