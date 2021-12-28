import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this.animationFrameId = window.requestAnimationFrame(() => {
      this.tick();
    });
  }
  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;
    this.trigger("tick");
    this.animationFrameId = window.requestAnimationFrame(() => {
      this.tick();
      console.log(3);
    });
  }
  destroy() {
    this.time.off("tick");
    window.cancelAnimationFrame(this.animationFrameId);
  }
}
