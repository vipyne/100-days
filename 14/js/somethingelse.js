;(function(w, d, u) {
    console.log('this.fart');

  this.mouse = [100,100];
  this.theta = 0.0;
  // MOUSE LOCATION
  var _this = this;
  window.addEventListener('mousemove', function(event) {
    _this.mouse = [event.clientX, event.clientY];
    // console.log('this.mouse', this.mouse);
    // console.log('this.theta', this.theta);
    this.theta += 0.1;
  });

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth/1.1, window.innerHeight/1.1);
  document.body.appendChild((renderer.domElement));

  var camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
  // var camera = new THREE.PerspectiveCamera(45, window.innerWidth/1.1, window.innerHeight/1.1, 1, 500);
  camera.position.set(0, 0, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  // camera.lookAt(new THREE.Vector3(this.mouse[0], this.mouse[1], 0));

  var scene = new THREE.Scene();

  var material = new THREE.LineBasicMaterial({ color: 0x3497aa,
                                               linewidth: 9,
                                               linecap: 'round', //ignored by WebGLRenderer
                                               linejoin:  'round' //ignored by WebGLRenderer
                                            });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(-50, -50, -50)); // X
  geometry.vertices.push(new THREE.Vector3(50, -50, -50)); // Y

  geometry.vertices.push(new THREE.Vector3(50, 50, -50)); // Y
  geometry.vertices.push(new THREE.Vector3(-50, 50, -50)); // X

  geometry.vertices.push(new THREE.Vector3(-50, 50, 50)); // X
  geometry.vertices.push(new THREE.Vector3(-50, 50, 50)); // Y

  geometry.vertices.push(new THREE.Vector3(50, 50, 50)); // X
  geometry.vertices.push(new THREE.Vector3(50, -50, 50)); // Y

  geometry.vertices.push(new THREE.Vector3(-50, -50, 50)); // Y
  geometry.vertices.push(new THREE.Vector3(-50, -50, -50)); // Y

  // camera.lookAt(geometry.vertices[0]);

  var line = new THREE.Line(geometry, material);
  // var line = new THREE.LineSegments(geometry, material);
  scene.add(line);


  function animate() {
    var x = _this.mouse[0];
    var y = _this.mouse[1];

    var hyp = Math.sqrt( (x-window.innerWidth/2) * (x-window.innerWidth/2) + (y-window.innerHeight/2) * (y-window.innerHeight/2) );
    var normalizedX = (x-window.innerWidth/2) / hyp;
    var normalizedY = (y-window.innerHeight/2) / hyp;

    var theta = Math.atan2(normalizedY, normalizedX);


    camera.position.set(Math.sin(theta)*80, Math.cos(theta)*80, Math.cos(theta)*80); ////////////





    // camera.position.set(Math.cos(theta)*80, Math.cos(theta + Math.PI)*80, -Math.sin(theta)*80); ////////////
    // camera.position.set(Math.cos(normalizedX)*80, -Math.sin(normalizedY)*80, -Math.sin(normalizedY)*80); ////////////

    // camera.position.set(Math.tan(theta)*80, Math.cos(theta)*80, Math.cos(theta)*80); ////////////

    // camera.position.set(Math.sin(theta)*80, Math.cos(theta)*80, -Math.cos(theta + Math.PI)*80); ////////////
    // camera.position.set(Math.sin(theta)*80, Math.cos(theta)*80, -Math.cos(theta + Math.PI)*80); ////////////

    // camera.position.set(Math.sin(theta)*80, Math.cos(theta + Math.PI)*80, 0); ////////////
    // camera.position.set(Math.sin(theta)*80, Math.cos(theta + Math.PI)*80, Math.cos(theta)*80); ////////////

    // camera.position.set(Math.sin(theta)*10, -Math.sin(theta)*10, Math.cos(theta)*10);

    // camera.position.set(Math.atan2(normalizedY, normalizedX)*30, Math.atan2(normalizedY, normalizedX)*30, 20);
    // camera.position.set(Math.sin(Math.atan2(normalizedY, normalizedX))*30, Math.cos(Math.atan2(normalizedY, normalizedX))*30, 20);

    // let angleSomething = x-window.innerWidth/2;

    // camera.position.set(Math.sin(angleSomething), 0, Math.cos(angleSomething));
    // camera.position.set(Math.sin(this.theta)*30, 0, Math.cos(this.theta)*30);

    // var x = Math.atan2(this.mouse[0]);
    // camera.position.set(this.mouse[0], 0, this.mouse[1]);
    // var x = Math.atan2(this.mouse[0], this.mouse[1]);
    // camera.position.set(-Math.sin(x)*30, Math.cos(x)*30, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer.render(scene, camera);

    requestAnimationFrame( animate );
  }

  animate();


})(window, document, undefined);
