import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { IconX, IconSearch } from '@tabler/icons-react'

let TIMEOUT = null

const SearchBar = ({ onChange }) => {
    const [searchTerm, setSearchTerm] = useState(null)
    const inputRef = useRef(null)

    const onChangeHandler = (event) => {
        clearTimeout(TIMEOUT)
        TIMEOUT = setTimeout(() => {
            setSearchTerm(event.target.value)
        }, 300)
    }

    const clearSearch = () => {
        if (inputRef.current) {
            inputRef.current.value = ''
        }
        setSearchTerm('')
    }

    useEffect(() => {
        if (searchTerm !== null && onChange) {
            onChange(searchTerm)
        }
    }, [searchTerm])

    return (
        <div className="field has-addons is-small is-justify-content-flex-end">
            <p className="control has-icons-left">
                <input
                    className="input is-rounded is-small"
                    type="search"
                    placeholder="Search"
                    onChange={onChangeHandler}
                    ref={inputRef}
                    defaultValue={searchTerm}
                />
                <span className="icon is-small is-left">
                    <IconSearch height={16} />
                </span>
            </p>
            <p className="control">
                <button className="button is-small is-rounded">
                    <IconX height={16} onClick={clearSearch} />
                </button>
            </p>
        </div>
    )
}

SearchBar.propTypes = {
    onChange: PropTypes.func
}

export default SearchBar
