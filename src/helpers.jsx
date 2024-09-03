import { useLocation } from 'react-router-dom'

export const useButtonColor = (targetPath) => {
    const { pathname } = useLocation()
    return pathname === targetPath ? 'white' : '#5A698F'
}
