import { useFormContext, Controller } from 'react-hook-form';
import CustomDateRangePicker from '../custom-date-range-picker/custom-date-range-picker';
// ...

type DueDatePickerProps = {
  name: string;
  title?: string;
  variant?: 'input' | 'calendar';
  open: boolean;
  onClose: VoidFunction;
  onNewChangeStartDate: (newValue: Date | null) => void;
  onNewChangeEndDate: (newValue: Date | null) => void;
};

export default function RHFDueDatePicker({
  name,
  title,
  variant,
  open,
  onClose,
  onNewChangeStartDate,
  onNewChangeEndDate,
}: DueDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <CustomDateRangePicker
          title={title}
          variant={variant}
          startDate={value?.startDate}
          endDate={value?.endDate}
          onChangeStartDate={(date) => {
            onChange({ ...value, startDate: date });
            onNewChangeStartDate(date);
          }}
          onChangeEndDate={(date) => {
            onChange({ ...value, endDate: date });
            onNewChangeEndDate(date);
          }}
          error={!!error?.message}
          open={open}
          onClose={onClose}
        />
      )}
    />
  );
}
