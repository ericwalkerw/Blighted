const Emitter = require("EventEmitter");
const Key = require("Key");
cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    Emitter.instance.registerEvent(Key.GET_POINTS, (enemy) =>
      enemy.getPoints(this.node.children)
    );
  },
});
