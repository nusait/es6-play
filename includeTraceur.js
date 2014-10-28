
var traceur = require('traceur');

function ifNotFromNodeModules(filename) {
	
	return ! filename.contains('node_modules'); 	
}

traceur.require.makeDefault(ifNotFromNodeModules);

exports.traceur = traceur;