import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

export const NormalButtonContainer = styled.TouchableOpacity<{ color?: string }>`
  background: ${props => props.color || props.theme.colors.primary};
  padding: 5px;
  border-radius: 2px;
  width: 100%;
  min-height: 40px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const NormalButtonLabel = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.buttonTextSize};
`;

export interface FilledButtonProps extends TouchableOpacityProps {
    text?: string;
    color?: string;
    children?: React.ReactNode;
}

export default (props: FilledButtonProps) => {
    return (
        <NormalButtonContainer {...props}>
            {props.children ?
                props.children : (
                    <NormalButtonLabel>
                        {props.text}
                    </NormalButtonLabel>
                )}
        </NormalButtonContainer>
    );
}
