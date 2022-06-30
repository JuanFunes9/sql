const options = require ('./db/options/optionsSQLite3');
const knex = require('knex')( options );

class Contenedor{
  constructor( options ){
    this.options = options;
  }

  createTable(){
    knex.schema.createTable( 'messages', table => {
      table.string('author')
      table.string('msg')
      table.string('date')
    })
      .then( ()=> console.log('Table created') )
      .catch( error => console.log( error ) )
      // .finally( () => knex.destroy() )    /*Mata la conexion al db */
  }

  getAll(){
    return knex.from( 'messages' ).select( '*' )
      .then( rows => rows )
      .catch( error => console.log( error ) )
      // .finally( () => knex.destroy() )
  }

  newMessage( newMessage ){
    return knex( 'messages' ).insert( newMessage )
      .then( () => false )
      .catch( error => console.log( error ) )
      // .finally( () => knex.destroy() );
  }

  deleteAll(){
    knex.from( 'messages' )
      .where( 'author', '=', 'f@gmail.com' )  /* SI NO PONEMOS EL CONDICIONAL, BORRA TODA LA DATA DE LA TABLA */
      .del()

      .then( () => console.log('Data removed') )
      .catch( error => console.log( error ) )
      // .finally( () => knex.destroy() );
  }

}

const sqlite = new Contenedor( options );
// sqlite.createTable()

module.exports = sqlite;