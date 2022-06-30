const router = require( 'express' ).Router();
const dbSQL = require('../container');

// rutas:
//0) espacio publico con el formulario HTML
router.get( '/', ( req, res ) => {
  res.render( 'index', { mesage: '' } );
});

//1) Devuelve todos los productos
router.get( '/products', ( req, res ) => {
  dbSQL.getAll()
    .then( products => {
      // (products.length < 1)
      // ? res.send({ error: 'No existen productos' } )
      // : res.send( products  )
      (products.length < 1)
        ? res.render( 'productos', { products: 'No existen productos' } )
        : res.render( 'productos', { products: products } )
    })
});

//2) Devuelve un producto segun su id
router.get( '/products/:id', ( req, res ) => {
  const id = Number( req.params.id );
  dbSQL.getById( id )
    .then( result => {
      (result.length < 1)
        ? res.json({ error: 'Producto no encontrado.' })
        : res.json (result)
    })
});

//3) Recibe y agrega un producto. Devuelve el producto agregado y su ID asignada:
router.post( '/products', ( req, res ) => {
  const newProd = req.body;
  dbSQL.newProduct( newProd )
    .then( () => res.render( 'index', { mesage: 'Producto agregado' } ) );
});

//4) Edita un producto segun su id:
router.put( '/products/:id', ( req, res ) => {
  const id = req.params.id;
  const product = req.body;

  dbSQL.updateProduct( product, id )
    .then( () => res.json({ mesage: 'Producto editado' }) )
});

//5) Elimina un producto segun su id:
router.delete( '/products/:id', ( req, res ) => {
  const id = req.params.id;

  dbSQL.deleteProduct( id )
    .then( () => res.json({ mesage: 'Producto eliminado' }) )
});


module.exports = router;