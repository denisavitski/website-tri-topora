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

  scrollElement.current = document.querySelector<HTMLElement>('.scroll')!

  scrollElement.current.addEventListener('scroll', scrollListener)

  scrollListener()
}

addEventListener('load', () => {
  document.documentElement.classList.add('page-loaded')

  updateSize()
  updateScrollElement()

  setTimeout(() => {
    dispatchEvent(new Event('resize'))
  }, 0)
})

addEventListener('resize', updateSize)
