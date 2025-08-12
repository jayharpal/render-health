import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
    RHFTextField,
    RHFAutocomplete,
    RHFAutocompleteMultiple,
} from 'src/components/hook-form';
import { availability, role_preference, status } from 'src/assets/data/config';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { clearNotification, convertToUser, postInquiry } from 'src/redux/slices/inquiry';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { getInterns } from 'src/redux/slices/interns';

// ----------------------------------------------------------------------

type Props = {
    open: boolean;
    onClose: VoidFunction;
};

export default function InternRegisterDialog({ open, onClose }: Props) {
    const dispatch = useDispatch();
    const { user } = useAuthContext();

    const { enqueueSnackbar } = useSnackbar();
    const { notification, variant } = useSelector((state: RootState) => state.inquiry);

    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        mobile_no: Yup.string().required('Phone number is required'),
        status: Yup.string().required('Status is required'),
        skills: Yup.array().min(1, 'Skills are required'),
        availability: Yup.string().required('Availability is required'),
        role_preference: Yup.string().required('Role Preference is required'),
        experience: Yup.string().required('Experience is required'),
        dob: Yup.mixed(),
        additional_information: Yup.string().required('Additional Information is required'),
    });

    const defaultValues = useMemo(
        () => ({
            name: '',
            email: '',
            status: '',
            mobile_no: '',
            availability: '',
            role_preference: '',
            experience: '',
            dob: '',
            additional_information: '',
            skills: [],
        }),
        []
    );

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        formState: { isSubmitting },
        handleSubmit
    } = methods;

    const handleConvertUser = async (inquiryId: string) => {
        const res = await dispatch(convertToUser(inquiryId));
        return res?.data?.status;
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            const postData = {
                ...data,
                organization_id: user?.organization_id
            };
            const res = await dispatch(postInquiry(postData as any));
            if (res?.data?.status) {
                const response = await handleConvertUser(res?.data?.result?._id);
                if (response) {
                    dispatch(getInterns());
                    onClose();
                }
            }
        } catch (error) {
            console.error(error);
        }
    });

    useEffect(() => {
        if (notification) {
            enqueueSnackbar(notification, { variant });
            dispatch(clearNotification());
        }
    }, [notification, dispatch, enqueueSnackbar, variant]);

    return (
        <Dialog
            fullWidth
            maxWidth={false}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { maxWidth: 720 },
            }}
        >
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <DialogTitle>Register</DialogTitle>
                <DialogContent>
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                        mt={1}
                    >
                        <RHFTextField name="name" label="Full Name" />
                        <RHFTextField name="email" label="Email Address" />
                        <RHFTextField name="mobile_no" label="Phone Number" />

                        <RHFAutocompleteMultiple
                            name="skills"
                            label="Skills"
                            freeSolo
                            multiple
                            options={[] as string[]}
                            renderOption={(props, option) => (
                                <li {...props} key={option}>
                                    {option ? option.toUpperCase() : ""}
                                </li>
                            )}
                        />

                        <RHFAutocomplete
                            name="status"
                            label="Status"
                            options={(status?.map((option: any) => option) as readonly any[]) ?? []}
                            renderOption={(props, option) => (
                                <li {...props} key={option}>
                                    {option.toUpperCase()}
                                </li>
                            )}
                        />

                        <RHFAutocomplete
                            name="availability"
                            label="Availability"
                            options={(availability?.map((option: any) => option) as readonly any[]) ?? []}
                            renderOption={(props, option) => (
                                <li {...props} key={option}>
                                    {option.toUpperCase()}
                                </li>
                            )}
                        />

                        <RHFAutocomplete
                            name="role_preference"
                            label="Role Preference"
                            options={(role_preference?.map((option: any) => option) as readonly any[]) ?? []}
                            renderOption={(props, option) => (
                                <li {...props} key={option}>
                                    {option.toUpperCase()}
                                </li>
                            )}
                        />

                        <RHFTextField name="experience" label="Experience" />
                        <RHFTextField type="date" name="dob" label="DOB" InputLabelProps={{ shrink: true }} />
                        <RHFTextField name="additional_information" label="Additional Information" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Stack justifyContent="space-between" alignItems="center" direction="row">
                        <Stack direction="row" gap={1} alignItems="flex-end">
                            <Button variant="outlined" color='error' onClick={onClose}>
                                Cancel
                            </Button>
                            <LoadingButton type='submit' variant="contained" loading={isSubmitting}>
                                Save
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
}
