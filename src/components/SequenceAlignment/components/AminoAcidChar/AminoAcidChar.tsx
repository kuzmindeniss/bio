import { Box, type BoxProps } from '@mui/material';
import { AMINO_ACID_TO_KIND_MAP, AminoAcid, AminoAcidKind } from '@/constants';
import { memo } from 'react';
import { CHAR_BORDER_RADIUS, CHAR_FONT_FAMILY, CHAR_FONT_SIZE, CHAR_FONT_WEIGHT, CHAR_PADDING } from './constants';

const AminoAcidColorScheme: Record<AminoAcidKind, string | null> = {
  [AminoAcidKind.Cysteine]: '#FFEA00',
  [AminoAcidKind.Hydrophobic]: '#67E4A6',
  [AminoAcidKind.Glycine]: '#C4C4C4',
  [AminoAcidKind.NegativelyCharged]: '#FC9CAC',
  [AminoAcidKind.PositivelyCharged]: '#BB99FF',
  [AminoAcidKind.PolarUncharged]: '#80BFFF',
  [AminoAcidKind.Gap]: null,
};

interface SequenceAlignmentVisualizationItemProps extends BoxProps {
  aminoAcid: AminoAcid;
  sequenceName: string;
  isDifferFromPrevSequence: boolean;
}

const AminoAcidChar = memo(({
  aminoAcid,
  sequenceName,
  isDifferFromPrevSequence,
  ...props
}: SequenceAlignmentVisualizationItemProps) => {

  const backgroundColor = sequenceName === '1' || isDifferFromPrevSequence ?
    AminoAcidColorScheme[AMINO_ACID_TO_KIND_MAP[aminoAcid]] : undefined;

  return (
    <Box
      component="span"
      sx={{
        fontFamily: CHAR_FONT_FAMILY,
        padding: CHAR_PADDING,
        backgroundColor,
        borderRadius: CHAR_BORDER_RADIUS,
        fontWeight: CHAR_FONT_WEIGHT,
        fontSize: CHAR_FONT_SIZE,
      }}
      {...props}
    >
      {aminoAcid}
    </Box>
  );
});

export default AminoAcidChar;
