'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CinematicProductionBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Accessibility check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene & Cinematic Atmospheric Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060810, 0.0035);

    // Camera setup with cinematic 50mm focal length perspective
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 58);

    // WebGL Renderer
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0); // Transparent canvas

      const canvas = renderer.domElement;
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '0';
      container.appendChild(canvas);
    } catch (e) {
      console.warn('WebGL initialization failed:', e);
      return;
    }

    // =========================================================================
    // 1. STUDIO LIGHTING RIG (HIGH-KEY STROBE, KEY LIGHT, RIM & MOOD LIGHTS)
    // =========================================================================
    // Ambient fill light (dark luxury midnight navy)
    const ambientLight = new THREE.AmbientLight(0x0a1022, 1.8);
    scene.add(ambientLight);

    // Studio Key Light (Cool white/cyan soft directional light)
    const keyLight = new THREE.DirectionalLight(0xd0e8ff, 2.2);
    keyLight.position.set(-20, 25, 30);
    scene.add(keyLight);

    // Studio Hair/Rim Light (Electric Blue & Violet edge highlight on the cameraman)
    const rimLight = new THREE.PointLight(0x0066ff, 4.0, 150, 1.6);
    rimLight.position.set(32, 16, -15);
    scene.add(rimLight);

    const violetRimLight = new THREE.PointLight(0x8a2be2, 3.5, 140, 1.8);
    violetRimLight.position.set(10, -18, -10);
    scene.add(violetRimLight);

    // Warm Gold Accent Light (JM signature warm tone on camera details)
    const goldAccentLight = new THREE.PointLight(0xd4af37, 2.0, 100, 2.0);
    goldAccentLight.position.set(18, 5, 25);
    scene.add(goldAccentLight);

    // High-Power Studio Strobe Flash Light (Triggers on photo capture)
    const strobeLight = new THREE.PointLight(0xffffff, 0, 300, 1.2);
    strobeLight.position.set(5, 15, 25);
    scene.add(strobeLight);

    // =========================================================================
    // 2. MATERIALS (REALISTIC MATTE FABRICS, ANODIZED METALS & OPTICAL GLASS)
    // =========================================================================
    // Professional crew attire: dark charcoal tactical production jacket
    const jacketMaterial = new THREE.MeshStandardMaterial({
      color: 0x141822,
      roughness: 0.88,
      metalness: 0.08,
    });

    // Dark utility trousers
    const trousersMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1118,
      roughness: 0.9,
      metalness: 0.05,
    });

    // Natural skin tone with subtle subsurface scattering approximation
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xc89678,
      roughness: 0.65,
      metalness: 0.05,
    });

    // Production beanie / cap
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0c10,
      roughness: 0.95,
      metalness: 0.02,
    });

    // Cinema Camera Body: Matte black anodized aluminum
    const cameraBodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x121418,
      roughness: 0.35,
      metalness: 0.75,
    });

    // Metal hardware, cheeseplate, 15mm rods
    const metalRodMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a404d,
      roughness: 0.25,
      metalness: 0.9,
    });

    // Gold accent screws & ring details
    const goldHardwareMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.3,
      metalness: 0.95,
      emissive: 0x6e5210,
      emissiveIntensity: 0.25,
    });

    // Camera Lens Matte Box (Carbon fiber look)
    const matteBoxMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d0f12,
      roughness: 0.5,
      metalness: 0.4,
    });

    // Optical Cinema Glass (Front element with multi-layer anti-reflective coating)
    const lensGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x001a33,
      emissive: 0x004466,
      emissiveIntensity: 0.4,
      roughness: 0.05,
      metalness: 0.2,
      transmission: 0.85,
      ior: 1.55,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // Electronic Viewfinder Eye-Cup (Soft rubber)
    const rubberMaterial = new THREE.MeshStandardMaterial({
      color: 0x08090b,
      roughness: 0.9,
      metalness: 0.05,
    });

    // Director's Monitor Screen (Live procedural waveform/frame feed)
    const monitorCanvas = document.createElement('canvas');
    monitorCanvas.width = 128;
    monitorCanvas.height = 80;
    const mCtx = monitorCanvas.getContext('2d');
    if (mCtx) {
      mCtx.fillStyle = '#06101e';
      mCtx.fillRect(0, 0, 128, 80);
      // Framing lines
      mCtx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
      mCtx.lineWidth = 1;
      mCtx.strokeRect(10, 8, 108, 64);
      // Center crosshair
      mCtx.beginPath();
      mCtx.moveTo(64, 36);
      mCtx.lineTo(64, 44);
      mCtx.moveTo(60, 40);
      mCtx.lineTo(68, 40);
      mCtx.stroke();
      // Waveform bars
      mCtx.fillStyle = '#00f0ff';
      for (let i = 0; i < 18; i++) {
        const barH = 5 + Math.sin(i * 0.8) * 12 + Math.random() * 8;
        mCtx.fillRect(15 + i * 5.5, 66 - barH, 3.5, barH);
      }
      // Red REC icon
      mCtx.fillStyle = '#ff2222';
      mCtx.beginPath();
      mCtx.arc(18, 16, 3, 0, Math.PI * 2);
      mCtx.fill();
    }
    const monitorTexture = new THREE.CanvasTexture(monitorCanvas);

    const monitorMaterial = new THREE.MeshBasicMaterial({
      map: monitorTexture,
      transparent: true,
      opacity: 0.95,
    });

    // Red Recording Tally LED
    const tallyMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0022,
    });

    // =========================================================================
    // 3. 3D CAMERAMAN & CINEMA CAMERA MODELING (NATURAL HUMAN ANATOMY)
    // =========================================================================
    const masterStudioGroup = new THREE.Group();
    scene.add(masterStudioGroup);

    // Root Cameraman Character Group (Positioned on the right flank to never block text)
    const cameramanRoot = new THREE.Group();
    // Default desktop positioning: Right-hand side, angled 28 degrees inwards
    cameramanRoot.position.set(18, -12, 10);
    cameramanRoot.rotation.y = -Math.PI * 0.16;
    masterStudioGroup.add(cameramanRoot);

    // Scale group responsive to screen width
    const updateCameramanScale = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      if (isMobile) {
        cameramanRoot.position.set(8, -10, 0);
        cameramanRoot.scale.set(0.72, 0.72, 0.72);
      } else if (isTablet) {
        cameramanRoot.position.set(14, -11, 5);
        cameramanRoot.scale.set(0.85, 0.85, 0.85);
      } else {
        cameramanRoot.position.set(18, -12, 10);
        cameramanRoot.scale.set(1.0, 1.0, 1.0);
      }
    };
    updateCameramanScale();

    // -------------------------------------------------------------------------
    // A. LOWER BODY & STABLE OPERATOR STANCE
    // -------------------------------------------------------------------------
    const lowerBody = new THREE.Group();
    cameramanRoot.add(lowerBody);

    // Pelvis / Hips
    const pelvis = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.2, 3.2), trousersMaterial);
    pelvis.position.set(0, 14.5, 0);
    lowerBody.add(pelvis);

    // Left Leg (Athletic forward-braced stance)
    const leftUpperLeg = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.15, 8.5, 12), trousersMaterial);
    leftUpperLeg.position.set(-2.0, 9.5, 0.8);
    leftUpperLeg.rotation.x = 0.08;
    leftUpperLeg.rotation.z = 0.06;
    lowerBody.add(leftUpperLeg);

    const leftLowerLeg = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.95, 8.5, 12), trousersMaterial);
    leftLowerLeg.position.set(-2.1, 1.8, 1.2);
    leftLowerLeg.rotation.x = -0.06;
    lowerBody.add(leftLowerLeg);

    const leftBoot = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.5, 3.6), rubberMaterial);
    leftBoot.position.set(-2.1, -2.6, 2.0);
    lowerBody.add(leftBoot);

    // Right Leg (Solid rear-support stance)
    const rightUpperLeg = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.15, 8.5, 12), trousersMaterial);
    rightUpperLeg.position.set(2.0, 9.5, -0.6);
    rightUpperLeg.rotation.x = -0.12;
    rightUpperLeg.rotation.z = -0.05;
    lowerBody.add(rightUpperLeg);

    const rightLowerLeg = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.95, 8.5, 12), trousersMaterial);
    rightLowerLeg.position.set(2.0, 1.8, -1.6);
    rightLowerLeg.rotation.x = 0.14;
    lowerBody.add(rightLowerLeg);

    const rightBoot = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.5, 3.6), rubberMaterial);
    rightBoot.position.set(2.0, -2.6, -1.2);
    rightBoot.rotation.y = 0.15;
    lowerBody.add(rightBoot);

    // -------------------------------------------------------------------------
    // B. TORSO & BREATHING CHEST HIERARCHY
    // -------------------------------------------------------------------------
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, 15.5, 0);
    cameramanRoot.add(torsoGroup);

    // Abdomen / Waist
    const waist = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.1, 3.5, 16), jacketMaterial);
    waist.position.set(0, 1.8, 0);
    torsoGroup.add(waist);

    // Chest & Ribcage (Upper torso expands subtly with breathing)
    const chestGroup = new THREE.Group();
    chestGroup.position.set(0, 3.5, 0);
    torsoGroup.add(chestGroup);

    const chest = new THREE.Mesh(new THREE.CylinderGeometry(2.7, 2.3, 6.0, 16), jacketMaterial);
    chest.position.set(0, 2.8, 0);
    chest.scale.set(1.2, 1.0, 0.85); // Natural human chest proportions
    chestGroup.add(chest);

    // Tactical utility chest pockets
    const leftPocket = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.6, 0.4), jacketMaterial);
    leftPocket.position.set(-1.4, 3.2, 1.4);
    chestGroup.add(leftPocket);

    const rightPocket = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.6, 0.4), jacketMaterial);
    rightPocket.position.set(1.4, 3.2, 1.4);
    chestGroup.add(rightPocket);

    // Shoulders
    const leftShoulder = new THREE.Mesh(new THREE.SphereGeometry(1.4, 12, 12), jacketMaterial);
    leftShoulder.position.set(-3.4, 5.2, 0);
    chestGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(new THREE.SphereGeometry(1.4, 12, 12), jacketMaterial);
    rightShoulder.position.set(3.4, 5.2, 0);
    chestGroup.add(rightShoulder);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.15, 2.0, 14), skinMaterial);
    neck.position.set(0, 6.4, 0.2);
    chestGroup.add(neck);

    // Jacket stand-up collar
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.5, 1.2, 14, 1, true), jacketMaterial);
    collar.position.set(0, 6.1, 0.2);
    chestGroup.add(collar);

    // -------------------------------------------------------------------------
    // C. HEAD & VIEWING POSTURE
    // -------------------------------------------------------------------------
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 7.6, 0.4);
    // Tilted forward slightly as looking directly into the camera EVF
    headGroup.rotation.x = 0.08;
    headGroup.rotation.y = -0.15;
    chestGroup.add(headGroup);

    // Cranium
    const head = new THREE.Mesh(new THREE.SphereGeometry(1.8, 16, 16), skinMaterial);
    head.scale.set(0.92, 1.1, 1.0);
    headGroup.add(head);

    // Jawline & Chin
    const jaw = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.2, 1.5), skinMaterial);
    jaw.position.set(0, -0.6, 0.8);
    headGroup.add(jaw);

    // Nose
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.8, 8), skinMaterial);
    nose.position.set(0, 0, 1.9);
    nose.rotation.x = Math.PI / 2;
    headGroup.add(nose);

    // Production Director's Cap / Low-profile beanie
    const cap = new THREE.Mesh(new THREE.SphereGeometry(1.9, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55), capMaterial);
    cap.position.set(0, 0.3, 0);
    headGroup.add(cap);

    // Cap Visor / Brim angled over the camera eyepiece
    const visor = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 0.15, 16, 1, false, 0, Math.PI * 0.8), capMaterial);
    visor.position.set(0, 0.5, 1.4);
    visor.rotation.x = 0.25;
    visor.rotation.y = Math.PI * 0.1;
    headGroup.add(visor);

    // -------------------------------------------------------------------------
    // D. PROFESSIONAL CINEMA CAMERA RIG (ARRI / RED DIGITAL PRODUCTION)
    // -------------------------------------------------------------------------
    const cameraRig = new THREE.Group();
    // Positioned right in front of the cameraman's eye and chest
    cameraRig.position.set(-1.0, 5.8, 4.8);
    chestGroup.add(cameraRig);

    // Camera Main Body (Matte black modular cinema chassis)
    const cameraChassis = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.2, 5.0), cameraBodyMaterial);
    cameraRig.add(cameraChassis);

    // Side Cheeseplates with mounting thread recesses
    const leftCheese = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.8, 4.4), metalRodMaterial);
    leftCheese.position.set(-1.85, 0, 0);
    cameraRig.add(leftCheese);

    const rightCheese = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.8, 4.4), metalRodMaterial);
    rightCheese.position.set(1.85, 0, 0);
    cameraRig.add(rightCheese);

    // Top NATO Carry Handle
    const topHandleBar = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 4.0), metalRodMaterial);
    topHandleBar.position.set(0, 2.6, -0.2);
    cameraRig.add(topHandleBar);

    const handlePostFront = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 1.0, 8), metalRodMaterial);
    handlePostFront.position.set(0, 2.1, 1.2);
    cameraRig.add(handlePostFront);

    const handlePostRear = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 1.0, 8), metalRodMaterial);
    handlePostRear.position.set(0, 2.1, -1.6);
    cameraRig.add(handlePostRear);

    // 15mm Baseplate Support Rods extending forward
    const leftRod = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 9.0, 10), metalRodMaterial);
    leftRod.position.set(-1.1, -1.8, 2.2);
    leftRod.rotation.x = Math.PI / 2;
    cameraRig.add(leftRod);

    const rightRod = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 9.0, 10), metalRodMaterial);
    rightRod.position.set(1.1, -1.8, 2.2);
    rightRod.rotation.x = Math.PI / 2;
    cameraRig.add(rightRod);

    // Rear V-Mount Production Battery
    const vMountBattery = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.0, 1.8), rubberMaterial);
    vMountBattery.position.set(0, 0.2, -3.3);
    cameraRig.add(vMountBattery);

    // Cinema Prime Lens Barrel
    const lensGroup = new THREE.Group();
    lensGroup.position.set(0, 0, 2.5);
    cameraRig.add(lensGroup);

    const lensBase = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.7, 2.0, 24), cameraBodyMaterial);
    lensBase.rotation.x = Math.PI / 2;
    lensBase.position.set(0, 0, 1.0);
    lensGroup.add(lensBase);

    // Gear rings for follow focus
    const focusGearRing = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.08, 8, 32), metalRodMaterial);
    focusGearRing.position.set(0, 0, 1.6);
    lensGroup.add(focusGearRing);

    const goldLensRing = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.06, 8, 32), goldHardwareMaterial);
    goldLensRing.position.set(0, 0, 2.2);
    lensGroup.add(goldLensRing);

    // Cinema Front Barrel
    const lensFront = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.6, 1.8, 24), cameraBodyMaterial);
    lensFront.rotation.x = Math.PI / 2;
    lensFront.position.set(0, 0, 2.8);
    lensGroup.add(lensFront);

    // Curved Optical Glass Element with Anti-Reflective Coating
    const lensGlass = new THREE.Mesh(new THREE.SphereGeometry(1.65, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.4), lensGlassMaterial);
    lensGlass.position.set(0, 0, 3.5);
    lensGroup.add(lensGlass);

    // Matte Box (Rectangular Sunshade with Top French Flag)
    const matteBox = new THREE.Mesh(new THREE.BoxGeometry(4.6, 3.8, 1.4), matteBoxMaterial);
    matteBox.position.set(0, 0, 4.3);
    lensGroup.add(matteBox);

    const frenchFlag = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.1, 2.2), matteBoxMaterial);
    frenchFlag.position.set(0, 2.0, 5.0);
    frenchFlag.rotation.x = -0.25;
    lensGroup.add(frenchFlag);

    // Follow-Focus Marking Wheel on Left Side
    const followFocusWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.4, 20), new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      roughness: 0.2,
      metalness: 0.1,
    }));
    followFocusWheel.position.set(-2.0, -0.6, 1.8);
    followFocusWheel.rotation.z = Math.PI / 2;
    cameraRig.add(followFocusWheel);

    // Electronic Viewfinder (EVF Tube + Soft Rubber Eyepiece)
    const evfTube = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 2.4, 14), cameraBodyMaterial);
    evfTube.position.set(1.4, 1.5, -0.6);
    evfTube.rotation.x = Math.PI / 2;
    cameraRig.add(evfTube);

    const evfEyecup = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.55, 0.8, 16), rubberMaterial);
    evfEyecup.position.set(1.4, 1.5, -2.0);
    evfEyecup.rotation.x = Math.PI / 2;
    cameraRig.add(evfEyecup);

    // Tiny OLED Viewfinder glow reflecting toward cameraman's eye
    const evfGlow = new THREE.PointLight(0x00f0ff, 0.4, 3, 2);
    evfGlow.position.set(1.4, 1.5, -2.3);
    cameraRig.add(evfGlow);

    // Top Director's 7" Monitor (Tilted back showing live waveform)
    const monitorMount = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.8, 8), metalRodMaterial);
    monitorMount.position.set(-0.8, 2.0, 1.0);
    cameraRig.add(monitorMount);

    const monitorHousing = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.0, 0.4), cameraBodyMaterial);
    monitorHousing.position.set(-0.8, 3.2, 0.8);
    monitorHousing.rotation.x = -0.35;
    cameraRig.add(monitorHousing);

    const monitorScreen = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 1.7), monitorMaterial);
    monitorScreen.position.set(-0.8, 3.2, 1.02);
    monitorScreen.rotation.x = -0.35;
    cameraRig.add(monitorScreen);

    // Red Recording Tally Indicator LED
    const tallyLED = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), tallyMaterial);
    tallyLED.position.set(0, 1.5, 3.3);
    cameraRig.add(tallyLED);

    // -------------------------------------------------------------------------
    // E. ARMS & HANDS (PROFESSIONAL RIG GRIP & MANUAL FOCUS PULL)
    // -------------------------------------------------------------------------
    // Right Hand & Arm: Gripping right handle with thumb near record trigger
    const rightUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.0, 5.0, 12), jacketMaterial);
    rightUpperArm.position.set(3.8, 3.5, 1.0);
    rightUpperArm.rotation.x = 0.5;
    rightUpperArm.rotation.z = -0.3;
    chestGroup.add(rightUpperArm);

    const rightForearm = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 0.85, 4.8, 12), jacketMaterial);
    rightForearm.position.set(2.6, 2.6, 3.6);
    rightForearm.rotation.x = 1.35;
    rightForearm.rotation.z = 0.35;
    chestGroup.add(rightForearm);

    const rightHand = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 1.4), skinMaterial);
    rightHand.position.set(1.4, 2.3, 4.8);
    chestGroup.add(rightHand);

    // Right Camera Grip Rosette Handle
    const rightGrip = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 2.2, 12), rubberMaterial);
    rightGrip.position.set(1.8, -0.8, 1.5);
    cameraRig.add(rightGrip);

    // Left Hand & Arm: Supporting from underneath, fingers touching follow focus wheel
    const leftUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.0, 5.0, 12), jacketMaterial);
    leftUpperArm.position.set(-3.6, 3.4, 1.2);
    leftUpperArm.rotation.x = 0.6;
    leftUpperArm.rotation.z = 0.4;
    chestGroup.add(leftUpperArm);

    const leftForearm = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 0.85, 5.0, 12), jacketMaterial);
    leftForearm.position.set(-2.4, 2.4, 4.0);
    leftForearm.rotation.x = 1.2;
    leftForearm.rotation.z = -0.3;
    chestGroup.add(leftForearm);

    const leftHand = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 1.4), skinMaterial);
    leftHand.position.set(-1.8, 2.8, 5.4);
    chestGroup.add(leftHand);

    // =========================================================================
    // 4. STUDIO EQUIPMENT & LIGHT STANDS IN BACKGROUND DEPTH
    // =========================================================================
    // Studio C-Stand 1 with Large Octabox (Right background, casting rim light)
    const cStand1 = new THREE.Group();
    cStand1.position.set(28, -10, -18);
    masterStudioGroup.add(cStand1);

    const standPole1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 35, 10), metalRodMaterial);
    standPole1.position.set(0, 17.5, 0);
    cStand1.add(standPole1);

    // Large Octagonal Studio Softbox
    const softbox = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 2.0, 4.0, 8), matteBoxMaterial);
    softbox.position.set(-4, 26, 6);
    softbox.rotation.x = Math.PI / 2 + 0.3;
    softbox.rotation.y = -0.4;
    cStand1.add(softbox);

    const softboxDiffuser = new THREE.Mesh(new THREE.CircleGeometry(5.4, 8), new THREE.MeshBasicMaterial({
      color: 0x99ddff,
      transparent: true,
      opacity: 0.6,
    }));
    softboxDiffuser.position.set(-4, 26, 8.1);
    softboxDiffuser.rotation.x = Math.PI / 2 + 0.3;
    softboxDiffuser.rotation.y = -0.4;
    cStand1.add(softboxDiffuser);

    // Studio C-Stand 2 (Left background hair light with barn doors)
    const cStand2 = new THREE.Group();
    cStand2.position.set(-32, -8, -25);
    masterStudioGroup.add(cStand2);

    const standPole2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 32, 10), metalRodMaterial);
    standPole2.position.set(0, 16, 0);
    cStand2.add(standPole2);

    const fresnelLight = new THREE.Mesh(new THREE.BoxGeometry(3.0, 3.0, 3.5), cameraBodyMaterial);
    fresnelLight.position.set(2, 25, 4);
    fresnelLight.rotation.x = 0.4;
    fresnelLight.rotation.y = 0.5;
    cStand2.add(fresnelLight);

    // =========================================================================
    // 5. ATMOSPHERIC PARTICLES & VOLUMETRIC STUDIO DUST
    // =========================================================================
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    const particlePalette = [
      new THREE.Color(0xd0e8ff), // Soft daylight white
      new THREE.Color(0x00f0ff), // Cyan
      new THREE.Color(0x8a2be2), // Violet
      new THREE.Color(0xd4af37), // Champagne Gold
    ];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 85;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 5;

      const col = particlePalette[i % particlePalette.length];
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;

      particleSpeeds[i] = 0.02 + Math.random() * 0.04;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 2.2,
      map: createGlowTexture(),
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.65,
    });

    const dustMotes = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(dustMotes);

    // =========================================================================
    // 6. CINEMATIC ANAMORPHIC LENS FLARE PLANE (TRIGGERS WITH FLASH)
    // =========================================================================
    const flareCanvas = document.createElement('canvas');
    flareCanvas.width = 512;
    flareCanvas.height = 128;
    const fCtx = flareCanvas.getContext('2d');
    if (fCtx) {
      const fGrad = fCtx.createRadialGradient(256, 64, 0, 256, 64, 256);
      fGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      fGrad.addColorStop(0.15, 'rgba(0, 240, 255, 0.8)');
      fGrad.addColorStop(0.5, 'rgba(138, 43, 226, 0.4)');
      fGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      fCtx.fillStyle = fGrad;
      fCtx.fillRect(0, 0, 512, 128);

      // Horizontal streak
      fCtx.fillStyle = 'rgba(0, 240, 255, 0.7)';
      fCtx.fillRect(0, 62, 512, 4);
    }
    const flareTexture = new THREE.CanvasTexture(flareCanvas);

    const flarePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(36, 9),
      new THREE.MeshBasicMaterial({
        map: flareTexture,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    flarePlane.position.set(16, 5, 20);
    scene.add(flarePlane);

    // =========================================================================
    // 7. MOUSE, SCROLL & RESIZE LISTENERS
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const onResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      updateCameramanScale();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    let isTabVisible = true;
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // =========================================================================
    // 8. NATURAL ANIMATION LOOP & PERIODIC PHOTO CAPTURE FLASH
    // =========================================================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    // Photo Capture Timing (Flashes every 7.5 seconds)
    const FLASH_INTERVAL = 7.5;
    let lastFlashTime = 0;
    let isFlashing = false;
    let flashProgress = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse and scroll interpolation
      const lerpSpeed = prefersReducedMotion ? 0.01 : 0.045;
      mouseX += (targetMouseX - mouseX) * lerpSpeed;
      mouseY += (targetMouseY - mouseY) * lerpSpeed;
      scrollY += (targetScrollY - scrollY) * 0.05;

      // -----------------------------------------------------------------------
      // Natural Human Motion (Breathing & Weight Shift)
      // -----------------------------------------------------------------------
      if (!prefersReducedMotion) {
        // Natural human breathing rhythm (0.28 Hz ~ 17 breaths per minute)
        const breathFactor = Math.sin(elapsedTime * 1.8);
        chestGroup.scale.set(1.0 + breathFactor * 0.018, 1.0 + breathFactor * 0.015, 1.0 + breathFactor * 0.02);
        chestGroup.position.y = 3.5 + breathFactor * 0.12;

        // Subtle micro-sway of cameraman body stabilizing the rig
        torsoGroup.rotation.z = Math.sin(elapsedTime * 0.9) * 0.012;
        torsoGroup.rotation.x = Math.sin(elapsedTime * 1.1) * 0.008;

        // Cameraman subtly tracks subject with mouse cursor
        cameramanRoot.rotation.y = -Math.PI * 0.16 + mouseX * 0.08;
        headGroup.rotation.y = -0.15 + mouseX * 0.06;
        headGroup.rotation.x = 0.08 - mouseY * 0.04;

        // Camera rig tracks smoothly
        cameraRig.rotation.y = mouseX * 0.07;
        cameraRig.rotation.x = -mouseY * 0.05;

        // Subtle focus-pulling adjustment on left hand
        followFocusWheel.rotation.x += Math.sin(elapsedTime * 1.5) * 0.003;
        leftHand.position.z = 5.4 + Math.sin(elapsedTime * 1.5) * 0.04;

        // Camera parallax & scroll-based tracking
        camera.position.x = mouseX * 5.0;
        camera.position.y = 2.0 - mouseY * 3.5 - (scrollY * 0.02);
        camera.lookAt(cameramanRoot.position.x * 0.35, -scrollY * 0.02, 0);
      }

      // -----------------------------------------------------------------------
      // Photo Capture Strobe Action
      // -----------------------------------------------------------------------
      const timeSinceFlash = elapsedTime - lastFlashTime;
      if (timeSinceFlash > FLASH_INTERVAL && !isFlashing) {
        isFlashing = true;
        flashProgress = 0;
        lastFlashTime = elapsedTime;
      }

      if (isFlashing) {
        flashProgress += 0.04;

        if (flashProgress < 0.2) {
          // Instant high-key flash burst (shutter snap)
          const peakIntensity = 12.0;
          strobeLight.intensity = peakIntensity * (flashProgress / 0.2);
          flarePlane.material.opacity = 0.85;
          tallyMaterial.color.setHex(0xffffff); // White shutter blink
        } else if (flashProgress < 1.0) {
          // Exponential cinematic falloff back to ambient mood lighting
          const decay = 1.0 - (flashProgress - 0.2) / 0.8;
          strobeLight.intensity = 12.0 * Math.pow(decay, 2.5);
          flarePlane.material.opacity = 0.85 * Math.pow(decay, 2.0);
          tallyMaterial.color.setHex(0xff0022); // Reset to red REC tally
        } else {
          isFlashing = false;
          strobeLight.intensity = 0;
          flarePlane.material.opacity = 0;
          tallyMaterial.color.setHex(0xff0022);
        }
      }

      // Orbiting subtle rim and mood lights
      const orbitTime = elapsedTime * 0.4;
      rimLight.position.x = 28 + Math.sin(orbitTime * 0.6) * 6;
      rimLight.position.y = 16 + Math.cos(orbitTime * 0.8) * 4;

      violetRimLight.position.x = 10 + Math.cos(orbitTime * 0.5) * 5;
      violetRimLight.position.y = -18 + Math.sin(orbitTime * 0.7) * 4;

      // -----------------------------------------------------------------------
      // Update Atmospheric Studio Dust Motes
      // -----------------------------------------------------------------------
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        if (!prefersReducedMotion) {
          positions[i * 3 + 1] += particleSpeeds[i];
          positions[i * 3] += Math.sin(elapsedTime * 0.8 + i) * 0.015;

          // Wrap at top of studio space
          if (positions[i * 3 + 1] > 32) {
            positions[i * 3 + 1] = -32;
            positions[i * 3] = (Math.random() - 0.5) * 85;
          }
        }
      }
      posAttr.needsUpdate = true;

      // Render Scene
      renderer?.render(scene, camera);
    };

    animate();

    // =========================================================================
    // 9. CLEANUP ON UNMOUNT
    // =========================================================================
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      // Dispose Three.js resources
      particleGeometry.dispose();
      particleMaterial.dispose();
      monitorTexture.dispose();
      flareTexture.dispose();

      masterStudioGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });

      renderer?.dispose();
      if (renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  );
}

// Procedural radial particle glow texture
function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(208, 232, 255, 0.85)');
  gradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.45)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
