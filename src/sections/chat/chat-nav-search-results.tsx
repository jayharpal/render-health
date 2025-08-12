import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import SearchNotFound from 'src/components/search-not-found';

import { IChatContact } from 'src/types/chat';
import { Badge } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  query: string;
  results: IChatContact[];
  onClickResult: (contact: IChatContact) => void;
};

export default function ChatNavSearchResults({ query, results, onClickResult }: Props) {
  const totalResults = results.length;

  const notFound = !totalResults && !!query;

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          px: 2.5,
          mb: 2,
        }}
      >
        Contacts ({totalResults})
      </Typography>

      {notFound ? (
        <SearchNotFound
          query={query}
          sx={{
            p: 3,
            mx: 'auto',
            width: `calc(100% - 40px)`,
            bgcolor: 'background.neutral',
          }}
        />
      ) : (
        <>
          {results.map((result) => (
            <ListItemButton
              key={result.chat_room_id}
              onClick={() => onClickResult(result)}
              sx={{
                px: 2.5,
                py: 1.5,
                typography: 'subtitle2',
              }}
            >
              <Badge
                variant={result?.contact?.is_active ? 'online' : 'offline'}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{ mr: 2 }}
              >
                <Avatar alt={result?.contact?.name || result?.contact?.email} src={result?.contact?.name || result?.contact?.email} />
              </Badge>
              {result?.contact?.name || result?.contact?.email}
            </ListItemButton>
          ))}
        </>
      )}
    </>
  );
}
