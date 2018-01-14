//

'use strict'

var fs = require('fs')

const item = fs.readFileSync( "items.json", "utf8" )

// const out = []
var out = item.map( e => {
	return e
} )
// for ( let item of items ) {
// 	out.push
// }

fs.writeFileSync( "test.json", JSON.stringify( out ) )
