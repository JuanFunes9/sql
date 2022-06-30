const options = require ('./db/options/optionsMysql');
const knex = require('knex')( options );

class Contenedor{
  constructor( options ){
    this.options = options;
  }

  createTable(){
    knex.schema.createTable( 'productos', table => {
      table.string('title'),
      table.integer('price'),
      table.string('thumbnail'),
      table.increments('id')
    })
      .then( ()=> console.log('Table created') )
      .catch( error => console.log( error ) )
      // .finally( () => knex.destroy() )
  }

  getAll(){
    return knex.from( this.options.connection.table ).select( '*' )
      .then( rows => rows )
      .catch( error => console.log( error ) )
      // .finally( () => knex.destroy() )
  }

  getById( id ){
    return knex.from( this.options.connection.table ).select( '*' ).where( 'id', '=', id )
      .then( rows => rows )
      .catch( error => console.log( error ) )
      // .finally( () => knex.destroy() )
  }

  newProduct( newProd ){
    return knex( this.options.connection.table ).insert( newProd )
      .then( () => 'Producto agregado' )
      .catch( error => console.log( error ) )
      // .finally( () => knex.destroy() );
  }

  updateProduct( editProd, id ){
    return knex.from( this.options.connection.table )
      .where( 'id', '=', id )
      .update( editProd ) /*Le pasamos un objeto con las props que vamos a actualizar*/

      .then( () => console.log('Data updated') )
      .catch( error => console.log( error ) )
      // .finally( () => knex.destroy() );
  }

  deleteProduct( id ){
    return knex.from( this.options.connection.table )
      .where( 'id', '=', id )  /* SI NO PONEMOS EL CONDICIONAL, BORRA TODA LA DATA DE LA TABLA */
      .del()

      .then( () => console.log('Data removed') )
      .catch( error => console.log( error ) )
      // .finally( () => knex.destroy() );
  }

}

const dbSQL = new Contenedor( options );

module.exports = dbSQL;