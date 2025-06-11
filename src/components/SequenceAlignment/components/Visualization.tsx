import { Alert, Box, Snackbar } from '@mui/material';
import { AminoAcid } from '../../../constants';
import AminoAcidChar from './AminoAcidChar/AminoAcidChar';
import { useMeasure } from '@uidotdev/usehooks';
import AminoAcidCharForAdjustment from './AminoAcidChar/ForAdjustment';
import { useMemo, useState, useRef } from 'react';
import { useAutoCopyOnSelect } from '../../../hooks/useAutoCopyOnSelect';

interface SequenceAlignmentVisualizationProps {
  sequences?: Record<string, string>;
}

const SequenceAlignmentVisualization = ({ sequences }: SequenceAlignmentVisualizationProps) => {
  const [showCopyingAlert, setShowCopyingAlert] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerMeasureRefCallback, { width: containerWidth }] = useMeasure();
  const [aminoAcidCharForAdjustmentRefCallback, { width: charWidth }] = useMeasure();

  useAutoCopyOnSelect({ containerRef, onCopy: () => setShowCopyingAlert(true) });

  const combinedContainerRefCallback = (node: HTMLDivElement | null) => {
    if (node) {
      containerRef.current = node;
      containerMeasureRefCallback(node);
    }
  };

  const charCountInRow = useMemo(() => {
    if (!containerWidth || !charWidth) {
      return undefined;
    }

    return Math.floor(containerWidth / charWidth);
  }, [charWidth, containerWidth]);

  const sequenceChunks = useMemo(() => {
    if (!charCountInRow || !sequences?.['1']?.length) {
      return [];
    }

    const chunksCount = Math.ceil(sequences['1'].length / charCountInRow)
    const res: Record<string, string>[] = [];

    for (let i = 0; i < chunksCount; i++) {
      const from = charCountInRow * i;
      const to = from + charCountInRow;

      res.push({
        1: sequences['1'].slice(from, to),
        2: sequences['2'].slice(from, to)
      });
    }

    return res;
  }, [charCountInRow, sequences]);

  const renderChunk = (chunk: Record<string, string>, chunkIdx: number) => 
    Object.entries(chunk).map(([sequenceName, sequence]) => (
      <Box key={`${chunkIdx}-${sequenceName}`} lineHeight={1.6}>
        {sequence.split('').map((char, i) => (
          <AminoAcidChar
            aminoAcid={char as AminoAcid}
            sequenceName={sequenceName}
            key={`${chunkIdx}-${sequenceName}-${i}`}
            isDifferFromPrevSequence={chunk[sequenceName][i] !== chunk['1'][i]}
          />
        ))}
      </Box>
    ));

  return (
    <>
      <Box
        ref={combinedContainerRefCallback}
        mt={4}
      >
        <AminoAcidCharForAdjustment ref={aminoAcidCharForAdjustmentRefCallback} visibility="hidden" />
        {sequenceChunks.map(renderChunk)}
      </Box>
      <Snackbar
        open={showCopyingAlert}
        autoHideDuration={1000}
        onClose={() => setShowCopyingAlert(false)}
      >
        <Alert>
          Последовательность скопирована
        </Alert>
      </Snackbar>
    </>
  );
};

export default SequenceAlignmentVisualization;
