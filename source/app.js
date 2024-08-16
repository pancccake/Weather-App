import './style.css';
import './media.css';
import { fetchGeo } from './API-requests';

const locationInput = document.getElementById('locationInput');
const search = document.getElementById('search');

window.addEventListener('load', () => {
    fetchGeo('Warsaw');
})

search.addEventListener('click', () => {
    const location = locationInput.value;
    if (isNaN(location)) {
        fetchGeo(location);
        locationInput.value = '';
    } else {
        window.alert('Please, enter the name of the city.');

        console.log('Error');
    }
})

locationInput.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
        if (isNaN(locationInput.value)) {
            fetchGeo(locationInput.value);
            locationInput.value = '';

            console.log('Enter pressed.');
        } else {
            window.alert('Please, enter the name of the city.');

            console.log('Error');
        }
    }
})