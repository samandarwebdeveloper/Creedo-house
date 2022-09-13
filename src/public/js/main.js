const selectBuilding = document.getElementById('selectBuilding');
const selectComplex = document.getElementById('selectComplex');
const selectHouse = document.getElementById('selectHouse');
const selectPeriod = document.getElementById('selectPeriod');

const buildingResult = document.getElementById('buildingResult');
const complexResult = document.getElementById('complexResult');
const bankResult = document.getElementById('bankResult');
const morgageResult = document.getElementById('mortgageResult');

selectComplex.disabled = true;
selectHouse.disabled = true;
selectPeriod.disabled = true;

let room;

selectBuilding.addEventListener('change', (e) => {
    const buildingId = e.target.value;
    const url = `/complexes/${buildingId}`;
    complexResult.innerHTML = '';
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            selectComplex.innerHTML = '';
            bankResult.innerHTML = '';
            morgageResult.innerHTML = '';
            let newoption = document.createElement('option');
            newoption.value = '0';
            newoption.textContent = 'Select complex';
            newoption.disabled = true;
            newoption.selected = true;
            newoption.hidden = true;
            selectComplex.appendChild(newoption);
            for (let i = 0; i < data.length; i++) {
                let option = document.createElement('option');
                option.value = data[i].complex_id;
                option.textContent = data[i].complex_name;
                selectComplex.appendChild(option);
                selectComplex.disabled = false;
            }
        });
    fetch(`/buildings/${buildingId}`)
        .then((response) => response.json())
        .then((data) => {
            buildingResult.innerHTML = `
                <img class="building-image fade-up" src="image/${data.building_image}" alt="${data.building_name}">
                <h3 class="fade-in">${data.building_name}</h3>
            `;
        });
});


selectComplex.addEventListener('change', (e) => {
    const complexId = e.target.value;
    const url = `/houses/${complexId}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            selectHouse.innerHTML = '';
            bankResult.innerHTML = '';
            morgageResult.innerHTML = '';
            let newoption = document.createElement('option');
            newoption.value = '0';
            newoption.textContent = 'Select rooms';
            newoption.disabled = true;
            newoption.selected = true;
            newoption.hidden = true;
            selectHouse.appendChild(newoption);
            for (let i = 0; i < data.length; i++) {
                let option = document.createElement('option');
                option.value = data[i].room_id;
                option.textContent = data[i].room_amount;
                selectHouse.appendChild(option);
                selectHouse.disabled = false;
            }
        });

    fetch(`/complex/${complexId}`)
        .then((response) => response.json())
        .then((data) => {
            complexResult.innerHTML = `
                <img class="complex-image fade-up" src="image/${data.complex_image}" alt="${data.complex_name}">
                <h3 class="fade-in">${data.complex_name}</h3>
                <p class="fade-in">${data.complex_address} street</p>
            `;
        });
});


selectHouse.addEventListener('change', (e) => {
    const url = `/period`
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            selectPeriod.innerHTML = '';
            bankResult.innerHTML = '';
            morgageResult.innerHTML = '';
            let newoption = document.createElement('option');
            newoption.value = '0';
            newoption.textContent = 'Select period';
            newoption.disabled = true;
            newoption.selected = true;
            newoption.hidden = true;
            selectPeriod.appendChild(newoption);
            for (let i = 0; i < data.length; i++) {
                let option = document.createElement('option');
                option.value = data[i].bank_credit_deadline;
                option.textContent = data[i].bank_credit_deadline;
                selectPeriod.appendChild(option);
                selectPeriod.disabled = false;
            }
        });

    fetch(`/house/${e.target.value}`)
        .then((response) => response.json())
        .then((data) => {
            room = 0;
            complexResult.removeChild(complexResult.lastChild);
            const div = document.createElement('div');
            div.classList.add('fade-up');
            div.innerHTML = `
                <h3>${data.room_amount} room</h3>
                <p>${data.room_capacity} m<sup>2</sup></p>
                <p>${data.room_capacity_price.toLocaleString().replace(/,/g, " ")} sum</p>
            `;
            complexResult.appendChild(div);
            room = data;
        });
});

selectPeriod.addEventListener('change', (e) => {
    const { room_id, room_capacity, room_capacity_price } = room;
    const url = `/bank`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            period: e.target.value,
            amount: room_capacity * room_capacity_price,
        })
    })
        .then((response) => response.json())
        .then((data) => {
            if(data) {
                bankResult.innerHTML = '';
                let div = document.createElement('div');
                div.classList.add('fade-up');
                div.innerHTML = `
                    <img class="bank-image" src="image/${data.bank_image}" alt="${data.bank_name}">
                    <h3>${data.bank_name}</h3>
                    <p>Upto ${data.bank_max_amount.toLocaleString().replace(/,/g, " ")} sum</p>
                    <p>Mortgage duration: ${data.bank_credit_deadline} year</p>
                    <p>Starting payment: ${data.bank_starter_amount}%</p>
                `
                bankResult.appendChild(div);
            }
        })
        .catch((error) => {
            bankResult.innerHTML = '';
            let div = document.createElement('div');
            div.classList.add('fade-up');
            div.innerHTML = '<h3>Sorry, the lender bank was not found</h3>';
            bankResult.appendChild(div);
            console.info(error);
        });
        
        fetch(`/result`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                credit_duration: e.target.value,
                id: room_id
        })
        })
        .then((response) => response.json())
        .then((data) => {
            if(data) {
                morgageResult.innerHTML = '';
                let div = document.createElement('div');
                div.classList.add('fade-left');
                div.innerHTML = `
                    <h3>Calculation</h3>
                    <p>House price: ${data.room_price.toLocaleString().replace(/,/g, " ")} sum</p>
                    <p>Starter amount: ${data.starter_amount.toLocaleString().replace(/,/g, " ")} sum</p>
                    <p>Monthly payment: ${data.monthly_payment.toLocaleString().replace(/,/g, " ")} sum</p>
                    <p>Payment duration: ${data.payment_duration} year</p>
                    <p>Bank name: ${data.bank_name}</p>
                `
                morgageResult.appendChild(div);
            }
        })
        .catch((error) => {
            morgageResult.innerHTML = '';
            console.info(error);  
        });
        
});

