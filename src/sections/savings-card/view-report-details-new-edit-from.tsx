import { Avatar, Box, Button, Card, Divider, Typography, useTheme } from '@mui/material';
import Label from 'src/app/components/label';
import { RHFTextField } from 'src/app/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  currentData?: any | null;
  onClose?: VoidFunction;
};

export default function ViewReportDetailsNewEditForm({ onClose, currentData }: Props) {

  const theme = useTheme();

  return (
    <Card sx={{ p: 3 }}>
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
        }}
        mb={3}
      >

        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={3} gap={2}>
          <Avatar
            src={currentData?.image}
            sx={{ mr: 2, height: 150, width: 150 }}
          />
          <Label
            variant="soft"
            color='primary'
          >
            RH ID: {currentData?.rhId}
          </Label>
          <Label
            variant="soft"
            color='primary'
            fontSize={150}
          >
            RH Number: {currentData?.cardNumber}
          </Label>
          <Button
            variant="contained"
            sx={{
              bgcolor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.dark
              }
            }}
          >
            {currentData?.amount}
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="start" justifyContent="center" mb={3} gap={2}>
          <Typography variant='h6' fontWeight={400} >
            Transaction Type: <Typography component="span" color={theme.palette.primary.main} fontWeight={600} variant='h6'>{currentData?.transactionType}</Typography>
          </Typography>
          <Typography variant='h6' fontWeight={400} >
            Transaction Date: <Typography component="span" color={theme.palette.primary.main} fontWeight={600} variant='h6'>{currentData?.createdAt}</Typography>
          </Typography>
          <Typography variant='h6' fontWeight={400} >
            Transaction Id: <Typography component="span" color={theme.palette.primary.main} fontWeight={600} variant='h6'>{currentData?.rhId}</Typography>
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={3}>
        <Typography
          variant="h6"
          color={theme.palette.primary.main}
          gutterBottom
        >
          Transaction Details
        </Typography>

        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(2, 1fr)', }}
          mb={3}
        >
          <RHFTextField
            name="merchant"
            label="Merchant"
            value={currentData?.merchantName}
            disabled
          />
          <RHFTextField
            name="status"
            label="Status"
            value={currentData?.status}
            fullWidth
            disabled
          />
        </Box>

        <Box mt={2}>
          <Typography variant="body1" mb={1}>
            Upload Image:
          </Typography>
          <input type="file" />
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography
          variant="h6"
          color={theme.palette.primary.main}
          gutterBottom
        >
          Transaction Activity
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mb={2}
        >
          <Label color="primary" variant="soft">
            4 May, 2023 12:30 PM
          </Label>
          <Typography variant="body2">Jaylo Patel has a top-up of amount ₦ 100.00 from the merchant Panel</Typography>
        </Box>
      </Box>
    </Card>
  );
}
