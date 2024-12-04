import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import styled from 'styled-components';

export const Background = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <StyledBackground theme={theme}>
        </StyledBackground>
    );
}

const StyledBackground = styled.div`
    min-height: 100vh;
    width:100%;
    position:fixed;
    top: 0;
    left: 0;
    z-index: -1;
    color: ${({ theme }) => theme.color};
    background-color: ${({ theme }) => theme.background}; 
`;
