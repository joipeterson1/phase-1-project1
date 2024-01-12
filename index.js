/*
When the page loaded fully, it will fetch images forEach object in db.json
*/
let dogs = []
//load the page fully
const baseUrl = 'http://localhost:3000'
//fetch services from db.json
function init() {
  fetch(`${baseUrl}/dogs`)
    .then(response => response.json())
    .then(data => {
        dogs = data
        data.forEach(dog => {
/*
for each data promised it will return:
The dog name which will create an h2 element on top of the img
the dog image which will create a new img element and append the element
to a new div element that will also be created
*/
        const dogDetailContainer = document.querySelector('#dogname')
        const dogName = document.createElement('h2')
        dogName.textContent = dog.dogName
        dogDetailContainer.appendChild(dogName)

        const imageDivider = document.createElement('div')
        const dogimage = document.createElement('img')
        imageDivider.appendChild(dogimage)
        dogimage.id = dog.id
        dogimage.src = dog.imageUrl
        dogimage.classList.add('dog-image')
        dogimage.addEventListener('click', imageClick)
        dogimage.addEventListener('mouseover', mouseoverEvent)
        dogimage.addEventListener('mouseout', removeGrayscale)
        dogName.appendChild(imageDivider)
      })
    }
    )
// EVENT LISTENER ISSUE
/*
Grab Image, create an "click" event listener.
Whenever the image is clicked it will Fetch the details forEach object in db.json that is clicked
*/

function imageClick(event) {
  // Display the details for the clicked dog image
  const targetImage = event.target
  //const detailsContainer = document.createElement('div')
  const priceElement = document.createElement('p')
  const dogAgeElement = document.createElement('p')
  const dogSexElement = document.createElement('p')
  const pickupLocationElement = document.createElement('p')

  priceElement.textContent = targetImage.price
  dogAgeElement.textContent = targetImage.dogAge
  dogSexElement.textContent = targetImage.dogSex
  pickupLocationElement.textContent = targetImage.pickupLocation

  //detailsContainer.appendChild(priceElement)
  priceElement.appendChild(dogAgeElement)
  dogAgeElement.appendChild(dogSexElement)
  dogSexElement.appendChild(pickupLocationElement)

  targetImage.appendChild(priceElement)
}

//EVENT LISTENER ISSUE
/*
Grab the image, create a "mouseover" event.
Whenever the mouse is over the images, it will grey out the picture.
*/

  function mouseoverEvent(image) {
    image.target.style.filter = 'grayscale(80%)'
  }
  
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