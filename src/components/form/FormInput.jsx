import PropTypes from 'prop-types';

const InputLabel = ({ type, name, value, onChange, onBlur, errors, touched, placeholder }) => {
    return (
        <label
            className={
                errors && touched
                    ? 'border-b-primaryRed flex w-full flex-row border-b bg-inherit py-3'
                    : 'border-b-greyishBlue text-primaryWhite focus-within:border-b-primaryWhite flex w-full flex-row border-b bg-inherit py-3'
            }
        >
            <input
                type={type}
                name={name}
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                className="font-Inter text-primaryWhite placeholder-primaryGrey focus:text-primaryWhite bg-inherit bg-origin-content pl-5 text-sm caret-red-500 outline-hidden autofill:bg-none focus:ring-0"
                placeholder={placeholder}
            />
            {errors && touched && (
                <div className="font-Inter text-primaryRed hover:text-primaryRed focus:text-primaryRed active:text-primaryRed w-full self-end bg-inherit text-end text-xs">
                    {errors}
                </div>
            )}
        </label>
    );
};

export default InputLabel;
InputLabel.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    errors: PropTypes.string,
    touched: PropTypes.bool,
    placeholder: PropTypes.string
};
