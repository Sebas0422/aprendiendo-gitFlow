import React, { useState } from "react";
import { DateInput } from "@palmetto/palmetto-components";
import { format, parse } from "date-fns";

const BasicDateInput: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const dateFormat = "MM/dd/yyyy"; // Formato de fecha

    // Maneja la selección de fecha desde el calendario
    const handleDateChange = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined) => {
        if (date instanceof Date) setSelectedDate(date);
    };

    // Maneja la entrada manual en el input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const parsedDate = parse(inputValue, dateFormat, new Date());
        setSelectedDate(parsedDate);
    };

    // Borra la fecha seleccionada
    const handleClear = () => {
        setSelectedDate(null);
    };

    return (
        <DateInput
            datePickerProps={{
                selected: selectedDate,
                onChange: handleDateChange,
            }}
            textInputProps={{
                placeholder: "MM/DD/YYYY",
                onClear: handleClear,
                id: "enhancedDatePicker",
                name: "selectDate",
                label: "Select Date",
                value: selectedDate ? format(selectedDate, dateFormat) : "",
                onChange: handleInputChange,
            }}
        />
    );
};

export default BasicDateInput;
