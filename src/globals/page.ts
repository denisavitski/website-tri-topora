import { Morph } from 'aptechka/morph'
import { scrollToElement } from 'aptechka/utils'

export const morph = new Morph({
  trailingSlash: true,
})

morph.preprocessor = (e) => {
  document.documentElement.classList.add('out')
  e.resolve()
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

function updateScrollElement() {
  scrollElement.current?.removeEventListener('scroll', scrollListener)

  scrollElement.current = document.querySelector<HTMLElement>('.morph__sheet')!

  scrollElement.current.addEventListener('scroll', scrollListener)

  scrollListener()
}

document.addEventListener('morphBeforeElementOut', (e) => {
  const state = e.detail.state

  if (typeof state === 'string' && state.includes('scroll:')) {
    const selector = state.replace('scroll:', '').trim()

    setTimeout(() => {
      scrollToElement(selector, { offset: '.header__content' })
    }, 100)
  }
})

document.addEventListener('morphAfterElementOut', () => {
  updateScrollElement()

  document.documentElement.classList.remove('out')

  dispatchEvent(new Event('resize'))
})

addEventListener('load', () => {
  document.documentElement.classList.add('page-loaded')

  updateSize()
  updateScrollElement()

  setTimeout(() => {
    dispatchEvent(new Event('resize'))
  }, 0)
})

addEventListener('resize', updateSize)
