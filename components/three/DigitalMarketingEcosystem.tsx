'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DigitalMarketingEcosystem() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080d, 0.0035);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 85);

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
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed:', e);
      return;
    }

    // =========================================================================
    // 1. CINEMATIC LIGHTING SYSTEM
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0x0a1020, 2.0);
    scene.add(ambientLight);

    // Cyan marketing data ingestion light
    const cyanLight = new THREE.PointLight(0x00f0ff, 3.5, 200, 1.8);
    cyanLight.position.set(-35, 20, 25);
    scene.add(cyanLight);

    // Violet creative intelligence light
    const violetLight = new THREE.PointLight(0x8a2be2, 3.2, 190, 1.8);
    violetLight.position.set(35, -20, 20);
    scene.add(violetLight);

    // Deep sapphire enterprise cloud light
    const blueLight = new THREE.PointLight(0x0055ff, 2.8, 220, 2.0);
    blueLight.position.set(0, 35, -20);
    scene.add(blueLight);

    // Subtle JM gold signature accent light
    const goldLight = new THREE.PointLight(0xd4af37, 2.2, 180, 2.0);
    goldLight.position.set(0, -35, 10);
    scene.add(goldLight);

    // =========================================================================
    // 2. SOFT RADIAL GLOW PARTICLE TEXTURE
    // =========================================================================
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(0, 240, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createGlowTexture();

    // =========================================================================
    // 3. CONTINUOUSLY MOVING DIGITAL NETWORK MESH (NODES & DATA TRAILS)
    // =========================================================================
    const nodeCount = 95;
    const maxDistance = 24;
    const nodes: {
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      originalY: number;
    }[] = [];

    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    const palette = [
      new THREE.Color(0x00f0ff), // Cyan
      new THREE.Color(0x8a2be2), // Electric Violet
      new THREE.Color(0x3b82f6), // Royal Blue
      new THREE.Color(0xd4af37), // Metallic Gold
      new THREE.Color(0x00e5ff), // Bright Cyan
    ];

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 110;
      const y = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 70 - 10;

      nodes.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.045,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.035
        ),
        originalY: y,
      });

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      const color = palette[Math.floor(Math.random() * palette.length)];
      nodeColors[i * 3] = color.r;
      nodeColors[i * 3 + 1] = color.g;
      nodeColors[i * 3 + 2] = color.b;
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 2.2,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodeMesh = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodeMesh);

    // Dynamic Connections between Nodes
    const maxLines = (nodeCount * (nodeCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    lineGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // =========================================================================
    // 4. SUBTLE ROTATING 3D GEOMETRIC ELEMENTS (DIGITAL MARKETING ARTIFACTS)
    // =========================================================================
    const geometricGroup = new THREE.Group();
    scene.add(geometricGroup);

    // Material presets with dark luxury cyber aesthetics
    const cyanWireMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00a3cc,
      emissiveIntensity: 0.35,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      metalness: 0.9,
      roughness: 0.1,
    });

    const violetWireMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a2be2,
      emissive: 0x5b1a9c,
      emissiveIntensity: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      metalness: 0.85,
      roughness: 0.15,
    });

    const goldWireMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      emissive: 0x91721b,
      emissiveIntensity: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      metalness: 0.9,
      roughness: 0.1,
    });

    const glassyBlueMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0b132b,
      emissive: 0x002244,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.5,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
      ior: 1.45,
    });

    const objects: {
      mesh: THREE.Object3D;
      rotSpeed: THREE.Vector3;
      orbitSpeed: number;
      orbitRadius: number;
      initialAngle: number;
      baseY: number;
      floatSpeed: number;
    }[] = [];

    // Artifact 1: Core Strategy Icosahedron (Top Right)
    const icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(7.5, 1), cyanWireMaterial);
    const icosaInner = new THREE.Mesh(new THREE.IcosahedronGeometry(4.2, 0), glassyBlueMaterial);
    const icosaGroup = new THREE.Group();
    icosaGroup.add(icosahedron);
    icosaGroup.add(icosaInner);
    icosaGroup.position.set(40, 22, -15);
    geometricGroup.add(icosaGroup);
    objects.push({
      mesh: icosaGroup,
      rotSpeed: new THREE.Vector3(0.004, 0.007, 0.003),
      orbitSpeed: 0.0003,
      orbitRadius: 40,
      initialAngle: 0.4,
      baseY: 22,
      floatSpeed: 0.0015,
    });

    // Artifact 2: Conversion Funnel Concentric Toruses (Left Mid)
    const torusGroup = new THREE.Group();
    const outerTorus = new THREE.Mesh(new THREE.TorusGeometry(8.5, 0.45, 16, 50), violetWireMaterial);
    const innerTorus = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.35, 16, 40), cyanWireMaterial);
    innerTorus.rotation.x = Math.PI / 3;
    torusGroup.add(outerTorus);
    torusGroup.add(innerTorus);
    torusGroup.position.set(-42, -5, -20);
    geometricGroup.add(torusGroup);
    objects.push({
      mesh: torusGroup,
      rotSpeed: new THREE.Vector3(0.005, 0.003, 0.006),
      orbitSpeed: 0.00025,
      orbitRadius: 42,
      initialAngle: Math.PI,
      baseY: -5,
      floatSpeed: 0.0018,
    });

    // Artifact 3: Growth Catalyst Octahedron (Bottom Right)
    const octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(6.5, 0), goldWireMaterial);
    octahedron.position.set(38, -26, -10);
    geometricGroup.add(octahedron);
    objects.push({
      mesh: octahedron,
      rotSpeed: new THREE.Vector3(0.006, 0.005, 0.002),
      orbitSpeed: 0.0002,
      orbitRadius: 38,
      initialAngle: 1.8,
      baseY: -26,
      floatSpeed: 0.002,
    });

    // Artifact 4: Digital Sphere Lattice (Deep Background Center)
    const deepSphere = new THREE.Mesh(new THREE.IcosahedronGeometry(9, 2), violetWireMaterial);
    deepSphere.position.set(-15, 30, -45);
    geometricGroup.add(deepSphere);
    objects.push({
      mesh: deepSphere,
      rotSpeed: new THREE.Vector3(0.002, 0.003, 0.002),
      orbitSpeed: 0.00015,
      orbitRadius: 35,
      initialAngle: 2.5,
      baseY: 30,
      floatSpeed: 0.0012,
    });

    // Artifact 5: Cyber Ring Marker (Bottom Left)
    const ringMesh = new THREE.Mesh(new THREE.RingGeometry(6, 6.4, 48), cyanWireMaterial);
    ringMesh.rotation.x = Math.PI / 2.5;
    ringMesh.position.set(-32, -32, -15);
    geometricGroup.add(ringMesh);
    objects.push({
      mesh: ringMesh,
      rotSpeed: new THREE.Vector3(0.003, 0.004, 0.005),
      orbitSpeed: 0.0002,
      orbitRadius: 32,
      initialAngle: 4.2,
      baseY: -32,
      floatSpeed: 0.0016,
    });

    // =========================================================================
    // 5. AMBIENT STREAM PARTICLES (GLOBAL 24/7 MARKETING DATA PACKETS)
    // =========================================================================
    const streamParticleCount = 420;
    const streamPositions = new Float32Array(streamParticleCount * 3);
    const streamColors = new Float32Array(streamParticleCount * 3);
    const streamSpeeds = new Float32Array(streamParticleCount);

    for (let i = 0; i < streamParticleCount; i++) {
      streamPositions[i * 3] = (Math.random() - 0.5) * 140;
      streamPositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      streamPositions[i * 3 + 2] = (Math.random() - 0.5) * 90 - 15;

      const color = palette[i % palette.length];
      streamColors[i * 3] = color.r;
      streamColors[i * 3 + 1] = color.g;
      streamColors[i * 3 + 2] = color.b;

      streamSpeeds[i] = 0.04 + Math.random() * 0.06;
    }

    const streamGeometry = new THREE.BufferGeometry();
    streamGeometry.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));
    streamGeometry.setAttribute('color', new THREE.BufferAttribute(streamColors, 3));

    const streamMaterial = new THREE.PointsMaterial({
      size: 1.5,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.6,
    });

    const streamMesh = new THREE.Points(streamGeometry, streamMaterial);
    scene.add(streamMesh);

    // =========================================================================
    // 6. MOUSE & SCROLL PARALLAX LISTENER
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
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Visibility change handler to throttle when tab is inactive
    let isTabVisible = true;
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // =========================================================================
    // 7. ANIMATION LOOP (60 FPS CONTINUOUS RUNNER)
    // =========================================================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth mouse and scroll interpolation
      const lerpSpeed = prefersReducedMotion ? 0.01 : 0.045;
      mouseX += (targetMouseX - mouseX) * lerpSpeed;
      mouseY += (targetMouseY - mouseY) * lerpSpeed;
      scrollY += (targetScrollY - scrollY) * 0.06;

      // Parallax Camera Update
      if (!prefersReducedMotion) {
        camera.position.x = mouseX * 8;
        camera.position.y = -mouseY * 6 - (scrollY * 0.018);
        camera.lookAt(0, -scrollY * 0.018, 0);
      }

      // Orbiting cinematic lights
      const time = elapsedTime * 0.45;
      cyanLight.position.x = Math.sin(time * 0.7) * 45;
      cyanLight.position.y = Math.cos(time * 0.5) * 35;
      cyanLight.position.z = Math.sin(time * 0.3) * 30 + 10;

      violetLight.position.x = Math.cos(time * 0.6) * 45;
      violetLight.position.y = Math.sin(time * 0.8) * 35;
      violetLight.position.z = Math.cos(time * 0.4) * 30 + 10;

      blueLight.position.y = Math.sin(time * 0.5) * 40;
      goldLight.position.x = Math.cos(time * 0.4) * 30;

      // Update Network Nodes positions
      const posAttr = nodeGeometry.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.position.add(node.velocity);

          // Boundary bouncing to keep in volume
          if (Math.abs(node.position.x) > 55) node.velocity.x *= -1;
          if (Math.abs(node.position.y) > 40) node.velocity.y *= -1;
          if (node.position.z > 25 || node.position.z < -45) node.velocity.z *= -1;
        }

        positions[i * 3] = node.position.x;
        positions[i * 3 + 1] = node.position.y;
        positions[i * 3 + 2] = node.position.z;
      }
      posAttr.needsUpdate = true;

      // Calculate Network Connections
      let vertexIndex = 0;
      let colorIndex = 0;
      let connectionsCount = 0;

      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const lineColAttr = lineGeometry.attributes.color as THREE.BufferAttribute;
      const lPositions = linePosAttr.array as Float32Array;
      const lColors = lineColAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].position.x - nodes[j].position.x;
          const dy = nodes[i].position.y - nodes[j].position.y;
          const dz = nodes[i].position.z - nodes[j].position.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            const alpha = 1.0 - dist / maxDistance;

            lPositions[vertexIndex++] = nodes[i].position.x;
            lPositions[vertexIndex++] = nodes[i].position.y;
            lPositions[vertexIndex++] = nodes[i].position.z;

            lPositions[vertexIndex++] = nodes[j].position.x;
            lPositions[vertexIndex++] = nodes[j].position.y;
            lPositions[vertexIndex++] = nodes[j].position.z;

            // Gradient color from node i to node j
            const c1 = palette[i % palette.length];
            const c2 = palette[j % palette.length];

            lColors[colorIndex++] = c1.r * alpha * 0.7;
            lColors[colorIndex++] = c1.g * alpha * 0.7;
            lColors[colorIndex++] = c1.b * alpha * 0.7;

            lColors[colorIndex++] = c2.r * alpha * 0.7;
            lColors[colorIndex++] = c2.g * alpha * 0.7;
            lColors[colorIndex++] = c2.b * alpha * 0.7;

            connectionsCount++;
            if (connectionsCount >= maxLines - 1) break;
          }
        }
        if (connectionsCount >= maxLines - 1) break;
      }

      lineGeometry.setDrawRange(0, connectionsCount * 2);
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      // Update Floating Geometric Objects
      objects.forEach((obj, idx) => {
        if (!prefersReducedMotion) {
          obj.mesh.rotation.x += obj.rotSpeed.x;
          obj.mesh.rotation.y += obj.rotSpeed.y;
          obj.mesh.rotation.z += obj.rotSpeed.z;

          // Subtle harmonic floating wave
          obj.mesh.position.y =
            obj.baseY + Math.sin(elapsedTime * 1.5 + idx * 1.2) * 2.5;
        }
      });

      // Update Streaming Data Particles
      const streamPosAttr = streamGeometry.attributes.position as THREE.BufferAttribute;
      const sPositions = streamPosAttr.array as Float32Array;

      for (let i = 0; i < streamParticleCount; i++) {
        if (!prefersReducedMotion) {
          sPositions[i * 3 + 1] += streamSpeeds[i];
          sPositions[i * 3] += Math.sin(elapsedTime * 0.8 + i) * 0.02;

          // Wrap at top
          if (sPositions[i * 3 + 1] > 60) {
            sPositions[i * 3 + 1] = -60;
            sPositions[i * 3] = (Math.random() - 0.5) * 140;
          }
        }
      }
      streamPosAttr.needsUpdate = true;

      // Render scene
      renderer?.render(scene, camera);
    };

    animate();

    // =========================================================================
    // 8. CLEANUP ON UNMOUNT
    // =========================================================================
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      // Dispose Three.js resources
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      streamGeometry.dispose();
      streamMaterial.dispose();
      particleTexture.dispose();

      objects.forEach((obj) => {
        if (obj.mesh instanceof THREE.Mesh) {
          obj.mesh.geometry?.dispose();
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
        willChange: 'transform',
      }}
    />
  );
}
