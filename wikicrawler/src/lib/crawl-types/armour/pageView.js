async function extract () {
  return {
    name: document.querySelector('h1').innerText
  }
}

module.exports = { extract };