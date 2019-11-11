import debug from 'debug'

const log = debug(module.id)

export const ELEMENT_SELECTOR = '[data-component="json-select-widget"]'

document.querySelectorAll(ELEMENT_SELECTOR)
    .forEach(element => {
        import("./component")
            .then(JsonSelectWidget => {
                log('element', element)
                JsonSelectWidget.mount(element)
            })
    })