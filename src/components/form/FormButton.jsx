import PropTypes from 'prop-types';

export const FormButton = ({ submit, disabled, children }) => {
    return (
        <button
            type={'submit'}
            className="bg-primaryRed text-primaryWhite hover:bg-primaryWhite group items-center justify-center rounded-lg py-3 transition-colors duration-300 ease-in-out hover:text-black"
            onSubmit={submit}
            disabled={disabled}
        >
            {disabled ? (
                <span className="text-surface dark:text-primaryWhite group-hover:text-primaryRed inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            ) : (
                children
            )}
        </button>
    );
};
FormButton.propTypes = {
    submit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    children: PropTypes.node
};
