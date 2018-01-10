const URL = 'http://localhost:3000/suggest'

const generateIdxsArray = () => Array.from({ length: window.ideas.length }, (_, idx) => idx)
let allIdxs = generateIdxsArray()

const suggestSomething = (ideaText, ideaLink) => () => {
  const ideasLength = allIdxs.length
  const randomIdx = allIdxs[Math.floor(Math.random() * ideasLength)]
  const newIdea = window.ideas[randomIdx]
  allIdxs = allIdxs.length === 1
    ? generateIdxsArray()
    : allIdxs.filter(v => v !== randomIdx)
  const a = document.getElementById('suggestion')
  ideaLink.href = newIdea.url
  ideaText.innerHTML = newIdea.text
}

const submitForm = (form, cb) => async e => {
  e.preventDefault()
  const body = {
    link: window.btoa(`${form.link.value}`),
    text: window.btoa(`${form.text.value}`),
  }
  const promisedFetch = new Promise((resolve, reject) => {
    window.fetch(
      URL,
      { method: 'POST', body: JSON.stringify(body) },
    ).then(res => res.json()).then(resolve).catch(reject)
  })
  const sent = await promisedFetch
  cb()
}

const toggleForm = container => () => {
  container.classList.toggle('flex')
  container.classList.toggle('dn')
}

const startScript = () => {
  const another = document.getElementById('another')
  const ideaText = document.getElementById('idea-text')
  const ideaLink = document.getElementById('idea-link')
  const suggestButton = document.getElementById('suggest')
  const formContainer = document.getElementById('form-container')
  const form = document.getElementById('form')
  const setSuggestion = suggestSomething(ideaText, ideaLink)
  const toggleContainer = toggleForm(formContainer)
  form.addEventListener('submit', submitForm(form, toggleContainer))
  another.addEventListener('click', setSuggestion)
  suggestButton.addEventListener('click', toggleContainer)
  setSuggestion()
}

document.addEventListener('DOMContentLoaded', startScript)
