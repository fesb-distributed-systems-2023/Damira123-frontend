// JavaScript file that implement logic for list-all-emails.html

import { CityAPI } from "/assets/js/cityAPI.js"

window.onload = (e) => {
    document.getElementById('get-all-cities-button')?.addEventListener('click', LoadTable);
    document.getElementById('clear-all-cities-button')?.addEventListener('click', ClearTable);
    document.getElementById('home-button')?.addEventListener('click', () => { window.location.href = '/index.html' });
    ClearTable();
}

async function LoadTable() {
    const cities = await CityAPI.GetAllCities();
    if(!cities) {
        console.error('Could not load cities.')
        return;
    }

    const table = document.getElementById('city-table');
    if(!table) {
        console.error('Could not find city table.')
        return;
    }

    ClearTable();

    let table_body = table.getElementsByTagName('tbody')?.[0];
    if(!table_body) {
        console.error('Could not find <tbody> in city table!');
        return;
    }

    // Add each row manually
    cities.forEach(e => {
        const row = document.createElement('tr');
        row.addEventListener('dblclick', () => { DeleteCity(e.id) });

        const lstReceivers = e.receivers.join('<br>')

        row.innerHTML = `
                <td>${e.id}</td>
                <td>${e.mayor}</td>
                <td>${e.year}</td>
                <td>${e.country}</td>
                <td>${e.population}</td>
        `
        table_body.appendChild(row)
    });

}

function ClearTable() {
    const table = document.getElementById('city-table');
    if(!table) {
        console.error('Could not find city table.')
        return;
    }
    table.innerHTML = `
    <thead>
        <tr>
            <th>ID</th>
            <th>Mayor</th>
            <th>Year</th>
            <th>Country</th>
            <th>Population</th>
        </tr>
    </thead>
    <tbody>

    </tbody>
    `;
}

export function DeleteCity(cityId) {
    alert(`Deleting city with ID = ${cityId}`);
    CityAPI.DeleteCity(cityId);
    ClearTable();
    LoadTable(); // Reload table
}