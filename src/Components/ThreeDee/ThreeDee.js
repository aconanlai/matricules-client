import React from 'react';
import * as THREE from 'three';

require('./lib.js');

class Simple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videocolor: '#00ccff',
      photocolor: '#3333cc',
      textcolor: '#99cc00',
      audiocolor: '#993399',
      printcolor: '#ff33cc',
    };
  }

  componentDidMount() {
    const videocolor = this.state.videocolor;
    const photocolor = this.state.photocolor;
    const textcolor = this.state.textcolor;
    const audiocolor = this.state.audiocolor;
    const printcolor = this.state.printcolor;
    let container;
    let camera;
    let scene;
    let renderer;

    let raycaster;
    let mouse;

    const PI2 = Math.PI * 2;

    const programFill = (ctx) => {
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

    const programStroke = (ctx) => {
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

    let INTERSECTED;

    init();
    animate();
    function addMedia(number, color, media) {
      for (var i = 0; i < number; i++) {
        const particle = new THREE.Sprite(new THREE.SpriteCanvasMaterial({ color: color, program: programStroke }));
        particle.position.x = Math.random() * 500 - 200;
        particle.position.y = Math.random() * 400 - 200;
        particle.position.z = Math.random() * 1800 - 700;
        particle.scale.x = particle.scale.y = Math.random() * 5 + 10;
        particle.media = media;
        scene.add(particle);
      }
    }

    function init() {

      // process data object
      const data = {
        video: 400,
        photo: 600,
        text: 200,
        audio: 200,
        print: 300,
      };

      container = document.getElementById('threecontainer');

      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 100, 1000000000);
      camera.position.set(0, 300, 500);

      scene = new THREE.Scene();
      addMedia(data.video, videocolor, 'video');
      addMedia(data.photo, photocolor, 'photo');
      addMedia(data.text, textcolor, 'text');
      addMedia(data.audio, audiocolor, 'audio');
      addMedia(data.print, printcolor, 'print');

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
    };

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event) {

      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    };

    //

    function animate() {
      requestAnimationFrame(animate);
      render();
    };

    const radius = 250;
    let theta = 0;

    function render() {
      // rotate camera

      theta += 0.1;

      camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
      camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
      camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
      camera.lookAt(scene.position);

      camera.updateMatrixWorld();

      // find intersections

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        if (INTERSECTED !== intersects[0].object) {
          if (INTERSECTED) INTERSECTED.material.program = programStroke;
          INTERSECTED = intersects[0].object;
          INTERSECTED.material.program = programFill;
        }
      } else {
        if (INTERSECTED) INTERSECTED.material.program = programStroke;

        INTERSECTED = null;
      }

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
