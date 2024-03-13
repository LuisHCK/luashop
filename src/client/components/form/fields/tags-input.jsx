import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import snakeCase from 'lodash/snakeCase'
import isArray from 'lodash/isArray'
import { IconAlignLeft } from '@tabler/icons-react'
import styles from './styles.module.scss'
import classNames from 'classnames'

const TagsInput = ({ id, name, label, placeholder, value = [], onChange }) => {
    const [tagList, setTagList] = useState(value)

    const tags = useMemo(() => {
        if (!isArray(tagList)) {
            return
        }
        return tagList.map((val) => (
            <div key={snakeCase(val)}>
                <div className="control mb-0">
                    <div className="tags has-addons">
                        <span className="tag is-info is-rounded">{val}</span>
                        <button
                            onClick={() => removeTag(val)}
                            className={classNames('tag is-delete is-rounded', styles.tagButton)}
                            type="button"
                        />
                    </div>
                </div>
            </div>
        ))
    }, [tagList, value])

    const keydownHandler = (event) => {
        const tagValue = event.currentTarget.value
        if (event.key === 'Enter' && !!tagValue && onChange) {
            const tagExists = tagList && tagList.find((t) => t === tagValue)

            if (tagExists) {
                event.currentTarget.value = ''
                return
            }

            const updatedList = [...tagList, tagValue]
            setTagList(updatedList)

            onChange({
                value: updatedList,
                name
            })

            event.currentTarget.value = ''
            event.currentTarget.focus()
        }
    }

    const removeTag = (value) => {
        const updatedList = tagList.filter((t) => t !== value)
        setTagList(updatedList)

        // Dispatch onChange event
        onChange({
            value: updatedList,
            name
        })
    }

    useEffect(() => {
        setTagList(value)

        return () => {
            setTagList([])
        }
    }, [value])

    return (
        <div className="field">
            <label htmlFor={id || name} className="label">
                {label}
            </label>
            <div className={styles.tagsList}>{tags}</div>
            <div
                className={classNames(
                    'control input is-rounded has-icons-left',
                    styles.tagsContainer
                )}
            >
                <input
                    onKeyDown={keydownHandler}
                    className={styles.tagsInput}
                    type="text"
                    placeholder={placeholder}
                />

                <span className="icon is-small is-left">
                    <IconAlignLeft />
                </span>
            </div>
        </div>
    )
}

TagsInput.propTypes = {}

export default TagsInput
