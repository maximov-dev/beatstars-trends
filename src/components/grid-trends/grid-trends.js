import { Fragment, Component } from 'preact'
import './grid-trends.css';
import withData from '../../utils/hoc/with-data';
import { sortBy } from 'lodash'
const RESULTS_FROM_BEATSTARS = 'beatstarsResult';
const REQUESTS_FROM_USERS = 'requestsFromUsers';

const DEFAULT_POSITION = 'default';
const UP_POSITION = 'up';
const DOWN_POSITION = 'down';

const sortByName = (arr) => (sortBy(arr, ['search']))

class GridTrends extends Component {
	state = {
		data: sortByName(this.props.data),
		[RESULTS_FROM_BEATSTARS]: DEFAULT_POSITION,
		[REQUESTS_FROM_USERS]: DEFAULT_POSITION,
	};

	handleHeaderColumnPositionIcon = (property, array) => {
		const dataFromState = [...array];

		switch (property) {
			case DEFAULT_POSITION: {
				return { position: UP_POSITION, data: [...dataFromState.reverse()]};
			}
			case UP_POSITION: {
				return { position: DOWN_POSITION, data: dataFromState};
			}

			case DOWN_POSITION: {
				return { position: DEFAULT_POSITION, data: sortByName(dataFromState)};
			}

			default:
				return DEFAULT_POSITION;
		}
	}
	
	handleClickSortBy = (property) => {
		switch (property) {
			case RESULTS_FROM_BEATSTARS: {
				const data = sortBy(this.props.data, ['nbHits'])
				const sortByNbHits = this.handleHeaderColumnPositionIcon(this.state.beatstarsResult, data);
				console.log(sortByNbHits.position)
				this.setState({
					data: sortByNbHits.data, 
					[RESULTS_FROM_BEATSTARS]: sortByNbHits.position,
					[REQUESTS_FROM_USERS]: DEFAULT_POSITION,
				})
				break;
			}
			case REQUESTS_FROM_USERS: {
				const data = sortBy(this.props.data, ['count'])
				const sortByCount = this.handleHeaderColumnPositionIcon(this.state.requestsFromUsers, data);
				this.setState({
					data: sortByCount.data,
					[REQUESTS_FROM_USERS]: sortByCount.position,
					[RESULTS_FROM_BEATSTARS]: DEFAULT_POSITION,
				})
				break;
			}
			default:
				break;
		}
	}

	render() {
		const data = this.state.data.length ? this.state.data : this.props.data;
		const trendsNodes = data.map((trend, index) => {
			const indexTrend = index + 1;
			const { search, count, nbHits } = trend;

			return (
				<tr key={trend.search}>
					<th scope="row">{indexTrend}</th>
					<td className={'center'}>{search}</td>
					<td className={'center'}>{count}</td>
					<td className={'center'}>{nbHits}</td>
			  </tr>
			);
		});
		return (
		<Fragment>
		<table class="table table-hover">
		  <thead>
			<tr>
			  <th className={'grid-column-title'}>#</th>
			  <th className={'grid-column-title grid-column-text-center'}>Search</th>
			  <th className={'grid-column-title grid-column-text-center grid-column-title-custom'}
			  		onClick={() => this.handleClickSortBy(REQUESTS_FROM_USERS)}>
					<div>
						<div><span>User's requests</span></div>
				 	 	<div className={'center-by-horizontal'}>
							  <img className={'up-and-down-icon'} src='../../assets/icons/up-down.svg'/>
						</div>
					</div>
				</th>
			  <th className={'grid-column-title grid-column-text-center grid-column-title-custom'}
					  onClick={() => this.handleClickSortBy(RESULTS_FROM_BEATSTARS)}>
						Results Count
					<img className={'up-and-down-icon'} src='../../assets/icons/up-down.svg'/>
				</th>
			</tr>
		  </thead>
		  <tbody>
			{trendsNodes}
		  </tbody>
		</table>
		</Fragment>
		);
	}
}

export default withData(GridTrends)