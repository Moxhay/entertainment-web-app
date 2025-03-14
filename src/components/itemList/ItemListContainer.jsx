import PropTypes from 'prop-types';

export const ItemListContainer = ({ children }) => (
    <div className="grid grid-cols-1 justify-center gap-3 xs:grid-cols-[repeat(auto-fill,minmax(0,164px))] sm:grid-cols-[repeat(auto-fill,minmax(0,220px))] lg:grid-cols-[repeat(auto-fill,minmax(0,280px))] lg:justify-start">
        {children}
    </div>
);

ItemListContainer.propTypes = {
    children: PropTypes.node.isRequired
};
