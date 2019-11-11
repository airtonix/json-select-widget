import React from 'react'
import {render} from 'react-dom'
import debug from 'debug'

const log = debug(module.id)

export default class JsonSelectWidget extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            options: [
            ]
        }
    }

    generateOptions (options) {
        const {
            placeholder
        } = this.props

        return [
            !!placeholder
                && {disabled: true, name: placeholder, selected: true},
            ...options
        ]
    }

    componentDidMount () {
        const {
            collection = [],
            initialise = false,
            targetSelector,
        } = this.props

        if (!!initialise){
            this.setState({
                options: this.generateOptions(collection)
            })
        }

        if (!!targetSelector) {
            this.target = document.querySelector(targetSelector)
            this.watch()
        }
    }

    watch () {
        const {
            targetEvent = 'change',
        } = this.props
        console.log('watch', this.target)
        this.target.addEventListener(
            targetEvent,
            this.handleTargetChange.bind(this)
            )
    }

    handleChange ({target: {value}}) {
        console.log('handleChange', value)
    }

    handleTargetChange ({target: {value}}) {
        console.log('handleTargetChange', value)
        const {
            collection,
            filterKey = 'id'
        } = this.props

        this.setState({
            options: collection
                .filter(item => item[filterKey] == value)
        })
    }

    render () {
        const {
            debug
        } = this.props

        const {
            options = []
        } = this.state

        return (
            <React.Fragment>
            <select
                onChange={this.handleChange.bind(this)}
                >
            {options.map(option => (
                <option
                    disabled={!!option.disabled}
                    selected={!!option.selected}
                    id={option.id}
                    key={option.id}
                    value={option.id}>
                    {option.name}
                </option>
            ))}
            </select>
            {!!debug && (
                <pre>{ JSON.stringify(options, null, 3)}</pre>
            )}
            </React.Fragment>
        )
    }
}

JsonSelectWidget.defaultProps = {
    placeholder: 'Select one of..'
}

JsonSelectWidget.mount = (element, props) => {
    render(
        <JsonSelectWidget
            {...props}
            />,
        element
    )
}