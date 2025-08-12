// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {  TextFieldProps } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { ChangeEvent } from 'react';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  label?: string;
  disabled?: boolean;
};

export default function RHFMuiPhoneNumber({ name, helperText, label, disabled, ...other }: Props) {
  const { control, trigger } = useFormContext();

  const handleChange = (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    trigger(name);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <MuiPhoneNumber
          disabled={disabled}
          value={value}
          sx={{ marginTop: '0 !important', width: 1 ,
          minWidth: 30,
          padding: 0,
          // height: 30,
          '& svg': {
            width: 'fill-available',
            height: '1em'
          },}}
          onChange={(newValue) => {
            onChange(newValue);
            handleChange(newValue);
          }}
          variant="outlined"
          defaultCountry="in"
          label={label}
          error={!!error}
          helperText={error ? error?.message : helperText}
        />
      )}
    />
  );
}
