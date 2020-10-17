import styled from 'styled-components/native';

export const RoundedButton = styled.TouchableOpacity<{ color?: string }>`
  background: ${props => props.color || props.theme.colors.white};
  padding: 10px;

  border-radius: 1000px;

  width: 60px;
  height: 60px
  display: flex;
  padding-top: 15px;
  padding-left: 10px;
  box-shadow: 7px 5px 5px #0000003d;
`;
