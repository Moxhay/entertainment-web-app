import PropTypes from 'prop-types'

const InputLabel = ({
    type,
    name,
    value,
    onChange,
    onBlur,
    errors,
    touched,
    placeholder,
}) => {
    return (
        <label
            className={
                errors && touched
                    ? 'flex w-full flex-row border-b border-b-primaryRed bg-inherit py-3'
                    : 'flex w-full flex-row border-b border-b-greyishBlue bg-inherit py-3 text-primaryWhite focus-within:border-b-primaryWhite'
            }
        >
            <input
                type={type}
                name={name}
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                className="bg-inherit bg-origin-content pl-5 font-Inter text-sm text-primaryWhite placeholder-primaryGrey caret-red-500 outline-hidden autofill:bg-none focus:text-primaryWhite focus:ring-0"
                placeholder={placeholder}
            />
            {errors && touched && (
                <div className="bg-inherit font-Inter text-xs text-primaryRed hover:text-primaryRed focus:text-primaryRed active:text-primaryRed">
                    {errors}
                </div>
            )}
        </label>
    )
}

export default InputLabel
InputLabel.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    errors: PropTypes.string,
    touched: PropTypes.bool,
    placeholder: PropTypes.string,
}
