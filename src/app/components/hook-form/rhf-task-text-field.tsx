import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextFieldProps } from '@mui/material/TextField';
import KanbanInputName from 'src/sections/projects/taskboard-input-name';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  placeholder?: string;
};

export default function RHFTaskTextField({ name, helperText, type, placeholder, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <KanbanInputName
          placeholder={placeholder}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
        />
      )}
    />
  );
}
