$(document).ready(function(){
// setup audioContext
var audioContext = new AudioContext()

// play sound function (different for samples and synth)
function osc(freq) {

	var oscillator = audioContext.createOscillator()
	oscillator.type = 'sawtooth'
	oscillator.frequency.value = freq;
	oscillator.connect(audioContext.destination)

	oscillator.start(audioContext.currentTime)
	oscillator.stop(audioContext.currentTime + 0.5)
}

// load samples
// setup synth options
// animations

// keybindings to trigger play functions
$(document).keydown(function(e) {
 if (e.keyCode == 87) {              // "W" key
  osc(440);
 }
 else if (e.keyCode == 72) {              // "H" key
  osc(387);
 }
 else if (e.keyCode == 73) {              // "I" key
  osc(248);
 }
 else if (e.keyCode == 84) {              // "T" key
  osc(392);
 }
 else if (e.keyCode == 69) {              // "E" key
  osc(222);
 }
 else if (e.keyCode == 66) {              // "B" key
  osc(187);
 }
 else if (e.keyCode == 65) {              // "A" key
  osc(489);
 }
 else if (e.keyCode == 82) {              // "R" key
  osc(500);
 }
});
});