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

    // Scene & Atmospheric Cyber Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070d, 0.0028);

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 70);

    // WebGL Renderer with High Performance & Alpha
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0); // Transparent background

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
    // 1. CINEMATIC 3D VOLUMETRIC LIGHTING (CYAN, VIOLET, SAPPHIRE & GOLD)
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0x0d1424, 2.4);
    scene.add(ambientLight);

    // Cyan marketing data ingestion light
    const cyanLight = new THREE.PointLight(0x00f0ff, 5.0, 260, 1.8);
    cyanLight.position.set(-28, 20, 32);
    scene.add(cyanLight);

    // Violet creative intelligence light
    const violetLight = new THREE.PointLight(0x8a2be2, 4.8, 250, 1.8);
    violetLight.position.set(28, -16, 28);
    scene.add(violetLight);

    // Deep sapphire enterprise cloud light
    const blueLight = new THREE.PointLight(0x0070f3, 4.2, 280, 2.0);
    blueLight.position.set(0, 30, -10);
    scene.add(blueLight);

    // Subtle JM gold signature accent light
    const goldLight = new THREE.PointLight(0xd4af37, 3.2, 220, 2.0);
    goldLight.position.set(18, -30, 20);
    scene.add(goldLight);

    // =========================================================================
    // 2. SOFT RADIAL GLOW PARTICLE SPRITE TEXTURE
    // =========================================================================
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(0, 240, 255, 0.95)');
      gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.6)');
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
    const nodeCount = 115;
    const maxDistance = 23;
    const nodes: {
      position: THREE.Vector3;
      velocity: THREE.Vector3;
    }[] = [];

    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    const palette = [
      new THREE.Color(0x00f0ff), // Vivid Cyan
      new THREE.Color(0x8a2be2), // Electric Violet
      new THREE.Color(0x0070f3), // Sapphire Blue
      new THREE.Color(0xd4af37), // Metallic Gold
      new THREE.Color(0x38bdf8), // Luminous Sky Blue
    ];

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 96;
      const y = (Math.random() - 0.5) * 78;
      const z = (Math.random() - 0.5) * 50 - 5;

      nodes.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.045,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.035
        ),
      });

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      const color = palette[i % palette.length];
      nodeColors[i * 3] = color.r;
      nodeColors[i * 3 + 1] = color.g;
      nodeColors[i * 3 + 2] = color.b;
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 4.2,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodeMesh = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodeMesh);

    // Dynamic Connection Lines
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
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Active Data Packets (Glowing Light Pulses Traveling along Network Links)
    const packetCount = 26;
    const packetPositions = new Float32Array(packetCount * 3);
    const packetColors = new Float32Array(packetCount * 3);

    const packets: {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
    }[] = [];

    for (let i = 0; i < packetCount; i++) {
      packets.push({
        fromIndex: Math.floor(Math.random() * nodeCount),
        toIndex: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        speed: 0.009 + Math.random() * 0.016,
      });

      // Pure glowing white-cyan packets
      packetColors[i * 3] = 1.0;
      packetColors[i * 3 + 1] = 1.0;
      packetColors[i * 3 + 2] = 1.0;
    }

    const packetGeometry = new THREE.BufferGeometry();
    packetGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(packetPositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    packetGeometry.setAttribute('color', new THREE.BufferAttribute(packetColors, 3));

    const packetMaterial = new THREE.PointsMaterial({
      size: 6.2,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const packetMesh = new THREE.Points(packetGeometry, packetMaterial);
    scene.add(packetMesh);

    // =========================================================================
    // 4. SUBTLE ROTATING 3D GEOMETRIC ELEMENTS (DIGITAL MARKETING ARTIFACTS)
    // =========================================================================
    const geometricGroup = new THREE.Group();
    scene.add(geometricGroup);

    // Cyber Materials with dark luxury aesthetics
    const cyanWireMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00d0ff,
      emissiveIntensity: 0.65,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      metalness: 0.9,
      roughness: 0.1,
    });

    const violetWireMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a2be2,
      emissive: 0x7b1fcb,
      emissiveIntensity: 0.55,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      metalness: 0.85,
      roughness: 0.15,
    });

    const goldWireMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      emissive: 0xb58e24,
      emissiveIntensity: 0.55,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      metalness: 0.9,
      roughness: 0.1,
    });

    const glassyBlueMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x07112c,
      emissive: 0x004488,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 0.65,
      roughness: 0.1,
      metalness: 0.3,
      transmission: 0.75,
      ior: 1.45,
    });

    const objects: {
      mesh: THREE.Object3D;
      rotSpeed: THREE.Vector3;
      baseY: number;
    }[] = [];

    // Artifact 1: Core Strategy Icosahedron (Right Flank / Near Hero)
    const icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(7.5, 1), cyanWireMaterial);
    const icosaInner = new THREE.Mesh(new THREE.IcosahedronGeometry(4.2, 0), glassyBlueMaterial);
    const icosaGroup = new THREE.Group();
    icosaGroup.add(icosahedron);
    icosaGroup.add(icosaInner);
    icosaGroup.position.set(24, 12, 6);
    geometricGroup.add(icosaGroup);
    objects.push({
      mesh: icosaGroup,
      rotSpeed: new THREE.Vector3(0.005, 0.008, 0.003),
      baseY: 12,
    });

    // Artifact 2: Conversion Funnel Concentric Toruses (Left Flank)
    const torusGroup = new THREE.Group();
    const outerTorus = new THREE.Mesh(new THREE.TorusGeometry(8.5, 0.45, 16, 50), violetWireMaterial);
    const innerTorus = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.35, 16, 40), cyanWireMaterial);
    innerTorus.rotation.x = Math.PI / 3;
    torusGroup.add(outerTorus);
    torusGroup.add(innerTorus);
    torusGroup.position.set(-25, -2, 4);
    geometricGroup.add(torusGroup);
    objects.push({
      mesh: torusGroup,
      rotSpeed: new THREE.Vector3(0.006, 0.004, 0.007),
      baseY: -2,
    });

    // Artifact 3: Growth Catalyst Octahedron (Right Lower Flank)
    const octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(6.5, 0), goldWireMaterial);
    octahedron.position.set(25, -18, 8);
    geometricGroup.add(octahedron);
    objects.push({
      mesh: octahedron,
      rotSpeed: new THREE.Vector3(0.007, 0.005, 0.003),
      baseY: -18,
    });

    // Artifact 4: Digital Sphere Lattice (Upper Left Depth)
    const deepSphere = new THREE.Mesh(new THREE.IcosahedronGeometry(8.5, 2), violetWireMaterial);
    deepSphere.position.set(-20, 20, -12);
    geometricGroup.add(deepSphere);
    objects.push({
      mesh: deepSphere,
      rotSpeed: new THREE.Vector3(0.003, 0.004, 0.002),
      baseY: 20,
    });

    // Artifact 5: Cyber Ring Marker (Lower Left)
    const ringMesh = new THREE.Mesh(new THREE.RingGeometry(6, 6.4, 48), cyanWireMaterial);
    ringMesh.rotation.x = Math.PI / 2.5;
    ringMesh.position.set(-22, -24, 6);
    geometricGroup.add(ringMesh);
    objects.push({
      mesh: ringMesh,
      rotSpeed: new THREE.Vector3(0.004, 0.005, 0.006),
      baseY: -24,
    });

    // =========================================================================
    // 5. AMBIENT DATA STREAMS (GLOBAL 24/7 MARKETING TELEMETRIES)
    // =========================================================================
    const streamParticleCount = 420;
    const streamPositions = new Float32Array(streamParticleCount * 3);
    const streamColors = new Float32Array(streamParticleCount * 3);
    const streamSpeeds = new Float32Array(streamParticleCount);

    for (let i = 0; i < streamParticleCount; i++) {
      streamPositions[i * 3] = (Math.random() - 0.5) * 115;
      streamPositions[i * 3 + 1] = (Math.random() - 0.5) * 95;
      streamPositions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 8;

      const color = palette[i % palette.length];
      streamColors[i * 3] = color.r;
      streamColors[i * 3 + 1] = color.g;
      streamColors[i * 3 + 2] = color.b;

      streamSpeeds[i] = 0.05 + Math.random() * 0.08;
    }

    const streamGeometry = new THREE.BufferGeometry();
    streamGeometry.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));
    streamGeometry.setAttribute('color', new THREE.BufferAttribute(streamColors, 3));

    const streamMaterial = new THREE.PointsMaterial({
      size: 2.6,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75,
    });

    const streamMesh = new THREE.Points(streamGeometry, streamMaterial);
    scene.add(streamMesh);

    // =========================================================================
    // 6. MOUSE & SCROLL PARALLAX TRACKERS
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

      // Smooth mouse and scroll interpolation
      const lerpSpeed = prefersReducedMotion ? 0.01 : 0.05;
      mouseX += (targetMouseX - mouseX) * lerpSpeed;
      mouseY += (targetMouseY - mouseY) * lerpSpeed;
      scrollY += (targetScrollY - scrollY) * 0.06;

      // Parallax Camera Update
      if (!prefersReducedMotion) {
        camera.position.x = mouseX * 10;
        camera.position.y = -mouseY * 7 - (scrollY * 0.022);
        camera.lookAt(0, -scrollY * 0.022, 0);
      }

      // Orbiting dynamic point lights
      const time = elapsedTime * 0.5;
      cyanLight.position.x = Math.sin(time * 0.7) * 45;
      cyanLight.position.y = Math.cos(time * 0.5) * 35;
      cyanLight.position.z = Math.sin(time * 0.3) * 25 + 15;

      violetLight.position.x = Math.cos(time * 0.6) * 45;
      violetLight.position.y = Math.sin(time * 0.8) * 35;
      violetLight.position.z = Math.cos(time * 0.4) * 25 + 15;

      blueLight.position.y = Math.sin(time * 0.5) * 35;
      goldLight.position.x = Math.cos(time * 0.4) * 30;

      // Update Network Nodes positions
      const posAttr = nodeGeometry.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.position.add(node.velocity);

          // Boundary bouncing to keep within volume
          if (Math.abs(node.position.x) > 48) node.velocity.x *= -1;
          if (Math.abs(node.position.y) > 38) node.velocity.y *= -1;
          if (node.position.z > 20 || node.position.z < -40) node.velocity.z *= -1;
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

            const c1 = palette[i % palette.length];
            const c2 = palette[j % palette.length];

            lColors[colorIndex++] = c1.r * alpha * 1.4;
            lColors[colorIndex++] = c1.g * alpha * 1.4;
            lColors[colorIndex++] = c1.b * alpha * 1.4;

            lColors[colorIndex++] = c2.r * alpha * 1.4;
            lColors[colorIndex++] = c2.g * alpha * 1.4;
            lColors[colorIndex++] = c2.b * alpha * 1.4;

            connectionsCount++;
            if (connectionsCount >= maxLines - 1) break;
          }
        }
        if (connectionsCount >= maxLines - 1) break;
      }

      lineGeometry.setDrawRange(0, connectionsCount * 2);
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      // Animate Active Data Packets (Glowing Light Trails)
      const packetPosAttr = packetGeometry.attributes.position as THREE.BufferAttribute;
      const pPositions = packetPosAttr.array as Float32Array;

      for (let i = 0; i < packetCount; i++) {
        const packet = packets[i];
        packet.progress += packet.speed;

        if (packet.progress >= 1.0) {
          packet.progress = 0;
          packet.fromIndex = packet.toIndex;
          packet.toIndex = Math.floor(Math.random() * nodeCount);
        }

        const from = nodes[packet.fromIndex].position;
        const to = nodes[packet.toIndex].position;

        pPositions[i * 3] = THREE.MathUtils.lerp(from.x, to.x, packet.progress);
        pPositions[i * 3 + 1] = THREE.MathUtils.lerp(from.y, to.y, packet.progress);
        pPositions[i * 3 + 2] = THREE.MathUtils.lerp(from.z, to.z, packet.progress);
      }
      packetPosAttr.needsUpdate = true;

      // Update Floating Geometric Objects
      objects.forEach((obj, idx) => {
        if (!prefersReducedMotion) {
          obj.mesh.rotation.x += obj.rotSpeed.x;
          obj.mesh.rotation.y += obj.rotSpeed.y;
          obj.mesh.rotation.z += obj.rotSpeed.z;

          obj.mesh.position.y =
            obj.baseY + Math.sin(elapsedTime * 1.6 + idx * 1.3) * 2.8;
        }
      });

      // Update Streaming Data Particles
      const streamPosAttr = streamGeometry.attributes.position as THREE.BufferAttribute;
      const sPositions = streamPosAttr.array as Float32Array;

      for (let i = 0; i < streamParticleCount; i++) {
        if (!prefersReducedMotion) {
          sPositions[i * 3 + 1] += streamSpeeds[i];
          sPositions[i * 3] += Math.sin(elapsedTime * 0.9 + i) * 0.025;

          // Wrap around top
          if (sPositions[i * 3 + 1] > 48) {
            sPositions[i * 3 + 1] = -48;
            sPositions[i * 3] = (Math.random() - 0.5) * 115;
          }
        }
      }
      streamPosAttr.needsUpdate = true;

      // Render Scene
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

      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      packetGeometry.dispose();
      packetMaterial.dispose();
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
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  );
}
