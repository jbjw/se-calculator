function breakdown( item ) {
	var bases = []
	if ( item.type === "Ore" ) {
		return item
	} else {
		for ( let ingredient of item.ingredients ) {
			// bases.push( breakdown( findItem( ingredient.name ) ) )
			bases = bases.concat( breakdown( findItem( ingredient.name ) ) )
		}
		return bases
	}
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
