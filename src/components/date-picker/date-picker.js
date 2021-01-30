import './date-picker.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DatePickerCustom = ({date, setDate}) => {
	const CustomInput = ({ value, onClick }) => (
        <button type="button" className={'btn btn-outline-dark'} onClick={onClick}>
          {value}
        </button>
      );

    return (
        <div className={'date-picker'}>
          <div className={'date-picker__text'}>
            <span>
              Choose date:
            </span>
          </div>
          <div className={'date-picker__component'}>
          <DatePicker
            selected={date}
            onChange={date => setDate(date)}
            maxDate={new Date()}
            customInput={<CustomInput />} />
          </div>
        </div>
    );
}

export default DatePickerCustom;