import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { IUsers } from 'src/types/chat';

import ChatRoomParticipantDialog from './chat-room-participant-dialog';

// ----------------------------------------------------------------------

type Props = {
  participants: IUsers[];
};

export default function ChatRoomGroup({ participants }: Props) {
  const [selected, setSelected] = useState<IUsers | null>(null);

  const collapse = useBoolean(true);

  const handleOpen = useCallback((participant: IUsers) => {
    setSelected(participant);
  }, []);

  const handleClose = () => {
    setSelected(null);
  };

  const totalParticipants = participants.length;

  const renderBtn = (
    <ListItemButton
      onClick={collapse.onToggle}
      sx={{
        pl: 2.5,
        pr: 1.5,
        height: 40,
        flexShrink: 0,
        flexGrow: 'unset',
        typography: 'overline',
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Box component="span" sx={{ flexGrow: 1 }}>
        In room ({totalParticipants})
      </Box>
      <Iconify
        width={16}
        icon={collapse.value ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      />
    </ListItemButton>
  );

  const renderContent = (
    <Scrollbar sx={{ height: 56 * 4 }}>
      {participants.map((participant) => (
        <ListItemButton key={participant._id} onClick={() => handleOpen(participant)}>
          <Badge
            variant={participant.is_active ? "online" : "offline"}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Avatar alt={participant?.name || participant?.email} src={participant?.name || participant?.email} />
          </Badge>

          <ListItemText
            sx={{ ml: 2 }}
            primary={participant?.name || participant?.email}
            // secondary={participant.role}
            primaryTypographyProps={{
              noWrap: true,
              typography: 'subtitle2',
            }}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              typography: 'caption',
            }}
          />
        </ListItemButton>
      ))}
    </Scrollbar>
  );

  return (
    <>
      {renderBtn}

      <div>
        <Collapse in={collapse.value}>{renderContent}</Collapse>
      </div>

      {selected && (
        <ChatRoomParticipantDialog participant={selected} open={!!selected} onClose={handleClose} />
      )}
    </>
  );
}
