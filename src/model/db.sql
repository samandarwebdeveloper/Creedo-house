CREATE DATABASE exam;

CREATE TABLE buildings (
    building_id SERIAL PRIMARY KEY,
    building_name VARCHAR(50) NOT NULL,
    building_image VARCHAR(50) NOT NULL
);

CREATE TABLE complexes (
    complex_id SERIAL PRIMARY KEY,
    complex_name VARCHAR(50) NOT NULL,
    complex_address VARCHAR(50) NOT NULL,
    complex_image VARCHAR(50) NOT NULL,
    building_id INTEGER REFERENCES buildings(building_id)
);

CREATE TABLE rooms (
    room_id SERIAL PRIMARY KEY,
    room_amount INTEGER NOT NULL,
    room_capacity INTEGER NOT NULL,
    room_capacity_price INTEGER NOT NULL,
    complex_id INTEGER REFERENCES complexes(complex_id)
);

CREATE TABLE banks (
    bank_id SERIAL PRIMARY KEY,
    bank_name VARCHAR(50) NOT NULL,
    bank_image VARCHAR(50) NOT NULL,
    bank_max_amount INTEGER NOT NULL,
    bank_credit_deadline INTEGER NOT NULL,
    bank_starter_amount INTEGER NOT NULL
);