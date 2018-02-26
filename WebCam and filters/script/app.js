// Global vaariables
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;
// DOM Elements
const video = document.getElementById('video'),
      canvas = document.getElementById('canvas'),
      photos = document.getElementById('photos'),
      captureBtn = document.getElementById('capture-btn'),
      photoFilter = document.getElementById('photo-filter'),
      resetBtn = document.getElementById('reset-btn')
     

// get media stream and start video stream
document.getElementById('start-btn').addEventListener('click',function(e){
  // display camera pic
  setTimeout(function(){
    document.getElementById('cam-pic').classList.add('show');
    document.getElementById('video').style.opacity="1";
  },1000);  
  
  // activate camera
  navigator.mediaDevices.getUserMedia({video:true, audio: false})

  .then(function(stream){
    // link to video source 
    video.srcObject = stream;
    // play video 
    video.play()
  })
  .catch(function(err){
    console.log(`Error:${err}`)
  });
  e.preventDefault();
})

// Play when ready
video.addEventListener('canplay',function(e){
  
  if(!streaming){
    // set video / canvas height 
    height = video.videoHeight / (video.videoWidth/width);

    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('heigth', height);

    streaming = true;
  }
}, false);

// reset all
resetBtn.addEventListener('click', function(e){
  // clear photos
  photos.innerHTML = '';
  // reset filter
  filter = '';
  // reset video filter
  video.style.filter = filter;
  // reset filter options
  photoFilter.selectedIndex = 0;

  e.preventDefault();
})  

// take photo
captureBtn.addEventListener('click', function(e){
  takePicture();
  e.preventDefault();
}, false);
// add filter
photoFilter.addEventListener('change',function(e){
  filter = e.target.value;
  video.style.filter = filter;
  e.preventDefault();
})
function takePicture(){
  // Create canvas
  const context = canvas.getContext('2d');
  if(width && height){
    // set canvas
    canvas.width = width;
    canvas.height = height;
    // draw an image from the stream on the canvas
    context.drawImage(video, 0, 0,width, height);

    // create image from the canvas
    const imgUrl = canvas.toDataURL('img/png');
    // create image element 
    const img = document.createElement('img');
    // set imaage source
    img.setAttribute('src', imgUrl);
    // set filter to captured pics
    img.style.filter = filter;
    // add img to photos
    photos.appendChild(img); 
  }
}

