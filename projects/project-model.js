  
const db = require('../database/connection')

function find() {
     return db('projects as p')
            .join("project_value as pv", "p.id", "pv.project_id")
            .join("values as v", "pv.value_id", "v.id")
            .select("p.*", "v.id as value_id", "v.value_name")
            .where({ "p.user_id": 1})
            .orderBy("p.id") 
    // return db("projects as p")
    //     .with("val", qb => {
    //         qb.select("pv.project_id", db.raw("JSON_GROUP_ARRAY(JSON_OBJECT('id', v.id, 'value_name', v.value_name)) as [values]"))
    //             .from("project_value as pv")
    //             .join("values as v", "v.id", "pv.value_id")
    //             .join("projects", "projects.id", "pv.project_id")
    //             .groupBy("pv.project_id")
    //     })
    //     .leftJoin("val", "val.project_id", "p.id")
    //     .select("p.*", "val.values")
    //     .then(projects => {
    //         return projects.map(project => {
    //             if(!project.values) {
    //                 project.values = [];
    //             } else {
    //                 project.values = JSON.parse(project.values);
    //             }
    //             return project;
    //         })
    //     })

}

function findBy(filter) {
    return db("projects").where(filter);
}

function findById(id) {
    console.log("user id from findByID", id)
    return db('projects').where({id: id }).first();
}


function findvalues(id) {
    return db( 'values as c')
    .join('projects as s', 's.id', 'c.scheme_id',)
    .select('s.scheme_name', 'c.step_number', 'c.instructions', )
    .where({ scheme_id: id });
}

function add(projectData) {
    return db('projects').insert(projectData);
}


function update(changes, id) {
    return db('projects').where({ id }).update(changes);
}

function remove(id) {
    return db('projects').where({ id }).del();
}

module.exports = {
find, 
findBy,
findById,
findvalues,
add,
// addStep,
update,
remove
}