var state = require('Wildcat.Support.state');

class ModuleLoader {

    constructor(configObj = {}) {

        var _ = state(this, {});
        _.configObj = configObj;
    }

    load(environment, group, namespace = null) {

        var _ = state(this);
        var configObj = _.configObj;
        var items = {};

        if (this.exists(group)) items = configObj[group];

        if (configObj[`${environment}.${group}`]) {
            Object.assign(items, configObj[`${environment}.${group}`]);
        }

        return items;

    }
    exists(group, namespace = null) {
        
        var _ = state(this);
        var configObj = _.configObj;

        if (configObj[group]) return true;

        return false;
    }
}

module.exports = ModuleLoader;

/*

public function load($environment, $group, $namespace = null);
public function exists($group, $namespace = null);
public function addNamespace($namespace, $hint);
public function getNamespaces();
public function cascadePackage($environment, $package, $group, $items);

 */