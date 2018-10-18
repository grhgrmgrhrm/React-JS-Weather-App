class WeatherDisplay extends Component {
    render() {
        return (
            <h1>Показ погоды для города: {this.props.zip}</h1>
        );
    }
}