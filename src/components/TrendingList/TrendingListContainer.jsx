import PropTypes from 'prop-types';

export function TrendingListContainer({ children, Ref }) {
    return (
        <div className={`flex w-full flex-col gap-3 overflow-x-hidden pb-5`} ref={Ref}>
            {children}
        </div>
    );
}

TrendingListContainer.propTypes = {
    children: PropTypes.node,
    Ref: PropTypes.object.isRequired
};
