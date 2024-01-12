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
// EVENT LISTENER ISSUE
/*
Grab Image, create an "click" event listener.
Whenever the image is clicked it will Fetch the details forEach object in db.json that is clicked
*/

const dogimages = document.getElementsByClassName('dog-image')

Array.from(dogimages).forEach(image => {
  image.addEventListener('click', imageClick)
});

function imageClick(image) {
    fetch(`${baseUrl}/dogs`)
        .then(response => response.json())
        .then(data => {
  // Display the details for the clicked dog image
  const detailsContainer = document.createElement('div')
  const priceElement = document.createElement('p')
  const dogAgeElement = document.createElement('p')
  const dogSexElement = document.createElement('p')
  const pickupLocationElement = document.createElement('p')

  priceElement.textContent = data.price
  dogAgeElement.textContent = data.dogAge
  dogSexElement.textContent = data.dogSex
  pickupLocationElement.textContent = data.pickupLocation

  detailsContainer.appendChild(priceElement)
  priceElement.appendChild(dogAgeElement)
  dogAgeElement.appendChild(dogSexElement)
  dogSexElement.appendChild(pickupLocationElement)

  image.parentNode.appendChild(detailsContainer)
})
}

//EVENT LISTENER ISSUE
/*
Grab the image, create a "mouseover" event.
Whenever the mouse is over the images, it will grey out the picture.
*/

Array.from(dogimages).forEach((image) => {
    image.addEventListener('mouseover', mouseoverEvent)
  })
  
  function mouseoverEvent(image) {
    image.target.style.filter = 'grayscale(50%)'
  }
  
  Array.from(dogimages).forEach((image) => {
    image.addEventListener('mouseout', removeGrayscale)
  })
  
  function removeGrayscale(image) {
    image.target.style.filter = 'grayscale(0%)'
  }

  /* Grab the form, create a submit event.
When the form is submitted i will prevent the default,
the Name, dog name of the input will display under the form.
*/
const adoptionForm = document.getElementById('adoption-form')
const formInputContainer = document.getElementById('adopted-dogs')

adoptionForm.addEventListener('submit', formEvent)

function formEvent(event) {
  event.preventDefault()

  const nameInput = document.createElement('p')
  const dognameInput = document.createElement('p')
  const adoptionStatement = document.createElement('p')

  const dogName = document.getElementById('dogName')
  const name = document.getElementById('name')

  dognameInput.innerText = dogName.value
  nameInput.innerText = name.value

  adoptionStatement.innerText = `${nameInput.innerText} has adopted ${dognameInput.innerText}!`

  formInputContainer.appendChild(adoptionStatement)
}
}
document.addEventListener('DOMContentLoaded', init)