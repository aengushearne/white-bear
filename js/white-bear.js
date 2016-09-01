$(document).ready(function(){
// setup audioContext
var audioContext = new AudioContext()

var out = audioContext.destination;
// load samples

// play sound function (different for samples and synth?)
function osc(freq, type, dest, dtn) {
	var duration = dtn;
	var startTime = audioContext.currentTime;
  	var endTime = startTime + duration;

	var oscillator = audioContext.createOscillator();
	oscillator.type = type;
	oscillator.frequency.value = freq;
	var ramp = audioContext.createGain()
	ramp.gain.value = 0;
	oscillator.connect(ramp);
	ramp.connect(out);

	oscillator.start(startTime);
	ramp.gain.setTargetAtTime(1, startTime, 0.1);
  	ramp.gain.setTargetAtTime(0, endTime, duration/2);
	oscillator.stop(endTime + 2);
}

// setup sound banks
function W(){
	osc(440, 'sawtooth', out, 0.5);
	lightUp('w');
}
function H(){
	osc(387, 'sawtooth', out, 1);
	lightUp('h');
}
function I(){
	osc(248, 'sine', out, 2);
	lightUp('i');
}
function T(){
	osc(392, 'sawtooth', out, 0.5);
	lightUp('t');
}
function E(){
	osc(222, 'sawtooth', out, 2);
	lightUp('e');
}
function B(){
	osc(187, 'sawtooth', out, 2.5);
	lightUp('b');
}
function A(){
	osc(489, 'sine', out, 0.5);
	lightUp('a');
}
function R(){
	osc(500, 'sawtooth', out, 0.4);
	lightUp('r');
}
// animations
function lightUp(box) {
 $('#'+box).effect("highlight", {color: 'white'}, 500); 
}

// keybindings to trigger play functions
$(document).keydown(function(e) {
 if (e.keyCode == 87) {              // "W" key
  W(440);
 }
 else if (e.keyCode == 72) {              // "H" key
  H(387);
 }
 else if (e.keyCode == 73) {              // "I" key
  I(248);
 }
 else if (e.keyCode == 84) {              // "T" key
  T(392);
 }
 else if (e.keyCode == 69) {              // "E" key
  E(222);
 }
 else if (e.keyCode == 66) {              // "B" key
  B(187);
 }
 else if (e.keyCode == 65) {              // "A" key
  A(489);
 }
 else if (e.keyCode == 82) {              // "R" key
  R(500);
 }
});
});