import React from 'react';
import * as THREE from 'three';

require('./lib.js');

class Simple extends React.Component {

  componentDidMount() {
    var container;
    var camera, scene, renderer;

    var raycaster;
    var mouse;

    var PI2 = Math.PI * 2;

    var programFill = function (ctx) {

      ctx.lineWidth = 0.025;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 1);
      ctx.lineTo(0.25, 1);
      ctx.lineTo(0.45, 0.8);
      ctx.lineTo(1.35, 0.8);
      ctx.lineTo(1.35, 0);
      ctx.lineTo(0, 0);
      ctx.stroke();
      ctx.fill();

    };

    var programStroke = function (ctx) {

      ctx.lineWidth = 0.025;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 1);
      ctx.lineTo(0.25, 1);
      ctx.lineTo(0.45, 0.8);
      ctx.lineTo(1.35, 0.8);
      ctx.lineTo(1.35, 0);
      ctx.lineTo(0, 0);
      ctx.stroke();

    };

    var INTERSECTED;

    init();
    animate();

    function init() {

      container = document.getElementById('threecontainer');

      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 100, 1000000000);
      camera.position.set(0, 300, 500);

      scene = new THREE.Scene();

      for (var i = 0; i < 1700; i++) {

        var particle = new THREE.Sprite(new THREE.SpriteCanvasMaterial({ color: Math.random() * 0x808080 + 0x808080, program: programStroke }));
        particle.position.x = Math.random() * 500 - 200;
        particle.position.y = Math.random() * 400 - 200;
        particle.position.z = Math.random() * 1800 - 700;
        particle.scale.x = particle.scale.y = Math.random() * 5 + 10;
        scene.add(particle);

      }

      //

      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();

      renderer = new THREE.CanvasRenderer();
      renderer.setClearColor(0xf0f0f0);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      document.addEventListener('mousemove', onDocumentMouseMove, false);

      //

      window.addEventListener('resize', onWindowResize, false);

    }

    function onWindowResize() {
      for (var i = 0; i < scene.children.length; i += 1) {
        scene.children[i].material.program = programFill;
      }

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function onDocumentMouseMove(event) {

      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    }

    //

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    var radius = 300;
    var theta = 0;

    function render() {

      // rotate camera

      theta += 0.2;

      camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
      camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
      camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
      camera.lookAt(scene.position);

      camera.updateMatrixWorld();

      // find intersections

      // raycaster.setFromCamera( mouse, camera );

      // var intersects = raycaster.intersectObjects( scene.children );

      // if ( intersects.length > 0 ) {

      // 	if ( INTERSECTED != intersects[ 0 ].object ) {

      // 		if ( INTERSECTED ) INTERSECTED.material.program = programStroke;

      // 		INTERSECTED = intersects[ 0 ].object;
      // 		INTERSECTED.material.program = programFill;

      // 	}

      // } else {

      // 	if ( INTERSECTED ) INTERSECTED.material.program = programStroke;

      // 	INTERSECTED = null;

      // }

      renderer.render(scene, camera);

    }
  }

  render() {
    return (
      <div id="threecontainer" />
    );
  }
}

module.exports = Simple;
