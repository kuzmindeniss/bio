import { Box, type BoxProps } from '@mui/material';
import { memo } from 'react';
import { CHAR_BORDER_RADIUS, CHAR_FONT_FAMILY, CHAR_FONT_SIZE, CHAR_FONT_WEIGHT, CHAR_PADDING } from './constants';

const AminoAcidCharForAdjustment = memo(({
  ...props
}: BoxProps) => {
  return (
    <Box 
      component="span"
      sx={{
        display: 'inline-block',
        fontFamily: CHAR_FONT_FAMILY,
        padding: CHAR_PADDING,
        borderRadius: CHAR_BORDER_RADIUS,
        fontWeight: CHAR_FONT_WEIGHT,
        fontSize: CHAR_FONT_SIZE,
      }}
      {...props}
    >
      A
    </Box>
  );
});

export default AminoAcidCharForAdjustment;
