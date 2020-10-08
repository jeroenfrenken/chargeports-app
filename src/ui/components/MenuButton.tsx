import styled from 'styled-components/native';

export const MenuButton = styled.TouchableOpacity<{ color?: string }>`
  background: ${props => props.color || props.theme.colors.primary};
  padding: 10px;

  border-radius: 10px;
  margin-right: 10px;
  margin-top: 18px;

  width: 40px;
  height: 42px
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 5px 5px #0000003d;
`;
