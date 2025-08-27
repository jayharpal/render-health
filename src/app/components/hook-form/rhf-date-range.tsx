import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import Iconify from "src/components/iconify";
import { useBoolean } from "src/hooks/use-boolean";
import CustomDateRangePicker from "../custom-date-range-picker/custom-date-range-picker";

type DueDatePickerProps = {
  name: string;
  title?: string;
  variant?: "input" | "calendar";
};

export default function RHFDateRangePicker({
  name,
  title = "Select Date Range",
  variant = "calendar",
}: DueDatePickerProps) {
  const { control } = useFormContext();

  const dateOpen = useBoolean();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const startDate = value?.startDate || null;
        const endDate = value?.endDate || null;

        return (
          <>
            {/* 👉 Input with calendar icon */}
            <TextField
              fullWidth
              label={title}
              value={
                startDate && endDate
                  ? `${dayjs(startDate).format("MM/DD/YYYY")} - ${dayjs(
                    endDate
                  ).format("MM/DD/YYYY")}`
                  : ""
              }
              onClick={dateOpen.onTrue}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={dateOpen.onTrue}>
                      <Iconify icon="material-symbols:calendar-add-on" width="24" height="24" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!error}
              helperText={error?.message}
            />

            {/* 👉 Popup Date Range Picker */}
            <CustomDateRangePicker
              title={title}
              variant={variant}
              startDate={startDate}
              endDate={endDate}
              onChangeStartDate={(date) => {
                onChange({ ...value, startDate: date });
              }}
              onChangeEndDate={(date) => {
                onChange({ ...value, endDate: date });
              }}
              error={!!error}
              open={dateOpen.value}
              onClose={dateOpen.onFalse}
            />
          </>
        );
      }}
    />
  );
}
