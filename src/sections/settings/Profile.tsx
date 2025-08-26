import { Box, TextField, Typography, Button } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import FormProvider, { RHFUploadAvatar } from "src/components/hook-form";
import { fData } from "src/utils/format-number";

export default function Profile() {


  const methods = useForm({
    defaultValues: {
      avatarUrl: "https://via.placeholder.com/50*50",
    },
  });

  const {
    setValue
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const preview = URL.createObjectURL(file);

      if (file) {
        setValue('avatarUrl', preview, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} >
      <Box sx={{ p: 3, border: "1px solid #eee", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>

        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "25% 75%",
          }}
          mb={3}
        >

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 3 }}>
            <RHFUploadAvatar
              name="avatarUrl"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Box>

          <Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField label="First Name" defaultValue="jeo" fullWidth />
              <TextField label="Last Name" defaultValue="tyler" fullWidth />
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField label="Email Address" defaultValue="jeo123@gmail.com" fullWidth />
              <TextField label="Mobile Number" defaultValue="9876543210" fullWidth />
            </Box>

            <TextField label="Role" defaultValue="employee" fullWidth disabled />

            <Button variant="contained" sx={{ mt: 3 }}>
              Save Changes
            </Button>
          </Box>

        </Box>

      </Box>
    </FormProvider>
  );
}
