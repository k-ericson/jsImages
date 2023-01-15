//counter to help id elements
let counter = 0;
let base = "picture"
const originals = {};
const reduction = 5;

function addGuy(holderID, url) {
    let outer = document.getElementById(holderID);
    let newname = base + counter;
    counter++;
    //names.push(newname);
    let image = document.createElement('img');
    //image.setAttribute('crossorigin', 'anonymous');
    image.id = newname;
    let downloadingImage = new Image();
    downloadingImage.crossOrigin = "Anonymous";
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    //let text = document.createTextNode(newname);
    //button.appendChild(text);
    outer.appendChild(image);
    downloadingImage.onload=function(){
	downloadingImage.id = newname;
	let h = this.height
	let w = this.width
	canvas.width = w / reduction;
	canvas.height = h / reduction;
	ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
	const uri = canvas.toDataURL();
	image.src = uri;
	image.addEventListener('click', (event) =>{showSelected(image);});
	image.addEventListener('dblclick', (event) => {pullUp(image)});
	originals[newname] = downloadingImage;
//	image.src = this.src;
//	outer.appendChild(image);
    };
    downloadingImage.src=url;
}


function showSelected(img) {
    //alert(img.id);
    const old = document.getElementById("tmp-bluify");
    if (old) {
	old.parentNode.removeChild(old);
    }
    $('img[id^=picture]').each(function(i, el) {
	el.style.border=null;
    });
    img.style="border: 3px solid #000";
    const tmpButton = document.createElement('button');
    tmpButton.innerHTML = "Bluify";
    tmpButton.addEventListener('click', (event) => {bluify(originals[img.id]);});
    tmpButton.id="tmp-bluify";
    img.parentNode.insertBefore(tmpButton, img);
    
}

function pullUp(img) {
    //alert(originals[img.id]);
    let modal = document.getElementById("modalArea");
    let span = modal.getElementsByClassName("close")[0];

    let button = document.getElementById("blueButton");
    
    
    let displayArea = document.getElementById("modalContent");
    
    let image = document.createElement('img');
    image.src = originals[img.id].src;
    image.id = "modal-img"
    image.style="max-width: 100%; height: auto;";

    const listener = (event) => bluify(originals[img.id]);
    button.addEventListener('click', listener);
    
    displayArea.appendChild(image);
    modal.style.display = "block";
    span.onclick = function() {
	modal.style = "none";
	$('img[id=modal-img').each(function(i, el) {
	    displayArea.removeChild(el);
	});
	button.removeEventListener('click', listener);
    }
    
}

function bluify(image) {
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');
    
    let width = image.width;
    let height = image.height;
    cvs.width = width;
    cvs.height = height;
    alert("Image width: " + width + " Image height: " + height);
    ctx.drawImage(image, 0, 0, width, height);
    alert("Canvas width: " + cvs.width + " Canvas height: " + cvs.height);
    var iData = ctx.getImageData(0, 0, width, height);
    //alert(iData);
    var data = iData.data;
    //alert("original data length: " + data.length);
    for (var i = 0; i < data.length; i += 4) {
	const val = data[i + 2] + 100;
	data[i + 2] = (val > 255 ? 255 : val);
	 //   alert('original: ' + val + ' new: ' + data[idx + 2]);
    }
    //alert(data.length + " -> after looping");
    //iData.data = data;
    ctx.putImageData(iData,0, 0, 0, 0, width, height);
    alert("Canvas width: " + cvs.width + " Canvas height: " + cvs.height);
    //alert(iData.data.length + " -> now after putting");
    //ctx.drawImage(image, 0, 0, width, height);
    const uri = cvs.toDataURL()
    //update in modal, in small view, and in originals[]
    originals[image.id].src = uri;
    //var x = originals[image.id];
    //alert("x: " + x);
    
    //maybe?
    //image.src = uri;
    let modalImg = document.getElementById('modal-img');
    if (modalImg) {
	modalImg.src = uri;
    }
    //width = width / reduction;
    //height /= reduction;
    //ctx.drawImage(modalImg, 0, 0, width, height);
    //const uri2 = canvas.toDataURL();
    //alert("image id: " + image.id);
    //let smaller = document.getElementById(image.id);
    //smaller.src = uri2;
}
