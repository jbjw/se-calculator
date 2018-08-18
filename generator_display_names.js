//

'use strict'

var fs = require( "fs" )

var displayNamesRaw = JSON.parse( fs.readFileSync( "display_names_raw.json" ) )

var displayNames = []

for ( let x of displayNamesRaw ) {
	var tmp = {}
	tmp["subtype"] = x["subtype"]
	tmp["type"] = x["type"]
	tmp["subtype_type"] = x["subtype"] + "_" + x["type"]
	tmp["display_name"] = x["displayname"]
	displayNames.push( tmp )
}

fs.writeFileSync( "display_names.json", JSON.stringify( displayNames, null, "	" ) )
