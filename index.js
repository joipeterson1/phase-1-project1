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
        const dogContainer = document.querySelector('#dogname')
        const displaydogName = document.createElement('h2')
        displaydogName.textContent = dog.dogName
        dogContainer.appendChild(displaydogName)

        const imageDivider = document.createElement('div')
        const displaydogimage = document.createElement('img')
        imageDivider.appendChild(displaydogimage)
        //dogimage.id = dog.id
        displaydogimage.src = dog.imageUrl
        displaydogimage.classList.add('dog-image')
        displaydogimage.addEventListener('click', imageClick)
        
        displaydogimage.addEventListener('mouseover', mouseoverEvent)
        displaydogimage.addEventListener('mouseout', removeGrayscale)
        displaydogName.appendChild(imageDivider)
      }) 
    }
    )
/*
Grab Image, create an "click" event listener.
Whenever the image is clicked it will Fetch the details forEach object in db.json that is clicked
*/
function imageClick(event) {
  // grab the clicked image
  const targetImage = event.target
  //debugger
  const dog = dogs.find(d => d.imageUrl === targetImage.src)
  if (dog) {
    console.log(dog)
  //Display the details for the clicked dog image
  const detailsContainer = document.createElement('div')
  const priceElement = document.createElement('h6')
  const dogAgeElement = document.createElement('h6')
  const dogBreedElement = document.createElement('h6')
  const dogSexElement = document.createElement('h6')
  const pickupLocationElement = document.createElement('h6')

  priceElement.innerText = dog.price
  dogAgeElement.innerText = dog.dogAge
  dogBreedElement.innerText = dog.dogBreed
  dogSexElement.innerText = dog.dogSex
  pickupLocationElement.innerText = dog.pickupLocation
    
  detailsContainer.appendChild(priceElement)
  detailsContainer.appendChild(dogAgeElement)
  detailsContainer.appendChild(dogSexElement)
  detailsContainer.appendChild(dogBreedElement)
  detailsContainer.appendChild(pickupLocationElement)
  const imageDivider = targetImage.parentNode
  imageDivider.appendChild(detailsContainer)
 }   
}


/*Grab the image, create a "mouseover" event.
Whenever the mouse is over the images, it will grey out the picture.
*/

  function mouseoverEvent(image) {
    image.target.style.filter = 'grayscale(100%)'
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

  const formdogName = document.getElementById('dogName')
  const formname = document.getElementById('name')

  dognameInput.innerText = formdogName.value
  nameInput.innerText = formname.value

  adoptionStatement.innerText = `${nameInput.innerText} has adopted ${dognameInput.innerText}!`

  formInputContainer.appendChild(adoptionStatement)
}
}
document.addEventListener('DOMContentLoaded', init)