exports.up = function (knex) {
    return knex.schema
     
      .createTable("users", tbl => {
            tbl.increments();
            tbl.string("name",128).notNullable()  
            tbl.string("email", 128).notNullable().unique().index();
            tbl.string("password", 256).notNullable();
        });
        
     };
  
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
  };
  