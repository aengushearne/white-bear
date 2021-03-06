$(document).ready(function(){
// setup audioContext
var audioContext = new AudioContext()

var out = audioContext.destination;
// master volume control
var volumeCh1 = audioContext.createGain()
volumeCh1.gain.value = 0.05;
volumeCh1.connect(out);
var volumeCh2 = audioContext.createGain()
volumeCh2.gain.value = 0.05;
volumeCh2.connect(out);
// *** analyser node for graphical display ***
var analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);
	// canvas
	var canvas = document.getElementById("graph");
	var canvasCtx = canvas.getContext("2d");
	$(canvasCtx.canvas).css("width", "100%");
	canvasCtx.clearRect(0, 0, 2000, 300);
	function draw() {
		drawVisual = requestAnimationFrame(draw);
		analyser.getByteTimeDomainData(dataArray);
		canvasCtx.fillStyle = 'grey';
      	canvasCtx.fillRect(0, 0, 2000, 300);
      	canvasCtx.lineWidth = 1.5;
      	canvasCtx.strokeStyle = 'white';

      	canvasCtx.beginPath();
      	var sliceWidth = 2000 * 1.0 / bufferLength;
      	var x = 0;

      	for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * 300/2;

        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      	}
      	canvasCtx.lineTo(canvas.width, canvas.height/2);
      	canvasCtx.stroke();
    };
    draw();
// load samples --ToDo

// play sound function (different for samples and synth?)
function osc(freq, type, dtn) {
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
	// compressor --ToDo
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
	amp.gain.value = 3;
	ramp.connect(amp);
	ramp.connect(bandpass);
	amp.connect(bandpass);
	bandpass.connect(shaper);
	bandpass.connect(volumeCh1);
	shaper.connect(volumeCh2);
	// connect to analyser
	shaper.connect(analyser);
	// reverb --ToDo

	oscillator.start(startTime);
	ramp.gain.setTargetAtTime(1, startTime, 0.1);
  	ramp.gain.setTargetAtTime(0, endTime, duration/2);
	oscillator.stop(endTime + 2);
}

// setup sound banks
function W(){
	osc(440, 'sawtooth', 0.5);
	osc(248, 'sine', 2);
	osc(392, 'sawtooth', 0.5);
	lightUp('w');
}
function H(){
	osc(387, 'sawtooth', 1);
	lightUp('h');
}
function I(){
	osc(248, 'sine', 2);
	lightUp('i');
}
function T(){
	osc(392, 'sawtooth', 0.5);
	lightUp('t');
}
function E(){
	osc(222, 'sawtooth', 2);
	lightUp('e');
}
function B(){
	osc(187, 'sawtooth', 2.5);
	lightUp('b');
}
function A(){
	osc(489, 'sine', 0.5);
	lightUp('a');
}
function R(){
	osc(500, 'sawtooth', 0.4);
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