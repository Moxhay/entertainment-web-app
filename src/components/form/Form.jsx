import PropTypes from 'prop-types'

export const Form = ({ children, title, handleSubmit }) => {
    return (
        <form
            onSubmit={handleSubmit}
            className="flex h-full w-full max-w-[327px] flex-col gap-9 rounded-xl bg-secondaryDarkBlue p-7 md:max-w-[400px]"
        >
            <h1 className="font-Inter text-3xl font-extralight text-primaryWhite">
                {title}
            </h1>
            <div className="flex flex-col gap-3">{children}</div>
        </form>
    )
}
Form.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}
