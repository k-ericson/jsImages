# Image Viewer Webpage

* Uses HTML, JavaScript, jQuery

Goals:
- Load an image from URL
  * makes use of HTML5 [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API#browser_compatibility) for later image manipulation, requires origin servers to use appropriate CORS header, will otherwise result in tainted canvas exceptions more info here: [Allowing cross-origin use of images and canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).
  * known good links for testing:
    * https://i.natgeofe.com/n/8db5f26c-4c1a-4788-8158-ed7a23bd1b55/3700211_2x3.jpg
	* https://i.natgeofe.com/n/8db5f26c-4c1a-4788-8158-ed7a23bd1b55/3700211_2x3.jpg
	* https://upload.wikimedia.org/wikipedia/commons/9/96/Wayne%27s_Pachifractal_very_large_bright.jpg
	* https://upload.wikimedia.org/wikipedia/en/7/78/Small_scream.png

- Image loading occurs asynchronously, images are shown in a scaled format in the gallery
  * scaling can be set in helper.js, currently set to a factor of 5
  * webpage could be updated to allow for setting scaling factor through the webpage

- Images loaded stay in gallery once loaded, and moveable with mouse dragging
  * drag and drop functionality made possible with jQuery UI [sortable](https://jqueryui.com/sortable/)

- Double-clicking a gallery image opens the image up in a modal.  It's width will default to the minimum of the original image width or the current screen width.
  * responds to active resizing of the window

- "Blue Channel +100" button
  * appears in both modal and gallery mode
	* gallery mode ties to an image after it is selected via a single click
  * will not increase any blue channel values above 255
  * modifies original, full-size, downloaded image, change is then reflected in modal and gallery views
  * if more than one pixel value needs to be updated, a more efficient approach can/should be used, but no real speedups possible for just updating the one channel.
