
#run create table
cd src
npx sequelize-cli db:migrate

#run create seeder
npx sequelize-cli db:seed:all