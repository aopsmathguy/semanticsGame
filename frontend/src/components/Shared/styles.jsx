import styled from "styled-components";

export const StyledAvatarContainer = styled.div`
    user-select: none;
    position: relative;
    flex: 0 0 auto;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
`

export const StyledSpriteImage = styled.div`
    pointer-events: none;
    user-select: none;
    position: absolute;
    background-repeat: no-repeat;
    filter: ${({ filter }) => filter};
    
    display: flex;
    align-items: center;
    justify-content: center;
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: pixelated;
`

export const StyledText = styled.span`
    color: ${({ color }) => color || "black"};
    font-size: ${({ fontSize }) => fontSize || "1"}rem;
`;
