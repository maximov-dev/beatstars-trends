import GridTrends from './grid-trends';
import { useState, useEffect } from 'preact/hooks';
import DataService from '../services/data-service';
import Header from './header';
import DatePickerCustom from './date-picker';

function App() {
	const [date, setDate] = useState(new Date());
	const [fullDate, setFullDate] = useState({});
	const dataService = new DataService();
	const parseDate = (date) => new Date(Date.parse(date));
	const formatDate = (date) => {
		const parsedDate = parseDate(date);

		return `${parsedDate.getFullYear()}-0${parsedDate.getDay()}-0${parsedDate.getMonth() + 1}`
	};

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
