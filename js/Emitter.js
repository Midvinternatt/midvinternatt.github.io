class Emitter {
    constructor(position, facing) {
        this.position = position;
        this.facing = facing;
        Emitter._emitterList.push(this);
    }
    kill() {
        Emitter._emitterList.splice(Emitter._emitterList.indexOf(this), 1);
    }
    update() { }
    trigger() { }
    static forEach(callback) {
        this._emitterList.forEach(callback);
    }
}
Emitter._emitterList = new Array();
export default Emitter;
//# sourceMappingURL=Emitter.js.map