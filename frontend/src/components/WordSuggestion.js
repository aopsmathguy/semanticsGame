import { StyledSuggestionItem } from "./styles";
import TextBoldIndices from "./TextBoldIndices";

const WordSuggestion = function({ suggestion, highlighted, ...props}){
    return (
        <StyledSuggestionItem className={highlighted && 'highlighted'} {...props}>
            <TextBoldIndices word={suggestion.word} indices={suggestion.indices} />
        </StyledSuggestionItem>
    );
}
export default WordSuggestion;