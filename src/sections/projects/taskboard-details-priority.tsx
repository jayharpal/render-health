// @mui
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  priority: string;
  onChangePriority: (newValue: string) => void;
};

export default function KanbanDetailsPriority({ priority, onChangePriority }: Props) {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={1}>
      {['lowest', 'low', 'medium', 'high', 'highest'].map((option) => (
        <ButtonBase
          key={option}
          onClick={() => onChangePriority(option)}
          sx={{
            py: 0.5,
            pl: 0.75,
            pr: 1.25,
            fontSize: 12,
            borderRadius: 1,
            lineHeight: '20px',
            textTransform: 'capitalize',
            fontWeight: 'fontWeightBold',
            boxShadow: (theme) => `inset 0 0 0 1px ${alpha(theme.palette.grey[500], 0.24)}`,
            ...(option === priority && {
              boxShadow: (theme) => `inset 0 0 0 2px ${theme.palette.text.primary}`,
            }),
          }}
        >
          <Iconify
            icon={
              (option === 'lowest' && 'solar:double-alt-arrow-down-bold-duotone') ||
              (option === 'low' && 'solar:double-alt-arrow-down-bold-duotone') ||
              (option === 'medium' && 'solar:double-alt-arrow-right-bold-duotone') ||
              (option === 'high' && 'solar:double-alt-arrow-up-bold-duotone') ||
              (option === 'highest' && 'solar:double-alt-arrow-up-bold-duotone') ||
              'solar:double-alt-arrow-up-bold-duotone'
            }
            sx={{
              mr: 0.5,
              ...(option === 'lowest' && {
                color: 'info.light',
              }),
              ...(option === 'low' && {
                color: 'info.main',
              }),
              ...(option === 'medium' && {
                color: 'warning.main',
              }),
              ...(option === 'high' && {
                color: 'error.main',
              }),
              ...(option === 'highest' && {
                color: 'error.dark',
              }),
            }}
          />

          {option}
        </ButtonBase>
      ))}
    </Stack>
  );
}
