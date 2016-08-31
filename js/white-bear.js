$(document).ready(function(){
// setup audioContext
var audioContext = new AudioContext()

// load samples

// play sound function (different for samples and synth?)
function osc(freq, type) {

	var oscillator = audioContext.createOscillator()
	oscillator.type = type;
	oscillator.frequency.value = freq;
	oscillator.connect(audioContext.destination)

	oscillator.start(audioContext.currentTime)
	oscillator.stop(audioContext.currentTime + 0.5)
}

// setup sound banks
function W(){
	osc(440, 'sawtooth');
}
function H(){
	osc(387, 'sawtooth');
}
function I(){
	osc(248, 'sawtooth');
}
function T(){
	osc(392, 'sawtooth');
}
function E(){
	osc(222, 'sawtooth');
}
function B(){
	osc(187, 'sawtooth');
}
function A(){
	osc(489, 'sawtooth');
}
function R(){
	osc(500, 'sawtooth');
}
// animations

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