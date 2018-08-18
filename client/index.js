// var items = items.json
// for ( let item of items ) {
// 	// if ( item.type === "ore" ) {
//     //
// 	// }
// }

var qs = document.querySelector.bind( document )
var qsa = document.querySelectorAll.bind( document )

let items, prices

var promises = [ fetch( "items.json" ) ]
// var promises = [ fetch( "items.json" ), fetch( "prices.json" ) ]

Promise.all( promises ).then( data => {
	var ps = data.map( v => v.json() )
	Promise.all( ps ).then( data => {
		items = Object.values( data[0] )
		// prices = Object.values( data[1] )
		handle()
	} )
} )
//
// fetch( "items.json" ).then( function ( response ) {
// 	return response.json()
// } ).then( function ( myBlob ) {
// 	items = Object.values( myBlob )
// 	handle()
// } )

// input change submit
qs( "#filter" ).addEventListener( "input", function ( e ) {
	// console.log( e.target.value )

	for ( let item of items ) {
		var el = qs( `#${ item.name }`)
		if ( item.name.toLowerCase().includes( e.target.value.toLowerCase() ) ) {
			el.style.display = ""
			el.style.backgroundColor = "aliceblue"
		} else {
			// console.log( el )
			el.style.display = "none"
		}
		// var d = document.createElement( "p" )
		// d.textContent = item.name
		// document.body.appendChild( d )
	}

	// var newItems = items.filter( x => {
	// 	x.name.includes( e.target.value )
	// } )
} )

function handle() {
	// let item = findItem( "Missile200mm_AmmoMagazine" )
	// let item = findItem( "Iron_Ingot" )
	// console.log( item )
	// console.log( totalTime( item ) )
	// console.log( breakdownOres( item ) )
	// console.log( "handling" )

	for ( let item of items ) {
		var d = document.createElement( "div" )
		d.id = item.name
		d.classList.add( "item-entry" )
		// d.textContent = item.subtype
		document.body.appendChild( d )

		var p0 = document.createElement( "p" )
		p0.textContent = item.name
		d.appendChild( p0 )

		var p1 = document.createElement( "p" )
		p1.textContent = item.subtype
		d.appendChild( p1 )

		var p2 = document.createElement( "p" )
		p2.textContent = item.type
		d.appendChild( p2 )


	}

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
