import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
  DialogActions,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { GridExpandMoreIcon } from "@mui/x-data-grid";

// Reusable OptionBox component
const OptionBox = ({ label, selected, onClick }: any) => (
  <Box
    onClick={onClick}
    sx={{
      px: 3,
      py: 1,
      border: "1px solid",
      borderColor: selected ? "primary.main" : "grey.400",
      borderRadius: 1,
      cursor: "pointer",
      backgroundColor: selected ? "primary.light" : "transparent",
      display: "inline-block",
      mr: 2,
    }}
  >
    <Typography>{label}</Typography>
  </Box>
);

type Props = {
  onClose: VoidFunction;
  currentBooking?: any | null;
};

export default function PharmacyEditForm({ onClose, currentBooking }: Props) {
  const [form, setForm] = useState(currentBooking?.form || "");
  const [strength, setStrength] = useState(currentBooking?.strength || "");
  const [priceType, setPriceType] = useState(currentBooking?.priceType || "");
  const [quantity, setQuantity] = useState(currentBooking?.quantity || 0);

  const handleSubmit = () => {
    const data = { form, strength, priceType, quantity };
    console.log("Medicine Data:", data);
    onClose();
  };

  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography>Form</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OptionBox label="Tablet" selected={form === "Tablet"} onClick={() => setForm("Tablet")} />
          <OptionBox label="Capsule" selected={form === "Capsule"} onClick={() => setForm("Capsule")} />
          <OptionBox label="Syrup" selected={form === "Syrup"} onClick={() => setForm("Syrup")} />
          <OptionBox label="Cream" selected={form === "Cream"} onClick={() => setForm("Cream")} />
          <OptionBox label="Injection" selected={form === "Injection"} onClick={() => setForm("Injection")} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography>Strength</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OptionBox label="250mg" selected={strength === "250mg"} onClick={() => setStrength("250mg")} />
          <OptionBox label="500mg" selected={strength === "500mg"} onClick={() => setStrength("500mg")} />
          <OptionBox label="23G" selected={strength === "23G"} onClick={() => setStrength("23G")} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography>Price Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OptionBox label="MRP" selected={priceType === "MRP"} onClick={() => setPriceType("MRP")} />
          <OptionBox label="Wholesale" selected={priceType === "Wholesale"} onClick={() => setPriceType("Wholesale")} />
          <OptionBox label="Retail" selected={priceType === "Retail"} onClick={() => setPriceType("Retail")} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography>Quantity</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" gap={2}>
            {[1, 5, 10, 20].map((q) => (
              <OptionBox
                key={q}
                label={q}
                selected={quantity === q}
                onClick={() => setQuantity(q)}
              />
            ))}
          </Box>
          {quantity > 0 && quantity < 10 && (
            <Typography color="error" fontWeight="bold" mt={1}>
              Low Stock – Quantity: {quantity}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <DialogActions sx={{ mt: 2 }}>
        <LoadingButton variant="contained" onClick={handleSubmit}>
          {currentBooking ? "Update" : "Add To Bill"}
        </LoadingButton>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Box>
  );
}
