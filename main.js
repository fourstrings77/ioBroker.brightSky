const iobroker = require('@iobroker/adapter-core');
const axios = require('axios');
const adapterName = require('./package.json').split('.').pop();

const API_BASE_URL = 'https://api.brightsky.dev/weather' //querystring: ?lat=52&lon=7.6&date=2020-04-21'

class brightsky extends iobroker.Adapter{

    constructor(options){
        super({
            ...options,
            name: adapterName
        });
        this.on('ready', this.onReady.bind(this))
        this.on('unload', this.onUnload.bind(this))
       
    }
    async onReady(){
       const coords = this._getLatLon();

       this.log.info(JSON.stringify(coords))

    }
    async onUnload(){

    }
    async _getLatLon() {

        try{
            const state = await this.getForeignObjectsAsync('system.config');
            return [state.common.longitude, state.common.latitude]
        } catch(error){
            this.log.error(error);
        }
            
    }
}

// @ts-ignore parent is a valid property on module
if (module.parent) {
    module.exports = (options) => new brightsky(options);
} else {
    new brightsky();
}