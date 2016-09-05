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
	// *** Master effects ***
	// envelope
	var ramp = audioContext.createGain()
	ramp.gain.value = 0;
	oscillator.connect(ramp);
	// bandpass
  	var bandpass = audioContext.createBiquadFilter()
  	bandpass.type = 'bandpass';
  	bandpass.frequency.value = 1200;
  	bandpass.Q.value = 0.9;
	// compressor
	// overdrive
	var shaper = audioContext.createWaveShaper()
	shaper.curve = generateCurve(22050)

	function generateCurve(steps){
  		var curve = new Float32Array(steps)
  		var deg = Math.PI / 180

	  	for (var i=0;i<steps;i++) {
    		var x = i * 2 / steps - 1
    	curve[i] = (3 + 10) * x * 20 * deg / (Math.PI + 10 * Math.abs(x))
  		}

  		return curve
}

	var amp = audioContext.createGain()
	amp.gain.value = 0.1;
	ramp.connect(amp);
	ramp.connect(bandpass);
	amp.connect(bandpass);
	bandpass.connect(shaper);
	bandpass.connect(out);
	shaper.connect(out);
	// reverb --ToDo

	oscillator.start(startTime);
	ramp.gain.setTargetAtTime(1, startTime, 0.1);
  	ramp.gain.setTargetAtTime(0, endTime, duration/2);
	oscillator.stop(endTime + 2);
}

// setup sound banks
function W(){
	osc(440, 'sawtooth', out, 0.5);
	osc(248, 'sine', out, 2);
	osc(392, 'sawtooth', out, 0.5);
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
  W();
 }
 else if (e.keyCode == 72) {              // "H" key
  H();
 }
 else if (e.keyCode == 73) {              // "I" key
  I();
 }
 else if (e.keyCode == 84) {              // "T" key
  T();
 }
 else if (e.keyCode == 69) {              // "E" key
  E();
 }
 else if (e.keyCode == 66) {              // "B" key
  B();
 }
 else if (e.keyCode == 65) {              // "A" key
  A();
 }
 else if (e.keyCode == 82) {              // "R" key
  R();
 }
});
});