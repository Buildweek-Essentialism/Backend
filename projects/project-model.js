  
const db = require('../database/connection')

function find() {
    return db('projects as p')
            .join("project_value as pv", "p.id", "pv.project_id")
            .join("values as v", "pv.value_id", "v.id")
            .select("p.*", "v.id as value_id", "v.value_name")
            .where({ "p.user_id": 1})
            .orderBy("p.id")
            
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
    return db('projects').insert(projectData);s
}

function addStep(stepData) {
    return db('values','projects').insert(stepData)
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
addStep,
update,
remove
}