var config = require('config.config');

class ModuleLoader {

    load(environment, group, namespace = null) {
        var items = {};

        if (this.exists(group)) items = config[group];

        if (config[`${environment}.${group}`]) {
            Object.assign(items, config[`${environment}.${group}`]);
        }

        return items;

    }
    exists(group, namespace = null) {

        if (config[group]) return true;

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