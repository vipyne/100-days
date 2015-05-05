;(function(window, document, undefined){

  var width = 700,
      height = 400;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  document.getElementById('cube-carousel').appendChild( renderer.domElement );

  var geometry = new THREE.BoxGeometry( 2, 1, 1, 5, 5, 5 );
  var material = new THREE.MeshBasicMaterial( { color: 0xFF8533, wireframe: false, transparent: true, opacity: 0.6 } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  var geometry2 = new THREE.BoxGeometry( 12, 3, 1 );
  var material2 = new THREE.MeshBasicMaterial( { color: 0xFF3399, wireframe: false, transparent: true, opacity: 0.8 } );
  var cube2 = new THREE.Mesh( geometry2, material2 );
  cube2.position.z = -.21;
  scene.add( cube2 );

  camera.position.z = 3;

  function rotateCube() {
    cube.rotation.x += this.speed;
    cube.rotation.y += .06;
  }

  speed = 0.01;

  document.getElementById('all').addEventListener('click', function(e) {
    if (e.clientX < 350) {
      speed = e.clientX / 1000;
    } else {
      speed += e.clientX / 8000;
    }
  }, false);

  function render() {
    requestAnimationFrame( render );
    rotateCube();
    renderer.render( scene, camera );
  }

  render();

})(window, document);