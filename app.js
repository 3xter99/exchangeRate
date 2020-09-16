'use strict';

const one = document.querySelector('.one')
const two = document.querySelector('.two')
const oneBtn = document.querySelector('.oneBtn')
const twoBtn = document.querySelector('.twoBtn')
const result = document.querySelector('.result')
const firstInput = document.querySelector('.first-input')
const secondInput = document.querySelector('.second-input')

firstInput.addEventListener('input', () => {
    firstInput.value = firstInput.value.replace(/[^0-9]/, '')
})


one.addEventListener('click', (event) => {
    const target = event.target
    console.log(target.textContent)
    oneBtn.textContent = target.textContent
    firstInput.value = ''
    secondInput.value = ''
    if (oneBtn.textContent === "Euro") {
      twoBtn.textContent = 'USD'
    } else twoBtn.textContent = 'Euro'
})

result.addEventListener('click', () => {
    fetch('https://api.exchangeratesapi.io/latest')
        .then((response) => {
            if (response.status !== 200) {
              throw new Error('Ошибка')
            }
            return response.json()
        })
        .then((response) => {

            if (oneBtn.textContent === 'Euro') {
                secondInput.value = firstInput.value * response.rates.USD
            } else {
                secondInput.value = firstInput.value / response.rates.USD
            }
        })
        .catch(error => console.error(error))
})
