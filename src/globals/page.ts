import { Morph } from 'aptechka/morph'

export const morph = new Morph({
  trailingSlash: true,
})

morph.preprocessor = (e) => {
  document.documentElement.classList.add('out')
  e.resolve()
}

morph.postprocessor = () => {
  document.documentElement.classList.remove('out')
  dispatchEvent(new Event('resize'))
}

export const scrollElement = {
  current: null! as HTMLElement,
}

function updateSize() {
  const clientWidth = document.documentElement.clientWidth

  document.documentElement.style.setProperty(
    '--inner-height',
    innerHeight + 'px',
  )

  document.documentElement.style.setProperty(
    '--client-width',
    clientWidth + 'px',
  )
}

function scrollListener() {
  if (scrollElement.current.scrollTop > 0) {
    document.documentElement.classList.add('scrolled')
  } else {
    document.documentElement.classList.remove('scrolled')
  }
}

function updateScrollElement(document: Document) {
  scrollElement.current?.removeEventListener('scroll', scrollListener)

  scrollElement.current = document.querySelector<HTMLElement>('.morph__sheet')!

  scrollElement.current.addEventListener('scroll', scrollListener)

  scrollListener()
}

document.addEventListener('morphStart', (e) => {
  updateScrollElement(e.detail.newDocument)
})

addEventListener('load', () => {
  document.documentElement.classList.add('page-loaded')
  updateSize()
})

updateScrollElement(document)
addEventListener('resize', updateSize)
