#Tạo database với tên reipa_db
#Chạy dòng script sau trong query tool của database
CREATE EXTENSION postgis;

#run create table
cd server_api/src
npx sequelize-cli db:migrate

#run create seeder
npx sequelize-cli db:seed:all