/* global describe, expect, it, beforeEach, afterEach, jasmine */

var traceur = require('traceur');
var customMatchers = traceur.require('framework/tests/customMatchers.js');
var helpers 
    = traceur.require('framework/src/Wildcat/Support/helpers.js');

var isString = helpers.isString;
var entries  = helpers.entries;
var values   = helpers.values;
var keys     = helpers.keys;
var mapFrom  = helpers.mapFrom;
var assign   = helpers.assign;

beforeEach(function() {
    jasmine.addMatchers(customMatchers);
});

describe('toString helper', function() {

    it('identifies a string', function() {
        expect( isString('some-random-string') ).toBe(true);
    });

    it('returns false for a number', function() {
        expect( isString(4) ).toBe(false);
    });

    it('returns false for null', function() {
        expect( isString(null) ).toBe(false);
    });

    it('returns false for undefined', function() {
        expect( isString(undefined) ).toBe(false);
    });

    it('returns false for an array', function() {
        expect( isString([])).toBe(false);
    });
});

describe('mapFrom', function() {

    it('should create a map from an object', function() {

        var object = {one: 1, two: 2,};
        var map = mapFrom(object);

        expect(map).toBeInstanceOf(Map);
        expect(map.get('one')).toBe(1);
        expect(map.get('two')).toBe(2);
        expect(map.size).toBe(2);

    });
});

describe('entries', function() {

    beforeEach( function() {
        this.expected = [
            ['one', 1],
            ['two', 2],
        ];
    });

    it('returns array from an object', function() {

        var object = {
            one: 1,
            two: 2,
        };
        expect( entries(object) ).toEqual(this.expected);
    });

    it('returns array for a map', function() {

        // var map = new Map();
        // map.set('one', 1);
        // map.set('two', 2);

        var map = mapFrom({
            one: 1,
            two: 2,
        });
        expect( entries(map) ).toEqual(this.expected);
    });
});

describe('values', function() {

    it('returns array from an object', function() {

        var object = {
            one: 1,
            two: 2,
        };
        expect( values(object) ).toEqual( [1,2] );
    });

    it('returns array for a map', function() {

        var map = new Map();
        map.set('one', 1);
        map.set('two', 2);

        expect( values(map) ).toEqual( [1,2] );
    });
});

describe('keys', function() {

    it('returns array from an object', function() {

        var object = {
            one: 1,
            two: 2,
        };
        expect( keys(object) ).toEqual( ['one','two'] );
    });

    it('returns array for a map', function() {

        var map = new Map();
        map.set('one', 1);
        map.set('two', 2);

        expect( keys(map) ).toEqual( ['one', 'two'] );
    });
});

describe('assign', function() {

    var target;

    beforeEach( function() {

        target = {
            original: 'original',
        };
    });

    it('adds object to target', function() {

        assign(target, {
            newValue: 'newValue',
            two: 'two',
        });

        expect(target).toEqual({
            newValue: 'newValue',
            two: 'two',
            original: 'original',
        });
    });

    it('adds array to target', function() {

        var temp = {
            one: 'one',
            two: 'two',
        };

        assign(target, [temp, 'one', 'two']);

        expect(target).toEqual({
            original: 'original',
            one: 'one',
            two: 'two',
        });
    });
});