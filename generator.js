//

'use strict'

var xml2js = require('xml2js')
var fs = require('fs')

function load(path) {
	var xml = fs.readFileSync(path, 'utf8')
	var json
	xml2js.parseString(xml, function (err, result) {
		json = result
	})
	return json
}

function dump(path, json) {
	fs.writeFile(path, JSON.stringify(json, null, 2), function(err) {
		if (err) { console.log('sumtin done wrong') }
		console.log('file got done wrote')
	})
}


// var itemPrices = fs.readFileSync( "item_prices.json" )


// AmmoMagazines.sbc is just for mass and volume of magazine items
var ammoMagazinesJSON = load("dataSBC/AmmoMagazines.sbc").Definitions.AmmoMagazines[0].AmmoMagazine
dump("dataJSON/AmmoMagazines.json", ammoMagazinesJSON)

// PhysicalItems.sbc is just for mass and volume of ores, tools
var physicalItemsJSON = load("dataSBC/PhysicalItems.sbc").Definitions.PhysicalItems[0].PhysicalItem
dump("dataJSON/PhysicalItems.json", physicalItemsJSON)

// Components.sbc is just for mass and volume of components
var componentsJSON = load("dataSBC/Components.sbc").Definitions.Components[0].Component
dump("dataJSON/Components.json", componentsJSON)

// Blueprints.sbc contains ore refining info, ingredients, components, etc
var blueprintsJSON = load("dataSBC/Blueprints.sbc").Definitions.Blueprints[0].Blueprint
dump("dataJSON/Blueprints.json", blueprintsJSON)

// CubeBlocks.sbc is for built blocks, contains needed components and build times
var cubeBlocksJSON = load("dataSBC/CubeBlocks.sbc").Definitions.CubeBlocks[0].Definition
dump("dataJSON/CubeBlocks.json", cubeBlocksJSON)

// var items = {}
var items = []

var categoryBlacklist = [ "TreeObject" ]

for ( let json of ammoMagazinesJSON ) {
	var tmp = {}
	tmp.subtype = json.Id[0].SubtypeId[0]
	tmp.type = json.Id[0].TypeId[0]
	tmp.name = `${tmp.subtype}_${tmp.type}`
	tmp.mass = Number( json.Mass[0] )
	tmp.volume = Number( json.Volume[0] )

	if (!categoryBlacklist.includes(tmp.category)) {
		// items[tmp.name] = tmp
		items.push( tmp )
	}
}

for (let json of physicalItemsJSON) {
	var tmp = {}
	tmp.subtype = json.Id[0].SubtypeId[0]
	tmp.type = json.Id[0].TypeId[0]
	tmp.name = `${tmp.subtype}_${tmp.type}`
	tmp.mass = Number( json.Mass[0] )
	tmp.volume = Number( json.Volume[0] )

	if (!categoryBlacklist.includes(tmp.category)) {
		// items[tmp.name] = tmp
		items.push( tmp )
	}
}

for (let json of componentsJSON) {
	var tmp = {}
	tmp.subtype = json.Id[0].SubtypeId[0]
	tmp.type = json.Id[0].TypeId[0]
	tmp.name = `${tmp.subtype}_${tmp.type}`
	tmp.mass = Number( json.Mass[0] )
	tmp.volume = Number( json.Volume[0] )

	if (!categoryBlacklist.includes(tmp.category)) {
		// items[tmp.name] = tmp
		items.push( tmp )
	}
}

// for (let json of blueprintsJSON) {
// 	var result = {}
// 	result.amount = Number( json.Result[0].$.Amount )
// 	result.subtype = json.Result[0].$.SubtypeId
// 	result.type = json.Result[0].$.TypeId
// 	result.name = `${result.subtype}_${result.type}`
//
// 	var item = items[result.name]
//
// 	if ( item.ingredients === undefined ) {
// 		item.time = Number( json.BaseProductionTimeInSeconds[0] )
// 		item.amount = Number( json.Result[0].$.Amount )
// 		item.ingredients = []
//
// 		for (let ijson of json.Prerequisites[0].Item) {
// 			var ingredient = {}
// 			ingredient.amount = Number( ijson.$.Amount )
// 			ingredient.subtype = ijson.$.SubtypeId
// 			ingredient.type = ijson.$.TypeId
// 			ingredient.name = `${ingredient.subtype}_${ingredient.type}`
// 			item.ingredients.push( ingredient )
// 		}
// 	} else {
// 		// already has ingredients, duplicat eentires like iron from scrap
// 	}
//
//
//
// 	// recipe name `${json.Id[0].SubtypeId[0]}_${json.Id[0].TypeId[0]}`
// }

// console.log(Object.values(items).filter(i => i.type == "AmmoMagazine" || i.type == "GasContainerObject" || i.type == "OxygenContainerObject").map(i => i.subtype))

for (let json of cubeBlocksJSON) {
	var tmp = {}
	tmp.subtype = json.Id[0].SubtypeId[0]
	tmp.type = json.Id[0].TypeId[0]
	tmp.name = `${tmp.subtype}_${tmp.type}`
	tmp.displayName = json.DisplayName[0]
	tmp.grid = json.CubeSize[0]
	// tmp.components = []
	// for (let ijson of json.Components[0].Component) {
	// 	var itmp = {}
	// 	itmp.name = ijson.$.Subtype
	// 	itmp.category = "component"
	// 	itmp.amount = ijson.$.Count
	// 	tmp.components.push(tmp)
	// }

	// tmp.mass = json.Mass[0]
	// tmp.volume = json.Volume[0]

	if (!categoryBlacklist.includes(tmp.category)) {
		// items.push(tmp)
	}
}

dump("items.json", items)

// for (let blueprintJSON of blueprintsJSON) {
// 	var productJSON = blueprintJSON.Result[0].$
//
// 	var item = {}
// 	var id = `${productJSON.SubtypeId.toLowerCase()}_${productJSON.TypeId.toLowerCase()}`
// 	item.name = productJSON.SubtypeId.toLowerCase()
// 	item.category = productJSON.TypeId.toLowerCase()
// 	item.recipeName = blueprintJSON.Id[0].SubtypeId[0].toLowerCase()
// 	item.time = blueprintJSON.BaseProductionTimeInSeconds[0]
// 	// productJSON.Amount, // should always be 1?? maybe
// 	// item.ingredients = ingredients
//
// 	items[id] = item
//
// 	// OxygenBottlesRefill`
// 	// HydrogenBottlesRefill
//
// 	// if (result.category == "Ingot") {
// 	//
// 	// }
// 	//
// 	// if (result.category == "Component") {
// 	//
// 	// }
// }


// var ingredients = []
//
// for (let item of blueprintXML.Prerequisites[0].Item) {
// 	var ingredientXML = item.$
// 	var ingredient = {}
// 	ingredient.name = ingredientXML.SubtypeId.toLowerCase()
// 	ingredient.category = ingredientXML.TypeId.toLowerCase()
// 	ingredient.amount = ingredientXML.Amount
// 	ingredients.push(ingredient)
// }
