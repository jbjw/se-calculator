// var items = items.json
// for ( let item of items ) {
// 	// if ( item.type === "ore" ) {
//     //
// 	// }
// }

let items, prices

var p1 = fetch( "items.json" )
var p2 = fetch( "prices.json" )

Promise.all( [ p1, p2 ] ).then( data => {
	var ps = data.map( v => v.json() )
	Promise.all( ps ).then( data => {
		items = Object.values( data[0] )
		prices = Object.values( data[1] )
		handle()
	} )
} )

// fetch( "items.json" ).then( function ( response ) {
// 	return response.json()
// } ).then( function ( myBlob ) {
// 	// console.log( myBlob )
// 	items = Object.values( myBlob )
// 	handle()
//
// } )

function handle() {
	let item = findItem( "Missile200mm_AmmoMagazine" )
	// let item = findItem( "Iron_Ingot" )
	console.log( item )
	console.log( totalTime( item ) )
	console.log( breakdownOres( item ) )

	function findItem( term ) {
		return items.find( i => i.name === term )
	}

	function breakdownOres( item ) {
		var ores = []
		for ( let ingredient of item.ingredients ) {

			ores.push( )
			findItem( ingredient.name ).ingredients[ 0 ]
			// bases.push( breakdown( findItem( ingredient.name ) ) )
			// ores = bases.concat( breakdown( findItem( ingredient.name ) ) )
		}
		return ores
	}

	function breakdownIngots( item ) {
		var ingots = []

		for ( let ingredient of item.ingredients ) {
			ingots.push( ingredient )
		}
		return ingots
	}

	function totalTime( item, fromIngot = false ) {
		let time = 0
		if ( item.type === ( fromIngot ? "Ingot" : "Ore" ) ) {
			return 0
		} else {
			time += item.time
			for ( let ingredient of item.ingredients ) {
				// console.log( ingredient )
				time += totalTime( findItem( ingredient.name ) )
			}
			return time
		}
	}

	// function totalTime( item ) {
	// 	let time = 0
	// 	if ( item.ingredients === undefined ) {
	// 		//
	// 	} else {
	// 		for ( let ingredient of item.ingredients ) {
	// 			time += findItem( ingredient.name ).time
	// 			// time += ingredient.time
	// 			// return item.time + totalTime( findItem( item.name ) )
	// 		}
	// 	}
	// 	return time
	// }

}
