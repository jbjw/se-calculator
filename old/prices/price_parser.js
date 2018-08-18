//

"use strict"

var fs = require( "fs" )

var items = []

fs.readdir( "./prices", function( err, paths ) {
	for ( let path of paths ) {
		// if ( path !== "price_parser.js" && path.includes( ".txt" ) && path === "GTH_ore.txt" ) {
		if ( true ) {
		// if ( path !== "price_parser.js" && path !== "items.json" && path.includes( ".txt" ) ) {
			var raw = fs.readFileSync( path, "utf8" )
			var rawSplit = raw.split( "\r\n" )
			var rawFilter = rawSplit.filter( e => e !== "" )
			var marketName = rawFilter[ 0 ]
			var category = path.slice( path.indexOf( "_" ) + 1, path.indexOf( ".txt" ) )
			rawFilter.splice( 0, 2 )
			for ( let rawItem of rawFilter ) {
				var item = {}
				var i = rawItem.indexOf( "  " )
				item.subtype = rawItem.slice( 0, i )
				item.type = category
				// item.name = `${ item.subtype } ${ item.type }`.replace( ".", "p" ).replace( " ", "_" )
				item.marketName = marketName
				var prices = rawItem.slice( i ).split( " " ).filter( e => e !== "" )
				item.buy = prices[ 0 ]
				item.sell = prices[ 1 ]
				item.stock = prices[ 2 ]
				items.push( item )
			}
			// dumpJSON( path.replace( ".txt", ".json" ), items )
		}
	}
	dumpJSON( "../item_prices.json", items )
} )

function dumpJSON( path, json ) {
	fs.writeFile( path, JSON.stringify( json, null, 2 ), function ( err ) {
		if ( err ) {
			// console.log( "sumtin done wrong" )
		}
		// console.log( "file got done wrote" )
	} )
}
