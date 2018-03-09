const bcrypt = require('bcryptjs');

var password = '123abc';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$DfhGzJIMN7wpSn/TvfHzjeRfQntf0MZQQ/WdsKv3VEt4o4bQ.H/82';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});