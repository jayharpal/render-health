// import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
// components
import Iconify from 'src/app/components/iconify';
import IconButton from '@mui/material/IconButton';
import FormProvider from 'src/components/hook-form';
import { Button, TextField, Typography } from '@mui/material';
// ----------------------------------------------------------------------

type Props = {
  currentBooking?: any | null;
  onClose?: VoidFunction;
};

export default function AddBillingNewEditFrom({ currentBooking, onClose }: Props) {

  const methods = useForm();

  const [items, setItems] = useState([{ service: "", amount: "" }]);

  const handleAddItem = () => {
    setItems([...items, { service: "", amount: "" }]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const subtotal = items.reduce(
    (acc, item) => acc + (parseFloat(item.amount) || 0),
    0
  );

  return (
    <FormProvider methods={methods}>
      {items.map((item, index) => (
        <Box
          key={index}
          display="flex"
          gap={2}
          alignItems="center"
          mb={2}
        >
          <Typography>{new Date().toLocaleDateString()}</Typography>

          <TextField
            placeholder="Type about services here..."
            value={item.service}
            onChange={(e) =>
              handleChange(index, "service", e.target.value)
            }
            sx={{ width: '50%' }}
          />

          <TextField
            placeholder="Bill Amount"
            type="number"
            value={item.amount}
            onChange={(e) => handleChange(index, "amount", e.target.value)}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>₦</Typography>,
            }}
          />

          {items.length > 1 && (
            <IconButton onClick={() => handleRemoveItem(index)}>
              <Iconify icon="mingcute:delete-line" />
            </IconButton>
          )}
        </Box>
      ))}

      <Button
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={handleAddItem}
        sx={{ mb: 2 }}
      >
        Add more items
      </Button>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Typography variant="subtitle1">Sub Total Amount</Typography>
        <Typography variant="subtitle1">₦{subtotal}</Typography>
      </Box>

      <Box display="flex" justifyContent="center" m={4}>
        <Button variant="contained" color="primary">
          Save New Billing
        </Button>
      </Box>
    </FormProvider>
  );
}
