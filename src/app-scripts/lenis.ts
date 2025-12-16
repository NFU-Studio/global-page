import Lenis from "lenis";
import { frame } from "motion";

window.lenis = new Lenis({
  autoRaf: false,
});

frame.update(({ timestamp }) => {
  window.lenis.raf(timestamp);
}, true);
