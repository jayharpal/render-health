import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextFieldProps } from '@mui/material/TextField';
import { DatePicker, DateView } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  label?: string;
  view?: any;
};

export default function RHFDateField({ name, helperText, type, view, label, ...other }: Props) {
  const { control } = useFormContext();
  const defaultViews = ['year', 'month', 'day'];
  let selectedViews: readonly DateView[];
  if (view) {
    selectedViews = view;
  } else {
    selectedViews = defaultViews as readonly DateView[];
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          label={label}
          views={selectedViews}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(newValue) => {
            field.onChange(newValue);
          }}
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
        />
      )}
    />
  );
}
