async function extract () {
  const url = document.location.href;
  const headerID = url.match(/([^#]*)$/)[0];
  const header = document.querySelector(`#${headerID}`).parentElement;
  const name = header.innerText;
  
  const passiveParagraph = header.nextElementSibling;
  const passive = passiveParagraph.innerText.match(/:(.*)/)[1].trim();
  
  const activeParagraph = passiveParagraph.nextElementSibling;
  const active = activeParagraph.innerText.match(/:(.*)/)[1].trim();
  
  return {
    url,
    name,
    active,
    passive
  }
}

module.exports = { extract };