window.onload = function() {

  var video = document.getElementById("video");
  var canvas = document.getElementById("canvas");
  var photo = document.getElementById("photo");
  var pictureButton = document.getElementById("takePicture");

  var streaming = false;

  var width = 320;
  var heigh = 0;

  pictureButton.addEventListener("click", function(event) {
    takePicture();
    event.preventDefault();
  }, false);

  navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.webkitGetUserMedia || navigator.msGetUserMedia);

  if (navigator.getUserMedia) {
    navigator.getUserMedia({
      video: true,
      audio: false
    }, onSuccess, onError);
  } else {
    alert('getUserMedia is not supported in this browser.');
  }

  function onSuccess(stream) {
    if (navigator.mozGetUserMedia) {
      video.mozSrcObject = stream;
    }
    else
    {
      var vendorURL = window.URL || window.webkitURL;
      video.src = vendorURL.createObjectURL(stream);
    }

    video.play();
  }

  
  video.addEventListener('canplay', function(ev){
    console.log("resizing");
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
      console.log("done");
    }
  }, false);

  
  function takePicture() {
    console.log("trying to capture");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    
    // This is the image we need to upload
    var data = canvas.toDataURL('image/png');
  }

  function onError(error) {
    console.log(error);
    alert('There has been a problem retrieving the streams - did you allow access?');
  }
};