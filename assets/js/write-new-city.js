// JavaScript file that implement logic for write-new-email.html

import { CityAPI } from "/assets/js/cityAPI.js"

window.onload = (e) => {
    document.getElementById('home-button')?.addEventListener('click', () => { window.location.href = '/index.html' });
    document.getElementById('clear-all-fields-button')?.addEventListener('click', OnClearButtonClick);
    document.getElementById('send-city-button')?.addEventListener('click', OnSendCityButonClickButonClick);
}

function OnClearButtonClick() {
    document.getElementById('mayor').value = '';
    document.getElementById('year').value = '';
    document.getElementById('country').value = '';
    document.getElementById('population').value = '';
}

async function OnSendCityButonClick() {
    let city = {};

    const mayor = document.getElementById('mayor');
    if(!mayor) {
        alert('Mayor field is empty!')
        return;
    }
    city.mayor = mayor.value;

    const year = document.getElementById('year');
    if(!year) {
        alert('Year field is empty!')
        return;
    }

    city.year = year.value;

    const country = document.getElementById('country');
    if(!country) {
        alert('Country field is empty!')
        return;
    }
    city.country = country.value;
	
	const population = document.getElementById('population');
    if(!population) {
        alert('population field is empty!')
        return;
    }
    city.population = population.value;
    
    const success = await CityAPI.CreateNewCity(city);
    if(success) {
        alert('City successfully created')
        OnClearButtonClick();
    }
    
}