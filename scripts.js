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

const startScript = () => {
  const another = document.getElementById('another')
  const ideaText = document.getElementById('idea-text')
  const ideaLink = document.getElementById('idea-link')
  const suggestButton = document.getElementById('suggest')
  const setSuggestion = suggestSomething(ideaText, ideaLink)
  another.addEventListener('click', setSuggestion)
  setSuggestion()
}

document.addEventListener('DOMContentLoaded', startScript)
