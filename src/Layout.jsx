import PropTypes from 'prop-types'

const Layout = ({children}) => {
  return (
      <main className='bg-primaryDarkBlue w-full h-full min-h-screen'>
          {children}
      </main>
  )
}

export default Layout;
Layout.propTypes = {
    children: PropTypes.node,
};