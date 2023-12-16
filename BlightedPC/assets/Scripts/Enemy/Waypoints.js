const Emitter = require("EventEmitter");
const Key = require('Key');
cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    Emitter.instance.emit(Key.GET_POINTS, this.node.children);
  },
});
