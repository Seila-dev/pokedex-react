import { styled } from 'styled-components';

export const Button = (props) => {
    
    return (
        <StyledButton {...props}
        />
    )
}

const StyledButton = styled.button`
    border-radius: 10px;
    width: 100%;
    cursor: pointer;
    padding: 5px 20px;
    border: none;
    height: 50px;
    background: #000;
    color: #fff; 
    display: flex;
    align-items: center;
    justify-content: center;

    &.bottom-button {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: auto;
    }
    `;