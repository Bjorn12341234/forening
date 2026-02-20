// NaturHänsyn — Three.js Aurora Scene
// Flows behind the CTA banner section as a living background
// Progressive enhancement: graceful fallback if WebGL unavailable

import * as THREE from './three.min.js';

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('aurora-canvas');
  if (!canvas) return;

  // WebGL detection
  try {
    var tc = document.createElement('canvas');
    if (!(tc.getContext('webgl') || tc.getContext('experimental-webgl'))) {
      canvas.remove();
      return;
    }
  } catch (e) { canvas.remove(); return; }

  // ============================================
  // GLSL simplex noise
  // ============================================
  var noiseGLSL = [
    'vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}',
    'vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}',
    'vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}',
    'vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}',
    'float snoise(vec3 v){',
    '  const vec2 C=vec2(1.0/6.0,1.0/3.0);',
    '  const vec4 D=vec4(0.0,0.5,1.0,2.0);',
    '  vec3 i=floor(v+dot(v,C.yyy));',
    '  vec3 x0=v-i+dot(i,C.xxx);',
    '  vec3 g=step(x0.yzx,x0.xyz);',
    '  vec3 l=1.0-g;',
    '  vec3 i1=min(g.xyz,l.zxy);',
    '  vec3 i2=max(g.xyz,l.zxy);',
    '  vec3 x1=x0-i1+C.xxx;',
    '  vec3 x2=x0-i2+C.yyy;',
    '  vec3 x3=x0-D.yyy;',
    '  i=mod289(i);',
    '  vec4 p=permute(permute(permute(',
    '    i.z+vec4(0.0,i1.z,i2.z,1.0))',
    '    +i.y+vec4(0.0,i1.y,i2.y,1.0))',
    '    +i.x+vec4(0.0,i1.x,i2.x,1.0));',
    '  float n_=0.142857142857;',
    '  vec3 ns=n_*D.wyz-D.xzx;',
    '  vec4 j=p-49.0*floor(p*ns.z*ns.z);',
    '  vec4 x_=floor(j*ns.z);',
    '  vec4 y_=floor(j-7.0*x_);',
    '  vec4 x=x_*ns.x+ns.yyyy;',
    '  vec4 y=y_*ns.x+ns.yyyy;',
    '  vec4 h=1.0-abs(x)-abs(y);',
    '  vec4 b0=vec4(x.xy,y.xy);',
    '  vec4 b1=vec4(x.zw,y.zw);',
    '  vec4 s0=floor(b0)*2.0+1.0;',
    '  vec4 s1=floor(b1)*2.0+1.0;',
    '  vec4 sh=-step(h,vec4(0.0));',
    '  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;',
    '  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;',
    '  vec3 p0=vec3(a0.xy,h.x);',
    '  vec3 p1=vec3(a0.zw,h.y);',
    '  vec3 p2=vec3(a1.xy,h.z);',
    '  vec3 p3=vec3(a1.zw,h.w);',
    '  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));',
    '  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;',
    '  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);',
    '  m=m*m;',
    '  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));',
    '}'
  ].join('\n');

  // ============================================
  // Scene
  // ============================================
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 6;

  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  var section = document.getElementById('cta-aurora');
  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  // ============================================
  // AURORA RIBBONS — positioned to fill the banner
  // ============================================
  var RIBBON_SEGMENTS = 100;
  var ribbons = [];

  var auroraVert = [
    'uniform float uTime;',
    'uniform float uMouseX;',
    'uniform float uMouseY;',
    'uniform float uSpeed;',
    'uniform float uWaveAmp;',
    'uniform float uNoiseScale;',
    'varying vec2 vUv;',
    'varying float vNoise;',
    noiseGLSL,
    'void main() {',
    '  vUv = uv;',
    '  vec3 pos = position;',
    '  float t = uTime * uSpeed;',
    // Multi-layered wave
    '  float wave = sin(pos.x * 1.2 + t) * uWaveAmp;',
    '  wave += sin(pos.x * 0.6 - t * 0.7) * uWaveAmp * 0.6;',
    '  wave += sin(pos.x * 2.5 + t * 1.3) * uWaveAmp * 0.2;',
    // Noise displacement
    '  float n = snoise(vec3(pos.x * uNoiseScale, pos.y * 0.3, t * 0.25));',
    '  float n2 = snoise(vec3(pos.x * uNoiseScale * 0.6 + 50.0, t * 0.15, pos.y * 0.5));',
    '  pos.y += wave + n * 1.2;',
    '  pos.z += n2 * 0.6 + sin(pos.x * 0.8 + t * 0.5) * 0.3;',
    // Mouse push
    '  pos.x += uMouseX * 0.4;',
    '  pos.y += uMouseY * 0.2;',
    '  float edgeFade = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);',
    '  vNoise = n * 0.5 + 0.5;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);',
    '}'
  ].join('\n');

  var auroraFrag = [
    'uniform vec3 uColor1;',
    'uniform vec3 uColor2;',
    'uniform vec3 uColor3;',
    'uniform float uTime;',
    'uniform float uOpacity;',
    'varying vec2 vUv;',
    'varying float vNoise;',
    'void main() {',
    // Vertical gradient: bright core, soft edges
    '  float vertFade = 1.0 - pow(abs(vUv.y - 0.5) * 2.0, 1.8);',
    // Horizontal edge fade
    '  float hFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);',
    // Color mixing
    '  vec3 col = mix(uColor1, uColor2, vUv.x + sin(vUv.x * 6.0 + vNoise) * 0.2);',
    '  col = mix(col, uColor3, vNoise * 0.6);',
    // Bright core line
    '  float core = exp(-pow((vUv.y - 0.5) * 5.0, 2.0));',
    '  col += core * 0.5;',
    // Subtle internal shimmer
    '  float shimmer = sin(vUv.x * 30.0 + uTime * 3.0) * 0.5 + 0.5;',
    '  shimmer *= sin(vUv.x * 17.0 - uTime * 1.5) * 0.5 + 0.5;',
    '  col += shimmer * 0.06;',
    '  float alpha = vertFade * hFade * uOpacity;',
    '  gl_FragColor = vec4(col, alpha);',
    '}'
  ].join('\n');

  var ribbonConfigs = [
    {
      c1: [0.42, 0.62, 0.23], c2: [0.25, 0.55, 0.35], c3: [0.60, 0.78, 0.40],
      y: 0.8, speed: 0.22, waveAmp: 0.5, opacity: 0.4, noise: 0.35, width: 1.8
    },
    {
      c1: [0.30, 0.50, 0.18], c2: [0.45, 0.65, 0.28], c3: [0.78, 0.66, 0.43],
      y: -0.3, speed: 0.17, waveAmp: 0.65, opacity: 0.3, noise: 0.3, width: 2.2
    },
    {
      c1: [0.20, 0.48, 0.32], c2: [0.50, 0.72, 0.35], c3: [0.35, 0.60, 0.30],
      y: 1.6, speed: 0.28, waveAmp: 0.4, opacity: 0.25, noise: 0.45, width: 1.4
    },
    {
      c1: [0.55, 0.75, 0.40], c2: [0.35, 0.55, 0.22], c3: [0.82, 0.75, 0.55],
      y: -1.0, speed: 0.2, waveAmp: 0.55, opacity: 0.18, noise: 0.28, width: 2.5
    },
    {
      c1: [0.38, 0.58, 0.25], c2: [0.55, 0.72, 0.38], c3: [0.28, 0.50, 0.30],
      y: 0.0, speed: 0.24, waveAmp: 0.45, opacity: 0.22, noise: 0.4, width: 1.6
    }
  ];

  ribbonConfigs.forEach(function (cfg) {
    var geo = new THREE.PlaneGeometry(16, cfg.width, RIBBON_SEGMENTS, 10);
    var mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouseX: { value: 0 },
        uMouseY: { value: 0 },
        uColor1: { value: new THREE.Vector3(cfg.c1[0], cfg.c1[1], cfg.c1[2]) },
        uColor2: { value: new THREE.Vector3(cfg.c2[0], cfg.c2[1], cfg.c2[2]) },
        uColor3: { value: new THREE.Vector3(cfg.c3[0], cfg.c3[1], cfg.c3[2]) },
        uSpeed: { value: cfg.speed },
        uWaveAmp: { value: cfg.waveAmp },
        uNoiseScale: { value: cfg.noise },
        uOpacity: { value: cfg.opacity }
      },
      vertexShader: auroraVert,
      fragmentShader: auroraFrag,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = cfg.y;
    mesh.position.z = -2.5;
    scene.add(mesh);
    ribbons.push(mesh);
  });

  // ============================================
  // Mouse tracking on section
  // ============================================
  section.addEventListener('mousemove', function (e) {
    var rect = section.getBoundingClientRect();
    mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouse.ty = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }, { passive: true });

  section.addEventListener('mouseleave', function () {
    mouse.tx = 0;
    mouse.ty = 0;
  }, { passive: true });

  // ============================================
  // Resize
  // ============================================
  function handleResize() {
    var rect = section.getBoundingClientRect();
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(rect.width, rect.height);
  }
  handleResize();
  window.addEventListener('resize', handleResize, { passive: true });

  // ============================================
  // Animation
  // ============================================
  var clock = new THREE.Clock();
  var animId = null;
  var isVisible = false;

  function animate() {
    animId = requestAnimationFrame(animate);
    if (!isVisible) return;

    var t = clock.getElapsedTime();

    mouse.x += (mouse.tx - mouse.x) * 0.03;
    mouse.y += (mouse.ty - mouse.y) * 0.03;

    for (var i = 0; i < ribbons.length; i++) {
      var u = ribbons[i].material.uniforms;
      u.uTime.value = t;
      u.uMouseX.value = mouse.x;
      u.uMouseY.value = mouse.y;
    }

    // Camera sway
    camera.position.x += (mouse.x * 0.25 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 0.15 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  // Only run when section is in view
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 }).observe(section);
  } else {
    isVisible = true;
  }

  canvas.style.opacity = '1';
  animate();

  window.addEventListener('beforeunload', function () {
    if (animId) cancelAnimationFrame(animId);
    renderer.dispose();
  });
})();
