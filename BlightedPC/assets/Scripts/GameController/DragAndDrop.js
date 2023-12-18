cc.Class({
  extends: cc.Component,

  properties: {
    isMouseDown: false,
  },

  onLoad() {
    this.node.on("mousedown", this.onMousedown, this);
    this.node.on("mousemove", this.onMousemove, this);
    this.node.on("mouseup", this.onMouseup, this);
    this._currentPos = this.node.position;
  },

  onMousedown() {
    this.isMouseDown = true;
  },

  onMousemove(event) {
    if (this.isMouseDown) {
      let mousePosition = event.getLocation();
      let localMousePosition =
        this.node.parent.convertToNodeSpaceAR(mousePosition);
      this.node.position = localMousePosition;
    }
  },

  onMouseup() {
    this.isMouseDown = false;
    this.node.position = this._currentPos;
  },
});
