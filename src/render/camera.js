function drawCamera() {
  // Move origin to center of screen
  translate(width / 2, height / 2);
  // Apply zoom
  scale(cam.zoom);
  // Pan the world
  translate(-cam.x, -cam.y);

  // console.log(cam.zoom);
}
