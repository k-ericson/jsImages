//counter to help id elements
let counter = 0;
let base = "picture"
const names = [];
const reduction = 3;

function addGuy(holderID, url) {
    let outer = document.getElementById(holderID);
    let newname = base + counter;
    counter++;
    names.push(newname);
    let image = document.createElement('img');
    //image.setAttribute('crossorigin', 'anonymous');
    let downloadingImage = new Image();
    downloadingImage.crossOrigin = "Anonymous";
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    //let text = document.createTextNode(newname);
    //button.appendChild(text);
    outer.appendChild(image);
    downloadingImage.onload=function(){
	let h = this.height
	let w = this.width
	canvas.width = w / reduction;
	canvas.height = h / reduction;
	ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
	const uri = canvas.toDataURL();
	image.src = uri;
//	image.src = this.src;
//	outer.appendChild(image);
    };
    downloadingImage.src=url;
}
