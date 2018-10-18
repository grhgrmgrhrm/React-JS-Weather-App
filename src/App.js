import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, NavItem, Grid, Row, Col } from "react-bootstrap";
import "./App.css";

const PLACES = [
    { name: "Витебск", zip: "620127" },
    { name: "Минск", zip: "625144" },
    { name: "Гомель", zip: "620540" },
    { name: "Гродно", zip: "627904" },
    { name: "Могилёв", zip: "625665" },
    { name: "Брест", zip: "629634" }
];

class WeatherDisplay extends Component {
    constructor() {
        super();
        this.state = {
            weatherData: null
        };
    }
    componentDidMount() {
        const zip = this.props.zip;
        const URL = "http://api.openweathermap.org/data/2.5/weather?id=" +
            zip +
            "&appid=f56e1b93bd33c86b0dbac68b6b38cde5&units=metric";
        fetch(URL).then(res => res.json()).then(json => {
            this.setState({ weatherData: json });
        });
    }
    render() {
        const weatherData = this.state.weatherData;
        if (!weatherData) return <div>Loading</div>;
        const weather = weatherData.weather[0];
        const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
        return (
            <div>
                <h1>
                    {weather.main} in {weatherData.name}
                    <img src={iconUrl} alt={weatherData.description} />
                </h1>
                <p>Текущая температура: {weatherData.main.temp}°С</p>
                <p>Максимальная температура: {weatherData.main.temp_max}°С</p>
                <p>Минимальная температура: {weatherData.main.temp_min}°С</p>
                <p>Скорость ветра: {weatherData.wind.speed} миль/час</p>
            </div>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            activePlace: 0
        };
    }
    render() {
        const activePlace = this.state.activePlace;
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            Погодное приложение на React
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
                <Grid>
                    <Row>
                        <Col md={4} sm={4}>
                            <h3>Выберите город:</h3>
                            <Nav
                                bsStyle="pills"
                                stacked
                                activeKey={activePlace}
                                onSelect={index => {
                                    this.setState({ activePlace: index });
                                }}
                            >
                                {PLACES.map((place, index) => (
                                    <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                                ))}
                            </Nav>
                        </Col>
                        <Col md={8} sm={8}>
                            <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
                        </Col>
                    </Row>
                    <Col md={12} sm={12}>
                        <p align="right">Autor <a target="_blank" href="https://github.com/grhgrmgrhrm">Raman Shastapalau</a> © <span>2018</span>
                        </p>
                    </Col>
                </Grid>
            </div>
        );
    }
}

export default App;