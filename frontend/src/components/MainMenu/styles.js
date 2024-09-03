import styled from 'styled-components';

export const StyledMainMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ccf;
  width:100vw;
  height:100vh;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(100%, 200px);
  border: 20px solid #88f;
  background-color: #ccf;
  padding: 20px;
  margin-top: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const Input = styled.input`
  flex-grow: 1;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%; // Make Input take full width of InputContainer
`;

export const AvatarControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const AvatarControl = styled.div`
    width: 15px;
    height: 15px;
    padding: 5px 0;
    display: flex;
    align-items: center;
`;

export const ControlButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  font-size: 24px;
  cursor: pointer;
  margin: 0 10px;
`;

export const JoinButton = styled.button`
    flex-grow: 1;
    box-sizing: border-box;
    background-color: #080;
    color : white;
    border: 3px solid #050;
    padding: 10px;
    cursor: pointer;
    width: 100%; // Make JoinButton take full width of InputContainer
    &:hover {
        filter: brightness(90%); // Apply a brightness filter on hover
    }
`;
