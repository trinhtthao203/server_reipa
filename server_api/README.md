
#run create table
cd server_api/src
npx sequelize-cli db:migrate

#run create seeder
npx sequelize-cli db:seed:all