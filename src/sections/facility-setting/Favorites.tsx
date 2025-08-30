import { Box, TextField, Typography, Button, FormLabel, MenuItem } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { RHFAutocompleteMultiple, RHFMultiSelect, RHFSelect, RHFTaskTextField, RHFTextField } from "src/app/components/hook-form";
import FormProvider, { RHFUploadAvatar } from "src/components/hook-form";
import { RHFTextArea } from "src/components/hook-form/rhf-text-field";
import { FavoriteDiagnosis, TestOptions } from "src/utils/dummyMembers";
import { fData } from "src/utils/format-number";

export default function Favorites() {


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
        <Box mb={3}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, mb: 3 }}>
            <Typography variant="body1" fontWeight='bold'>Favorite Diagnosis</Typography>
            <RHFMultiSelect
              name="Favorite Diagnosis"
              // label="First Name"
              defaultValue="jeo"
              fullWidth
              chip
              options={FavoriteDiagnosis}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, mb: 3 }}>
            <Typography variant="body1" fontWeight='bold'>Favorite Lab Results</Typography>
            <Box display='flex' flexDirection='column' gap={2} width='100%' alignItems='center'>
              <RHFSelect
                name="test"
              >
                {TestOptions.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFMultiSelect
                name="Favorite Lab Results"
                // label="First Name"
                defaultValue="jeo"
                fullWidth
                chip
                options={FavoriteDiagnosis}
              />
              
            </Box>

          </Box>

          <Button variant="contained" sx={{ mt: 3 }}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
}
