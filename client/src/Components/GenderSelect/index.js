import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const GenderSelect = ({ nameSelect, control, errors }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  return (
    <>
      {/* <InputLabel id={`${name}-label`} size="small">
        Gender
      </InputLabel> */}
      <Controller
        name={nameSelect}
        control={control}
        defaultValue=""
        rules={{
          required: "Select cannot be empty",
          // minLength: {
          //   value: 1,
          //   message: "This input must exceed 1 characters",
          // },
        }}
        render={({ field: { ref, ...field } }) => (
          <TextField
            {...field}
            labelId={`${nameSelect}-label`}
            id={`${nameSelect}-select`}
            label={t("Gender")}
            variant="outlined"
            size="small"
            select
            fullWidth
            value={value}
            onChange={(event) => {
              // console.log(event.target.value);
              setValue(event.target.value);
              field.onChange(event);
            }}
            error={Boolean(errors.nameSelect)}
            helperText={errors.nameSelect ? errors.nameSelect.message : ""}
            {...field}
          >
            <MenuItem fullWidth>Select Gender</MenuItem>
            <MenuItem value="Nam" fullWidth>
              Nam
            </MenuItem>
            <MenuItem value="Nữ" fullWidth>
              Nữ
            </MenuItem>
            <MenuItem value="Khác" fullWidth>
              Khác
            </MenuItem>
          </TextField>
        )}
      />
    </>
  );
};

export default GenderSelect;
