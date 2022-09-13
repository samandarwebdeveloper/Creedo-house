const building = document.getElementById('building');
const complex = document.getElementById('complex');
const house = document.getElementById('house');
const bank = document.getElementById('bank');
const addBuilding = document.getElementById('addBuilding');
const addComplex = document.getElementById('addComplex');
const addHouse = document.getElementById('addHouse');
const bankAddBtn = document.getElementById('addBank');
const buildingContent = document.getElementById('buildingContent');
const complexContent = document.getElementById('complexContent');
const houseContent = document.getElementById('houseContent');
const bankContent = document.getElementById('bankContent');
const addBuildingWrap = document.getElementById('addBuildingWrap');
const addComplexWrap = document.getElementById('addComplexWrap');
const addBankWrap = document.getElementById('addBankWrap');
const buildingList = document.getElementById('buildingList');
const complexList = document.getElementById('complexList');
const houseList = document.getElementById('houseList');
const bankList = document.getElementById('bankList');
const buildingSelect = document.getElementById('buildingSelect');
const complexSelect = document.getElementById('complexSelect');

building.addEventListener('click', () => {
    bank.classList.remove('active');
    complex.classList.remove('active');
    house.classList.remove('active');
    building.classList.add('active');
    bankList.innerHTML = '';
    complexList.innerHTML = '';
    houseList.innerHTML = '';

    fetch('/allbuildings')
        .then((response) => response.json())
        .then((data) => {
            buildingList.innerHTML = '';
            data.map((item) => {
                const li = document.createElement('li');
                li.classList.add('building-list-item');
                li.classList.add('fade-up');
                li.innerHTML = `
                    <img class="building-item-img" src="image/${item.building_image}" alt="${item.building_name}">
                    <h3>${item.building_name}</h3>
                `;
                buildingList.appendChild(li);
            }
            );
        }
        );
});

complex.addEventListener('click', () => {
    bank.classList.remove('active');
    building.classList.remove('active');
    house.classList.remove('active');
    complex.classList.add('active');
    buildingList.innerHTML = '';
    houseList.innerHTML = '';
    bankList.innerHTML = '';

    fetch('/allcomplexes')
        .then((response) => response.json())
        .then((data) => {
            buildingList.innerHTML = '';
            bankList.innerHTML = '';
            data.map((item) => {
                const li = document.createElement('li');
                li.classList.add('building-list-item');
                li.classList.add('fade-up');
                li.innerHTML = `
                    <img class="building-item-img" src="image/${item.complex_image}" alt="${item.complex_name}">
                    <h3>${item.complex_name}</h3>
                    <p>${item.complex_address} street</p>
                    <p><b>${item.building_name}</b></p>
                `;
                complexList.appendChild(li);
            }
            );
        }
        );
}
);


buildingSelect.addEventListener('click', (e) => {
    buildingSelect.innerHTML = '';
    fetch('/buildingnames')
        .then((response) => response.json())
        .then((data) => {
            for(let i = 0; i < data.length; i++) {
                const newoption = document.createElement('option');
                newoption.value = data[i].building_id;
                newoption.innerHTML = data[i].building_name;
                buildingSelect.appendChild(newoption);
            }
        });
});


house.addEventListener('click', () => {
    bank.classList.remove('active');
    building.classList.remove('active');
    complex.classList.remove('active');
    house.classList.add('active');
    bankList.innerHTML = '';
    complexList.innerHTML = '';
    buildingList.innerHTML = '';

    fetch('/allhouses')
        .then((response) => response.json())
        .then((data) => {
            houseList.innerHTML = '';
            data.map((item) => {
                const li = document.createElement('li');
                li.classList.add('building-list-item');
                li.classList.add('fade-up');
                li.innerHTML = `
                    <img class="building-item-img" src="image/${item.complex_image}" alt="${item.complex_image}">
                    <h3>${item.room_amount} rooms</h3>
                    <h3>${item.room_capacity} m<sup>2</sup></h3>
                    <p>${item.room_capacity_price.toLocaleString().replace(/,/g, " ")} sum</p>
                    <p>${item.complex_name}</p>
                    <p><b>${item.complex_address}</b></p>
                `
                houseList.appendChild(li);
            });
        });
});


complexSelect.addEventListener('click', (e) => {
    complexSelect.innerHTML = '';
    fetch('/complexnames')
        .then((response) => response.json())
        .then((data) => {
            for(let i = 0; i < data.length; i++) {
                const newoption = document.createElement('option');
                newoption.value = data[i].complex_id;
                newoption.innerHTML = data[i].complex_name;
                complexSelect.appendChild(newoption);
            }
        });
});

bank.addEventListener('click', () => {
    complex.classList.remove('active');
    building.classList.remove('active');
    house.classList.remove('active');
    bank.classList.add('active');
    buildingList.innerHTML = '';
    complexList.innerHTML = '';
    houseList.innerHTML = '';
    

    fetch('/allbanks')
    .then(res => res.json())
    .then(data => {
        bankList.innerHTML = '';
        data.map(bank => {
            const li = document.createElement('li');
            li.classList.add('fade-up');
            li.classList.add('bank-list-item');
            li.innerHTML = `
                <img class="bank-item-image" src="image/${bank.bank_image}" alt="${bank.bank_name}">
                <h3>${bank.bank_name}</h3>
                <p>Upto ${bank.bank_max_amount.toLocaleString().replace(/,/g, " ")} sum</p>
                <p>${bank.bank_credit_deadline} year</p>
                <p>Starter payment:${bank.bank_starter_amount}%</p>
            `;
            bankList.appendChild(li);
        })
    })
    .catch(err => console.log(err));
});

addBuilding.addEventListener('click', (e) => {
    if(e.currentTarget === e.target) {
        addBuildingWrap.style.display = 'flex';
    }
});

addComplex.addEventListener('click', (e) => {
    if(e.currentTarget === e.target) {
        addComplexWrap.style.display = 'flex';
    }
});

addHouse.addEventListener('click', (e) => {
    if(e.currentTarget === e.target) {
        addHouseWrap.style.display = 'flex';
    }
});

bankAddBtn.addEventListener('click', (e) => {
    if(e.currentTarget === e.target) {
        addBankWrap.style.display = 'flex';
    }
});

addBuildingWrap.addEventListener('click', (e) => {
    if(e.currentTarget === e.target) {
        addBuildingWrap.style.display = 'none';
    }
});

addComplexWrap.addEventListener('click', (e) => {
    if(e.currentTarget === e.target) {
        addComplexWrap.style.display = 'none';
    }
});

addHouseWrap.addEventListener('click', (e) => {
    if(e.currentTarget === e.target) {
        addHouseWrap.style.display = 'none';
    }
});

addBankWrap.addEventListener('click', (e) => {
    if(e.currentTarget === e.target) {
        addBankWrap.style.display = 'none';
    }
});

