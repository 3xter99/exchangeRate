// 'use strict';
//
// const one = document.querySelector('.one')
// const two = document.querySelector('.two')
// const oneBtn = document.querySelector('.oneBtn')
// const twoBtn = document.querySelector('.twoBtn')
// const result = document.querySelector('.result')
// const firstInput = document.querySelector('.first-input')
// const secondInput = document.querySelector('.second-input')
//
// firstInput.addEventListener('input', () => {
//     firstInput.value = firstInput.value.replace(/[^0-9]/, '')
// })
//
//
// one.addEventListener('click', (event) => {
//     const target = event.target
//     console.log(target.textContent)
//     oneBtn.textContent = target.textContent
//     firstInput.value = ''
//     secondInput.value = ''
//     if (oneBtn.textContent === "Euro") {
//       twoBtn.textContent = 'USD'
//     } else twoBtn.textContent = 'Euro'
// })
//
// result.addEventListener('click', () => {
//     fetch('https://api.exchangeratesapi.io/latest')
//         .then((response) => {
//             if (response.status !== 200) {
//               throw new Error('Ошибка')
//             }
//             return response.json()
//         })
//         .then((response) => {
//             console.log(response)
//
//             if (oneBtn.textContent === 'Euro') {
//                 secondInput.value = firstInput.value * response.rates.USD
//             } else {
//                 secondInput.value = firstInput.value / response.rates.USD
//             }
//         })
//         .catch(error => console.error(error))
// })
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

let value = {

}


one.addEventListener('click', (event) => {
    const target = event.target
    console.log(target.textContent)
    value.firstValue = target.textContent
    oneBtn.textContent = target.textContent
    firstInput.value = ''
    secondInput.value = ''

})
two.addEventListener('click', (event) => {
    const target = event.target
    twoBtn.textContent = target.textContent
    value.secondValue = target.textContent
})

fetch('https://api.exchangeratesapi.io/latest')
    .then((response) => {
        if (response.status !== 200) {
            throw new Error('Ошибка')
        }
        return response.json()
    })
    .then((response) => {
        console.log(response)
        creating(response)

        // if (oneBtn.textContent === 'Euro') {
        //     secondInput.value = firstInput.value * response.rates.USD
        // } else {
        //     secondInput.value = firstInput.value / response.rates.USD
        // }
        return response
    })
    .then(response => {
        result.addEventListener('click', () => {
            console.log(response);
            secondInput.value = firstInput.value * response.rates[twoBtn.textContent] / response.rates[oneBtn.textContent]
        })
    })
    .catch(error => console.error(error))

const creating = response => {
    console.log(response.rates);
    for (let key in response.rates) {
        const dropdownItem = document.createElement('a')
        dropdownItem.classList.add('dropdown-item')
        dropdownItem.textContent = key;
        const dropdownItemTwo = dropdownItem.cloneNode(true)
        one.append(dropdownItem)
        two.append(dropdownItemTwo)
    }

}

const change = document.querySelector('.change')
change.addEventListener('click', () => {
    [oneBtn.textContent, twoBtn.textContent] = [twoBtn.textContent, oneBtn.textContent]
    })



