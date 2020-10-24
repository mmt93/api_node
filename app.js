var express = require( 'express' ),
    
app = express() ;

app.use( require( './routes/routes' ) ) ;

app.listen( 3001, function() {
  console.log( 'Server listening on port 3001' ) ;
} ) ;