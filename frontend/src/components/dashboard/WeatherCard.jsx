import { useEffect, useState } from "react";
import api from "../../services/api";

export default function WeatherCard() {

    const [weather, setWeather] = useState(null);

    useEffect(() => {

        api.get("/weather/dashboard")
            .then((res) => {

                setWeather(res.data);

            })
            .catch((err) => {

                console.log(err);

            });

    }, []);

    if (!weather)

        return <div>Loading Weather...</div>;

    return (

        <div>

            <h2>{weather.temperature}°C</h2>

            <p>{weather.description}</p>

        </div>

    );

}