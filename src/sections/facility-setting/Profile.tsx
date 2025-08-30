import { Box, Typography, Button } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { RHFTextField } from "src/app/components/hook-form";
import FormProvider, { RHFUploadAvatar } from "src/components/hook-form";
import { RHFTextArea } from "src/components/hook-form/rhf-text-field";
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
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(2, 1fr)',
              }}
              mb={3}
            >
              <RHFTextField name="firstName" label="First Name" defaultValue="jeo" fullWidth />
              <RHFTextField name="lastName" label="Last Name" defaultValue="tyler" fullWidth />
            </Box>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(3, 1fr)',
              }}
              mb={3}
            >
              <RHFTextField name="email" label="Email Address" defaultValue="jeo123@gmail.com" fullWidth />
              <RHFTextField name="mobile" label="Mobile Number" defaultValue="9876543210" fullWidth />
              <RHFTextField name="role" label="Role" defaultValue="Doctor" fullWidth disabled />
              <RHFTextField name="speciality" label="Speciality" defaultValue="Doctor" fullWidth disabled />
              <RHFTextArea name="Biography" label="Biography" defaultValue="This is a test doctor" fullWidth disabled />
              <RHFTextField name="hospital" label="Hospital" defaultValue="Emerald Medical Centre" fullWidth disabled />
            </Box>

            <Button variant="contained" sx={{ mt: 3 }}>
              Save Changes
            </Button>
          </Box>

        </Box>

      </Box>
    </FormProvider>
  );
}
