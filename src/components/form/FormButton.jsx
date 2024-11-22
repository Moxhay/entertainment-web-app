import PropTypes from 'prop-types'

export const FormButton = ({ submit, disabled, children }) => {
    return (
        <button
            type={'submit'}
            className="items-center justify-center rounded-lg bg-primaryRed py-3 text-primaryWhite transition-colors duration-300 ease-in-out hover:bg-primaryWhite hover:text-black"
            onSubmit={submit}
            disabled={disabled}
        >
            {disabled ? (
                <span className="text-surface inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
            ) : (
                children
            )}
        </button>
    )
}
FormButton.propTypes = {
    submit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    children: PropTypes.node,
}
