import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Modal = ({ children, className, contentClassName, isOpen, title, footer, onClose }) => {
    return (
        <div className={classNames('modal', className, { 'is-active': isOpen })}>
            <div className="modal-background" />
            <div className={classNames('modal-card', contentClassName)}>
                <header className="modal-card-head">
                    <div className="modal-card-title">{title}</div>
                    <button className="delete" aria-label="close" onClick={onClose} />
                </header>
                <section className="modal-card-body">{children}</section>
                <footer className="modal-card-foot">{footer}</footer>
            </div>
        </div>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.any,
    footer: PropTypes.any
}

Modal.defaultProps = {
    isOpen: false
}

export default Modal
