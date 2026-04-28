new Vue({
    el: '#app',
    data() {
        return {
            weather: {},
            units: 'metric'
        };
    },
    methods: {
        async fetchWeather() {
            try {
                const response = await fetch('/weather');
                const data = await response.json();
                this.weather = data;
            } catch (error) {
                console.error('Ошибка при загрузке погоды:', error);
            }
        },
        formatTimestamp(ts) {
            if (!ts) return '';
            return new Date(ts).toLocaleString();
        }
    },
    mounted() {
        this.fetchWeather();
    }
});
