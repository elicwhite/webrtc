function Webcam(vidElement, canvasElement) {
	var self = this;

	var initialized = false;

	// Different browsers use different resolutions, we set height later based on ratio
	var width = 320;
	var height = 0;

	var streaming = false;

	// The actual video stream
	var stream;

	self.initialize = function() {
		navigator.getUserMedia = (navigator.getUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.webkitGetUserMedia || navigator.msGetUserMedia);

		initialized = true;


	}

	self.isSupported = function() {
		if (!initialized) {
			console.error("initialize() must be called first");
			return;
		}

		return !!navigator.getUserMedia;
	};

	self.start = function() {
		if (!initialized) {
			console.error("initialize() must be called first");
			return;
		}

		if (!self.isSupported) {
			console.error("WebRTC isn't supported");
			return;
		}

		navigator.getUserMedia({
			video: true,
			audio: false
		}, function success(s) {
			stream = s;
			if (navigator.mozGetUserMedia) {
				vidElement.mozSrcObject = stream;
			} else {
				var vendorURL = window.URL || window.webkitURL;
				vidElement.src = vendorURL.createObjectURL(stream);
			}
			vidElement.play();
		}, function error(error) {
			console.log("An error occured starting the stream")
			console.log(error);
		});
	}

	self.end = function() {
		vidElement.src = "";
		stream.stop();
	}

	self.capture = function() {
		// This is likely unnecessary since we already set this in
		// the canplay event listener
		canvasElement.width = width;
		canvasElement.height = height;

		canvasElement.getContext('2d').drawImage(vidElement, 0, 0, width, height);
    
	    // This is the image we need to upload
	    var data = canvas.toDataURL('image/png');

	    return data;
	}

	vidElement.addEventListener('canplay', function(ev) {
		if (!streaming) {
			height = vidElement.videoHeight / (vidElement.videoWidth / width);
			vidElement.setAttribute('width', width);
			vidElement.setAttribute('height', height);
			canvasElement.setAttribute('width', width);
			canvasElement.setAttribute('height', height);
			streaming = true;
		}
	}, false);
}