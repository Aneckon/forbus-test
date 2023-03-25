import React, { FC } from 'react';

import { Button as ButtonItem } from '@mui/material';

interface ButtonProps {
  size: 'small' | 'medium' | 'large';
  click: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  children: string;
}

export const Button: FC<ButtonProps> = ({ size, click, variant, children }) => {
  return (
    <ButtonItem size={size} variant={variant} onClick={click}>
      {children}
    </ButtonItem>
  );
};
