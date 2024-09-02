import { StyledSuggestionItem } from "./styles";
import TextBoldIndices from "../Shared/TextBoldIndices";
import { StyledText } from "../Shared/styles";

const WordSuggestion = function({ suggestion, highlighted, ...props}){
    return (
        <StyledSuggestionItem className={highlighted && 'highlighted'} {...props}>
            <StyledText><TextBoldIndices word={suggestion.word} indices={suggestion.indices} /></StyledText>
        </StyledSuggestionItem>
    );
}
export default WordSuggestion;