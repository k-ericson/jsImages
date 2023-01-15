// counter and base to help id elements
let counter = 0;
let base = "picture"
// holding original downloads, no scaling
const originals = {};
// constant image reduction for condensed view
const reduction = 5;

// download image, add scaled version to gallery
// requires target div and image url to load
function addImage(holderID, url) {
    let outer = document.getElementById(holderID);
    let newname = base + counter;
    counter++;

    // actual image for the page
    let image = document.createElement('img');
    image.id = newname;
    image.init = true;
    outer.appendChild(image);
    
    // non-visible image to handle asynchronous download
    // holds original download in originals
    let downloadingImage = new Image();
    // needed to manipulate image from a different domain
    downloadingImage.crossOrigin = "Anonymous";
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    downloadingImage.onload=function(){
	downloadingImage.id = newname;
	let h = this.height
	let w = this.width
	// apply scaling for smaller overview
	canvas.width = w / reduction;
	canvas.height = h / reduction;
	ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
	const uri = canvas.toDataURL();
	image.src = uri;
	// add selection/double click logic, but only the first time
	if (image.init === true) {
	    image.addEventListener('click', (event) =>{showSelected(image);});
	    image.addEventListener('dblclick', (event) => {pullUp(image)});
	    originals[newname] = downloadingImage;
	    image.init = false;
	}
    };
    // kick off download
    downloadingImage.src=url;
}

// creates thicker border around currently selected image
// connects image to gallery blue channel +100 button
function showSelected(img) {
    // clone & remove old button (clear event listeners)
    const old = document.getElementById("gallery-blue");
    const tmpButton = old.cloneNode(true);
    old.parentNode.replaceChild(tmpButton, old);
    // remove any old borders
    $('img[id^=picture]').each(function(i, el) {
	el.style.border=null;
    });
    img.style="border: 3px solid #000";
    
    tmpButton.addEventListener('click', (event) => {bluify(originals[img.id]);});
}

// logic to pull up modal with image either original dimensions or
// scaled down to window width.
// Sets up onclick event for the button tied to this image
function pullUp(img) {
    let modal = document.getElementById("modalArea");
    let span = modal.getElementsByClassName("close")[0];
    let button = document.getElementById("blueButton");
    
    let displayArea = document.getElementById("modalContent");

    // new image of original width/window width
    let image = document.createElement('img');
    image.src = originals[img.id].src;
    image.id = "modal-img"
    image.style="max-width: 100%; height: auto;";

    // set up button event
    const listener = (event) => bluify(originals[img.id]);
    button.addEventListener('click', listener);
    
    displayArea.appendChild(image);
    modal.style.display = "block";

    // handles closing the modal and cleaning up the image/button event
    span.onclick = function() {
	modal.style = "none";
	$('img[id=modal-img').each(function(i, el) {
	    displayArea.removeChild(el);
	});
	button.removeEventListener('click', listener);
    }
    
}

// Walks through image and increases blue channel values by 100
// Caps value at 255
// Processes original image
function bluify(image) {
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');
    
    let width = image.width;
    let height = image.height;
    cvs.width = width;
    cvs.height = height;
    
    ctx.drawImage(image, 0, 0, width, height);

    // not efficient if we're updating multiple pixel values
    var iData = ctx.getImageData(0, 0, width, height);
    var data = iData.data;
    for (var i = 0; i < data.length; i += 4) {
	const val = data[i + 2] + 100;
	data[i + 2] = (val > 255 ? 255 : val);
    }
    // save modified data back to canvas context
    ctx.putImageData(iData,0, 0, 0, 0, width, height);

    // grab modified image URI to save back into original image/modal
    const uri = cvs.toDataURL()

    // updating the original refreshes the gallery view
    originals[image.id].src = uri;

    // if we are in the modal, update the modal
    let modalImg = document.getElementById('modal-img');
    if (modalImg) {
     	modalImg.src = uri;
    }
}
