//

'use strict'

var fs = require( "fs" )

var displayNamesRaw = JSON.parse( fs.readFileSync( "display_names_raw.json" ) )

var displayNames = []

for ( let x of displayNamesRaw ) {
	var tmp = {}
	tmp.id = x.id
	tmp.displayName = x.displayname
	displayNames.push( tmp )
}

fs.writeFileSync( "display_names.json", JSON.stringify( displayNames, null, "	" ) )
