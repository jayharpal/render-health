import { useCallback } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { IChatContact } from 'src/types/chat';

import { Tooltip } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  collapse: boolean;
  onCloseMobile: VoidFunction;
  conversation: IChatContact;
  participants: IChatContact[]
};

export default function ChatNavItem({ selected, collapse, conversation, participants, onCloseMobile }: Props) {
  const mdUp = useResponsive('up', 'md');

  const router = useRouter();

  // const { group, displayName, displayText, participants, lastActivity, hasOnlineInGroup } =
  //   useGetNavItem({
  //     conversation,
  //     currentUserId: `${user?.id}`,
  //   });

  const singleParticipant = conversation;

  const name = singleParticipant?.contact?.name
  const email = singleParticipant?.contact?.email
  const is_active = singleParticipant?.contact?.is_active

  const handleClickConversation = useCallback(async () => {
    try {
      if (!mdUp) {
        onCloseMobile();
      }

      // await clickConversation(conversation.chat_room_id);
      router.push(`${paths.dashboard.chat.root}?id=${conversation.chat_room_id}`);
    } catch (error) {
      console.error(error);
    }
  }, [conversation.chat_room_id, mdUp, onCloseMobile, router]);

  // const renderGroup = (
  //   <Badge
  //     // variant={hasOnlineInGroup ? 'online' : 'invisible'}
  //     variant={'online'}
  //     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  //   >
  //     <AvatarGroup variant="compact" sx={{ width: 48, height: 48 }}>
  //       {participants.slice(0, 2).map((participant) => (
  //         <Avatar key={participant?.contact?._id} alt={participant?.contact?.name} src={participant?.contact?.name || participant?.contact?.email} />
  //       ))}
  //     </AvatarGroup>
  //   </Badge>
  // );

  const renderSingle = (
    <Badge variant={is_active ? 'online' : 'offline'} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Tooltip title={name || email} placement='right' disableHoverListener={!collapse}>
        <Avatar alt={name || email} src={name || email} sx={{ width: 48, height: 48 }} />
      </Tooltip>
    </Badge>
  );

  return (
    <ListItemButton
      disableGutters
      onClick={handleClickConversation}
      sx={{
        py: 1.5,
        px: 2.5,
        ...(selected && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <Badge
        color="error"
        overlap="circular"
        badgeContent={collapse ? conversation.unreadCount : 0}
      >
        {/* {group ? renderGroup : renderSingle} */}
        {renderSingle}
      </Badge>

      {!collapse && (
        <>
          <ListItemText
            sx={{ ml: 2 }}
            primary={name}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2',
            }}
            secondary={conversation?.lastActivity || ""}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              variant: conversation.unreadCount ? 'subtitle2' : 'body2',
              color: conversation.unreadCount ? 'text.primary' : 'text.secondary',
            }}
          />

          <Stack alignItems="flex-end" sx={{ ml: 2, height: 44 }}>
            <Typography
              noWrap
              variant="body2"
              component="span"
              sx={{
                mb: 1.5,
                fontSize: 12,
                color: 'text.disabled',
              }}
            >
              {formatDistanceToNowStrict(new Date(conversation?.lastActivityAt || new Date()), {
                addSuffix: false,
              })}
            </Typography>

            {!!conversation.unreadCount && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: 'info.main',
                  borderRadius: '50%',
                }}
              />
            )}
          </Stack>
        </>
      )}
    </ListItemButton>
  );
}
