import { useLocation } from 'react-router-dom';

export const useButtonColor = (targetPath) => {
    const { pathname } = useLocation();
    const targetPathLowerCase = targetPath.toLowerCase();
    const pathLowerCase = pathname.toLowerCase();

    return pathLowerCase === targetPathLowerCase ||
        pathLowerCase.includes(`${targetPathLowerCase}/`) ||
        pathLowerCase.startsWith(`${targetPathLowerCase}search`) ||
        pathLowerCase.includes(`${targetPathLowerCase}/search`)
        ? 'white'
        : '#5A698F';
};
