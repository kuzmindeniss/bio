import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SequenceAlignmentVisualization from './components/Visualization';
import { useState } from 'react';
import { SEQUENCE_NAMES } from '@/constants';

const sequenceFieldValidations = yup
  .string()
  .required('Это поле обязательно для заполнения')
  .matches(
    /^[ARNDCEQGHILKMFPSTWYV-]+$/,
    'Разрешены только символы аминокислот (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) и символ -',
  );

const schema = yup.object({
  '1': sequenceFieldValidations,
  '2': sequenceFieldValidations,
}).shape({
  '2': sequenceFieldValidations.test({
    message: 'Последовательности должны быть одинаковой длины',
    test: function(value) {
      const sequence1 = this.parent['1'];
      
      if (!sequence1 || !value) {
        return true;
      }
      
      return sequence1.length === value.length;
    },
  }),
});

type FormValues = yup.InferType<typeof schema>;

const SequenceAlignment = () => {
  const [acceptedSequences, setAcceptedSequences] = useState<Record<string, string>>();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues) => {
    setAcceptedSequences({ ...data });
  };

  const renderSequenceTextField = (sequenceName: '1' | '2') => (
    <TextField
      key={sequenceName}
      label={`Последовательность ${sequenceName}`} 
      {...register(sequenceName)} 
      fullWidth 
      error={!!errors?.[sequenceName]}
      helperText={errors?.[sequenceName]?.message}
    />
  );

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      gap={2}
      p={2}
      pt={10}
      flex={1}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        {SEQUENCE_NAMES.map(renderSequenceTextField)}
        <Button disabled={!isValid} type="submit">Применить</Button>
      </form>
      <SequenceAlignmentVisualization sequences={acceptedSequences} />
    </Box>
  );
};

export default SequenceAlignment;
