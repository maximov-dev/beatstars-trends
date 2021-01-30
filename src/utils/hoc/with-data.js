import { Component } from 'preact'

const withData = (View) => {
	return class WithData extends Component {
  
	  state = {
		data: null,
		loading: true,
		error: false
	  };
  
	  componentDidUpdate(prevProps) {
		if (this.props.date.startDate !== prevProps.date.startDate && this.props.date.endDate !== prevProps.date.endDate) {
		  this.update();
		}
	  }
  
	  componentDidMount() {
		this.update();
	  }
  
	  update() {
		const { date } = this.props;

		this.setState( {
		  loading: true,
		  error: false
		});
  
		this.props.getDataByDate(date)
		  .then((data) => {
			this.setState({
			  data: data.response.data.list,
			  loading: false
			});
		  })
		  .catch(() => {
			this.setState({
			  error: true,
			  loading: false
			});
		  });
	  }
  
  
	  render() {
		const { data, loading, error } = this.state;
  
		if (loading) {
		  return [];
		}
  
		if (error) {
		  return [];
		}
  
		return <View {...this.props} data={data} />;
	  }
	};
  };

  export default withData;