import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { IUsers, Sender } from 'src/types/chat';

// ----------------------------------------------------------------------
type Props = {
  participants: IUsers[];
  singleParticipant?: Sender;
};

export default function ChatHeaderDetail({ singleParticipant, participants }: Props) {
  const group = participants.length > 2;

  const renderGroup = (
    <AvatarGroup
      max={3}
      sx={{
        [`& .${avatarGroupClasses.avatar}`]: {
          width: 32,
          height: 32,
        },
      }}
    >
      {participants.map((participant) => (
        <Avatar key={participant._id} alt={participant?.name || participant?.email} src={participant?.name || participant?.email} />
      ))}
    </AvatarGroup>
  );

  const renderSingle = (
    <Stack flexGrow={1} direction="row" alignItems="center" spacing={2}>
      {/* <Badge
        variant={singleParticipant.is_active ? 'online' : 'offline'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      > */}
        <Avatar src={singleParticipant?.name || singleParticipant?.email} alt={singleParticipant?.name || singleParticipant?.email} />
      {/* </Badge> */}

      <ListItemText
        primary={singleParticipant?.name || singleParticipant?.email}
        secondary={
          singleParticipant?.is_active ? "online" : "offline"
        }
        secondaryTypographyProps={{
          component: 'span',
          // ...(singleParticipant.is_active  && {
          //   textTransform: 'capitalize',
          // }),
        }}
      />
    </Stack>
  );

  return (
    <>
      {group ? renderGroup : renderSingle}

      <Stack flexGrow={1} />

      {/* <IconButton>
        <Iconify icon="solar:phone-bold" />
      </IconButton>
      <IconButton>
        <Iconify icon="solar:videocamera-record-bold" />
      </IconButton>
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton> */}
    </>
  );
}
