import "./date-picker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerCustom = ({ date, setDateRange }) => {
  const today = new Date();
  const [startDate, endDate] = date;
  const CustomInput = ({ value, onClick }) => (
    <button type="button" className={"btn btn-outline-dark"} onClick={onClick}>
      <h6 class={"date-picker-btn"}>{value}</h6>
    </button>
  );

  return (
    <div className={"date-picker"}>
      <div className={"date-picker__text"}>
        <h4>Choose date:</h4>
      </div>
      <div className={"date-picker__component"}>
        <DatePicker
          className={"date-picker__day"}
          selected={startDate || today}
          onChange={(date) => {
            setDateRange([date, date]);
          }}
          maxDate={today}
          customInput={<CustomInput />}
        />
      </div>
    </div>
  );
};
