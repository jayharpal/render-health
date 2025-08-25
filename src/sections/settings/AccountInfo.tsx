import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography, Button, Stack, InputAdornment, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import FormProvider, { RHFTextField } from "src/app/components/hook-form";
import Iconify from "src/app/components/iconify";
import { useBoolean } from "src/hooks/use-boolean";

export default function AccountInfo() {

  const password = useBoolean();
  const confirmPassword = useBoolean();

  const methods = useForm();

  return (
    <FormProvider methods={methods}>

      <Box sx={{ p: 3, border: "1px solid #eee", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Account Info
        </Typography>

        <Box sx={{ my: 3 }}>
          <RHFTextField
            label="Email Account"
            name="email"
            fullWidth
            value="jeo123@gmail.com"
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" color="primary" gutterBottom>
            Change Password
          </Typography>

          <RHFTextField
            label="Current Password"
            name="Currentpassword"
            type="password"
            fullWidth
            sx={{ mb: 2, width: '50%' }}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <RHFTextField
              name="Newpassword"
              label="New Password"
              type={password.value ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />

            <RHFTextField
              name="confirmpassword"
              label="Re-type New Password"
              type={password.value ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={confirmPassword.onToggle} edge="end">
                      <Iconify icon={confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Box>

          <Typography variant="caption" color="error" display="block" sx={{ mt: 1 }}>
            Password should be at least 8 characters long (Uppercase, Lowercase, Number, Special Character)
          </Typography>

        </Box>


        <Button variant="contained" sx={{ mt: 3 }}>
          Save Setting
        </Button>
      </Box >
    </FormProvider>

  );
}
