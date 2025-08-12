import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function ChatNavAccount() {
  const { user, logout } = useAuthContext();

  const popover = usePopover();

  // const [status, setStatus] = useState<'online' | 'alway' | 'busy' | 'offline'>(user?.is_active ? 'online' : 'offline');

  // const handleChangeStatus = useCallback((event: SelectChangeEvent) => {
  //   setStatus(event.target.value as 'online' | 'alway' | 'busy' | 'offline');
  // }, []);

  return (
    <>
      <Badge variant="online" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Tooltip title={user?.name || user?.email} placement='right'>
          <Avatar
            src={user?.name || user?.email}
            alt={user?.name || user?.email}
            onClick={popover.onOpen}
            sx={{ cursor: 'pointer', width: 48, height: 48 }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </Tooltip>
      </Badge>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="top-left" sx={{ p: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5,
          }}
        >
          <ListItemText
            primary={user?.name}
            secondary={user?.email}
            secondaryTypographyProps={{ component: 'span' }}
          />

          <Tooltip title="Log out">
            <IconButton color="error" onClick={logout}>
              <Iconify icon="ic:round-power-settings-new" />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        {/* <Stack sx={{ p: 1 }}>
          <MenuItem>
            <Badge
              variant={status}
              sx={{
                [`& .${badgeClasses.badge}`]: {
                  position: 'static',
                  m: 0.75,
                  width: 12,
                  height: 12,
                  flexShrink: 0,
                },
              }}
            />

            <Select
              native
              fullWidth
              value={status}
              onChange={handleChangeStatus}
              input={<InputBase sx={{ pl: 2 }} />}
              inputProps={{
                sx: { textTransform: 'capitalize' },
              }}
            >
              {['online', 'alway', 'busy', 'offline'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </MenuItem>

          <MenuItem>
            <Iconify icon="solar:user-id-bold" width={24} />
            Profile
          </MenuItem>

          <MenuItem>
            <Iconify icon="eva:settings-2-fill" width={24} />
            Settings
          </MenuItem>
        </Stack> */}
      </CustomPopover>
    </>
  );
}
