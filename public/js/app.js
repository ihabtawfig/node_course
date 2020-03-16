fetch('http://localhost:3000/weather?location=khartoum').then((response)=>{
    response.json().then( (data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    const location = search.value
    console.log(search.value)  
    messageOne.textContent = 'Loading' 
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?location='+location).then((response)=>{
    response.json().then( (data) => {
        
        //data = JSON.stringify(data)
        if(data['error']){
            messageOne.textContent = "Unable to find location. Try another search."
           
        }else{
            console.log(data)
            messageOne.textContent = data['Forecast']
            messageTwo.textContent = data['Location']
        }
    })
})
})