import states from "countrycitystatejson/src/country-state-city/lib/state.json"
import countries from "countrycitystatejson/src/country-state-city/lib/country.json"

import JsonSelectWidget from "./JsonSelectWidget/component"

let countriesElement = document.querySelector('#countries')
console.log(countriesElement)

JsonSelectWidget.mount(
    countriesElement,
    {
        ...countriesElement.dataset,
        collection: countries
    })

let statesElement = document.querySelector('#states')
JsonSelectWidget.mount(
    statesElement,
    {
        ...statesElement.dataset,
        collection: states
    })

if (module.hot) {
    module.hot.accept()
}