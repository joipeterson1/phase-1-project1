/*
When the page loaded fully, it will fetch images forEach object in db.json
*/
//load the page fully
const baseUrl = 'http://localhost:3000'
//fetch services from db.json
function init() {
  fetch(`${baseUrl}/dogs`)
    .then(response => response.json())
    .then(data => {
      data.forEach(data => {
/*
for each data promised it will return:
The dog name which will create an h2 element on top of the img
the dog image which will create a new img element and append the element
to a new div element that will also be created
*/
        const dogDetailContainer = document.querySelector('#dogname')
        const dogName = document.createElement('h2')
        dogName.textContent = data.dogName
        dogDetailContainer.appendChild(dogName)

        const imageDivider = document.createElement('div')
        const dogimage = document.createElement('img')
        imageDivider.appendChild(dogimage)
          dogimage.src = data.imageUrl
          dogimage.classList.add('dog-image')
        dogName.appendChild(imageDivider)
      })
    }
    )