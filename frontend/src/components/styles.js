import styled from 'styled-components';

export const StyledSuggestionsContainer = styled.div`
    position: absolute;
    left: 0;
    z-index: 1;
    background-color: white;
    border : 1px solid black;
    display: flex;
    flex-direction: column;
`
export const StyledSuggestionItem = styled.div`
    cursor: pointer;
    text-align: left; 
    border: 0;
    background: rgba(0, 0, 0, 0);
    padding: 5px;
    background: white;
    &.highlighted {
        background: lightgray;
    }
`