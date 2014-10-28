// BluelightsDelivered.js


class BluelightsDelivered {

    constructor(bluelightCollection) {

        this.value = bluelightCollection;
        this.type = this.getName();
        this.timeStamp = Date.now();
    }
    getName() {

        return 'app.bluelightsDelivered';
    }
}

module.exports = BluelightsDelivered;