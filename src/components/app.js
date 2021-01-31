import GridTrends from './grid-trends';
import { useState, useEffect } from 'preact/hooks';
import DataService from '../services/data-service';
import Header from './header';
import DatePickerCustom from './date-picker';

function App() {
	const parseDate = (date) => new Date(Date.parse(date));
	const formatDate = (date) => {
		console.log(date);
		const parsedDate = parseDate(date);
		const addZeroSymbol = (value) => (value > 9 ? `${value}` : `0${value}`);
		console.log(parsedDate.getDay())
		return `${parsedDate.getFullYear()}-${addZeroSymbol(parsedDate.getMonth() + 1)}-${addZeroSymbol(parsedDate.getDate())}`;
	};
	const [date, setDate] = useState(new Date());
	const [fullDate, setFullDate] = useState({ startDate: formatDate(date), endDate: formatDate(date)});
	const dataService = new DataService();

	useEffect(() => {
		const formattedDate = formatDate(date);

		setFullDate({ startDate: formattedDate, endDate: formattedDate});
	}, [date])

	  return (
	<div id="app">
	  <div class="container">
			<Header />
			<DatePickerCustom date={date} setDate={setDate} />
			<GridTrends 
				getDataByDate={dataService.getDataByDate} 
			  	date={fullDate} />
  		</div>
		  <footer class="bg-light text-center text-lg-start">
			<div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
				<a class="text-dark" href={''}>© 2021 BeatStars Search Trends</a>
			</div>
		</footer>
	</div>);
}

export default App;
