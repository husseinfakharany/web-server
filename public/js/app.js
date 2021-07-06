console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector("input")
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    const URL = '/weather?address='+location

    fetch(URL).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            return messageOne.textContent = data.error
        }
        messageOne.textContent = data[0].location
        messageTwo.textContent = "It is currently " + data[1].temperature + "°"
        })  
    })
})