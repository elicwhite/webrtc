window.onload = function() {
  

  var video = document.getElementById("video");
  var canvas = document.getElementById("canvas");
  var pictureButton = document.getElementById("takePicture");
  var stopButton = document.getElementById("stop");

  var webcam = new Webcam(video, canvas);
  webcam.initialize();

  if (!webcam.isSupported()) {
    alert("Your browser doesn't support webrtc");
    return;
  }

  webcam.start();

  pictureButton.addEventListener("click", function() {
    webcam.end();
  });
};