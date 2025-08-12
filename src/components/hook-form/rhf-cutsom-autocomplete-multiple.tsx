import { useFormContext, Controller } from 'react-hook-form';
// @mui
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { Box, Chip } from '@mui/material';
import Scrollbar from '../scrollbar/scrollbar';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
}

export default function RHFCustomAutoCompleteMultiple<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  placeholder,
  helperText,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          sx={{
            '& .MuiAutocomplete-inputRoot': {
              flexWrap: 'nowrap',
            },
            '& .MuiAutocomplete-input': {
              minWidth: '100px !important',
            },
            ...other.sx
          }}
          limitTags={1}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderTags={(value: readonly T[], getTagProps) => (
            <Box
              sx={{
                '&.MuiBox-root': {
                  display: 'flex',
                  flexDirection: 'row',
                  overflow: 'auto',
                }
              }}
            >
              <Scrollbar
                sx={{
                  '& .simplebar-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    minWidth: '12rem'
                  },
                  '& .simplebar-scrollbar:before': {
                    backgroundColor: '#888', 
                  },
                }}
              >
                {
                  value.map((option: any, index: number) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                      <Chip size='small' label={option.label} key={key} {...tagProps} />
                    );
                  })
                }
              </Scrollbar>
            </Box >
          )}
          renderInput={(params) => (
            <TextField
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
