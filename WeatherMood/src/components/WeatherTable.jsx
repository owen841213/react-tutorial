import React from 'react';
import PropTypes from 'prop-types';
import {Container,
        Row,
        Col
} from 'reactstrap'

import './weather.css';
import './WeatherTable.css';
import './owfont-regular.css';

export default class WeatherTable extends React.Component{
    static propTypes = {
        weathers: PropTypes.array
    };

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className={`weather`}>
                {this.initTalbe(this.props.weathers)}
            </div>
        
        );
    }
    initTalbe(weathers){
        // parameters:
        // weathers: is an array of jsons geting from openweather api
        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sun.";
        weekday[1] = "Mon.";
        weekday[2] = "Tues.";
        weekday[3] = "Wed.";
        weekday[4] = "Thurs.";
        weekday[5] = "Fri.";
        weekday[6] = "Sat.";
        return (
            <Container className='weather-table'>
                <Row>
                    {weathers.map( (weather , index) =>
                        <Col className={`weather-${index}`} key = {`weather-${index}`} >
                            <div>{`${weekday[(d.getDay()+index)%7]}`}</div>
                            <i className={`owf owf-${weather.code}-d owf-5x`}></i>
                            <span>{weather.temp.toFixed(0)}&ordm;</span>
                            &nbsp;{(weather.unit === 'metric')
                                ? 'C'
                                : 'F'}
                        </Col>
                    )}
                </Row>
            </Container>
        )
    }
}