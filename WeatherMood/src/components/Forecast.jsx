import React from 'react';
import withRouter from 'react-dom'
import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import WeatherTable from 'components/WeatherTable.jsx';
import {getForecast} from 'api/open-weather-map.js';

import './weather.css';

export default class Forecast extends React.Component {

    static getInitWeatherState() {
        return {
            city: 'na',
            code: -1,
            group: 'na',
            description: 'N/A',
            temp: NaN,
            loading: true,
            masking: true,
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            masking: false,
            forecast:[]
        };
        // TODO
        // initialize the states due to loading forecast asynchronizely, otherwise the weatherDisplay would crash!
        this.handleFormQuery = this.handleFormQuery.bind(this);

        for (var i=0;i<5;i++){
            this.state.forecast.push(Forecast.getInitWeatherState());
        }
    }

    componentDidMount() {
        this.getForecast(this.props.city, this.props.unit)
    }

    render() {
        return (
            <div className={`forecast weather-bg ${this.state.forecast[0].group}`}>
                <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
                    <WeatherDisplay {...this.state.forecast[0]} />
                    <WeatherTable weathers = {this.state.forecast}/>
                    <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleFormQuery} />
                </div>
            </div>
        );
    }

    getForecast(city, unit) {
        this.setState({
            loading: true,
            masking: true,
            city: city // set city state immediately to prevent input text (in WeatherForm) from blinking;
        }, () => { // called back after setState completes
            getForecast(city, unit).then(forecast => {
                this.setState({
                    // first: forecast[0],
                    forecast: forecast,
                    loading: false
                });
            }).catch(err => {
                console.error('Error getting weather', err);

            });
        });

        setTimeout(() => {
            this.setState({
                masking: false
            });
        }, 200);
    }

    handleFormQuery(city, unit) {
        this.getForecast(city, unit);
    }

}