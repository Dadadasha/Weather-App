const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;
const API_KEY = '8GPQJYEGATJXGXDW35JAE4B8F';

// Middleware
app.use(cors());
app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const units = req.query.units || 'metric';

    if (!city) {
        return res.status(400).json({ error: 'Город не указан' });
    }

    try {
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=${units}&key=${API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.currentConditions) {
            throw new Error('Данные о погоде не найдены');
        }

        const resolvedAddress = data.resolvedAddress;
        const cityName = (resolvedAddress && resolvedAddress.split(',')[0]) ? resolvedAddress.split(',')[0] : city;

        const temperature = data.currentConditions.temp;
        const weather = data.currentConditions.conditions;
        const timestamp = data.currentConditions.datetime;

        res.json({ city: cityName, temperature, weather, timestamp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при получении погоды: ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});