#!/bin/bash
cd backend
npm install
npx sequelize-cli db:migrate
cd ../frontend
npm install