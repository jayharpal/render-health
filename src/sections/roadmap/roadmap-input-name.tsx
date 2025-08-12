// @mui
import InputBase, { InputBaseProps, inputBaseClasses } from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function KanbanInputName({ sx, ...other }: InputBaseProps) {
  const theme = useTheme();
  const { error } = other;
  return (
    <InputBase
      sx={{
        [`&.${inputBaseClasses.root}`]: {
          py: 0.75,
          borderRadius: 1,
          typography: 'h6',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: error ? theme.palette.error.main : 'transparent', // Removed unnecessary template literals
          pl: error ? 1.5 : 0,
          '& input::placeholder': {
            color: error && theme.palette.error.dark,
          },
          transition: theme.transitions.create(['padding-left', 'border-color']),
          [`&.${inputBaseClasses.focused}`]: {
            pl: 1.5,
            borderColor: error ? theme.palette.error.main : 'text.primary',
          },
        },
        [`& .${inputBaseClasses.input}`]: {
          typography: 'h6',
        },
        ...sx,
      }}
      {...other}
    />
  );
}
