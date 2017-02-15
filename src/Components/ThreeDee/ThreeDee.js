import React from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

require('./lib.js');

const Categories = styled.div`
  z-index: 999;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 30px;
`;

const Category = styled.span`
  padding: 10px;
`;

class Simple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      videocolor: '#00ccff',
      photocolor: '#3333cc',
      textcolor: '#99cc00',
      audiocolor: '#993399',
      printcolor: '#ff33cc',
    };
    this.container = {};
    this.camera = {};
    this.scene = {};
    this.renderer = {};
    this.raycaster = {};
    this.mouse = {};
    this.INTERSECTED = null;
    this.theta = 0;
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.animate = this.animate.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    this.init = this.init.bind(this);
    this.renderThree = this.renderThree.bind(this);
    this.addMedia = this.addMedia.bind(this);
  }

  componentDidMount() {
    this.init();
    this.animate();
    //
  }

  handleCategorySelect(category) {
    this.setState({
      selectedCategory: category,
    });
  }

  addMedia(number, color, media) {
    for (var i = 0; i < number; i++) {
      const particle = new THREE.Sprite(new THREE.SpriteCanvasMaterial({ color: color, program: this.programStroke }));
      particle.position.x = Math.random() * 500 - 200;
      particle.position.y = Math.random() * 400 - 200;
      particle.position.z = Math.random() * 1800 - 700;
      particle.scale.x = particle.scale.y = Math.random() * 5 + 10;
      particle.media = media;
      this.scene.add(particle);
    }
  }

  onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

  onDocumentMouseMove(event) {
    event.preventDefault();

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderThree();
  }

  init() {
    // process data object
    const data = {
      video: 400,
      photo: 600,
      text: 200,
      audio: 200,
      print: 300,
    };

    this.container = document.getElementById('threecontainer');

    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 100, 1000000000);
    this.camera.position.set(0, 300, 500);

    this.scene = new THREE.Scene();
    this.addMedia(data.video, this.state.videocolor, 'video');
    this.addMedia(data.photo, this.state.photocolor, 'photo');
    this.addMedia(data.text, this.state.textcolor, 'text');
    this.addMedia(data.audio, this.state.audiocolor, 'audio');
    this.addMedia(data.print, this.state.printcolor, 'print');

    //

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.renderer = new THREE.CanvasRenderer();
    this.renderer.setClearColor(0xf0f0f0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    document.addEventListener('mousemove', this.onDocumentMouseMove, false);

    //

    window.addEventListener('resize', this.onWindowResize, false);
  }

  renderThree() {
    const radius = 250;
    // rotate camera
    this.theta += 0.1;

    this.camera.position.x = radius * Math.sin(THREE.Math.degToRad(this.theta));
    this.camera.position.y = radius * Math.sin(THREE.Math.degToRad(this.theta));
    this.camera.position.z = radius * Math.cos(THREE.Math.degToRad(this.theta));
    this.camera.lookAt(this.scene.position);

    this.camera.updateMatrixWorld();

    // find intersections

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      if (this.INTERSECTED !== intersects[0].object) {
        if (this.INTERSECTED) this.INTERSECTED.material.program = this.programStroke;
        this.INTERSECTED = intersects[0].object;
        this.INTERSECTED.material.program = this.programFill;
      }
    } else {
      if (this.INTERSECTED) this.INTERSECTED.material.program = this.programStroke;

      this.INTERSECTED = null;
    }

    this.renderer.render(this.scene, this.camera);
  }

  programFill(ctx) {
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
  }

  programStroke(ctx) {
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
  }

  render() {
    return (
      <div>
        <div id="threecontainer" />
        <Categories>
          <Category style={{ color: this.state.videocolor }} onMouseOver={() => this.handleCategorySelect('video')}>
            Video
          </Category>
          <Category style={{ color: this.state.textcolor }} onMouseOver={() => this.handleCategorySelect('text')}>
            Text
          </Category>
          <Category style={{ color: this.state.photocolor }} onMouseOver={() => this.handleCategorySelect('photos')}>
            Photos
          </Category>
          <Category style={{ color: this.state.audiocolor }} onMouseOver={() => this.handleCategorySelect('audio')}>
            Audio
          </Category>
          <Category style={{ color: this.state.printcolor }} onMouseOver={() => this.handleCategorySelect('prints')}>
            Prints
          </Category>
        </Categories>
      </div>

    );
  }
}

module.exports = Simple;
