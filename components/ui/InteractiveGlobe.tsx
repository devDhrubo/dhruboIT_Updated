"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createSculptedCloud(): THREE.Group {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.48,
    metalness: 0.04,
  });

  const puffs: [number, number, number, number][] = [
    [0, 0, 0, 0.095],
    [0.08, -0.015, 0.015, 0.075],
    [-0.08, -0.015, -0.01, 0.072],
    [0.035, 0.045, -0.015, 0.068],
    [-0.035, 0.038, 0.025, 0.064],
  ];

  for (const [x, y, z, r] of puffs) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 16), mat);
    mesh.position.set(x, y, z);
    group.add(mesh);
  }
  return group;
}

function createSleekAirliner(accentHex: number): THREE.Group {
  const plane = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.25,
    metalness: 0.18,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: accentHex,
    roughness: 0.3,
    metalness: 0.2,
    emissive: accentHex,
    emissiveIntensity: 0.18,
  });

  // Tapered fuselage (pointing along +Z)
  const fuselage = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.036, 0.22, 10, 16),
    bodyMat
  );
  fuselage.rotation.x = Math.PI / 2;
  plane.add(fuselage);

  // Nose cone accent
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.034, 0.075, 14), accentMat);
  nose.rotation.x = Math.PI / 2;
  nose.position.set(0, 0, 0.14);
  plane.add(nose);

  // Swept main wings
  const leftWing = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.012, 0.07), bodyMat);
  leftWing.position.set(-0.095, 0, 0.01);
  leftWing.rotation.y = 0.28;
  plane.add(leftWing);

  const rightWing = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.012, 0.07), bodyMat);
  rightWing.position.set(0.095, 0, 0.01);
  rightWing.rotation.y = -0.28;
  plane.add(rightWing);

  // Horizontal tail stabilizers
  const tailWing = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.01, 0.04), bodyMat);
  tailWing.position.set(0, 0.008, -0.115);
  plane.add(tailWing);

  // Vertical tail fin with brand accent
  const verticalFin = new THREE.Mesh(
    new THREE.BoxGeometry(0.012, 0.068, 0.055),
    accentMat
  );
  verticalFin.position.set(0, 0.04, -0.115);
  plane.add(verticalFin);

  return plane;
}

const orbitingTechBadges = [
  { id: "next", label: "Next.js", angle: 0 },
  { id: "react", label: "React", angle: 60 },
  { id: "node", label: "Node.js", angle: 120 },
  { id: "ai", label: "OpenAI", angle: 180 },
  { id: "aws", label: "AWS", angle: 240 },
  { id: "shopify", label: "Shopify", angle: 300 },
];

function OrbitTechLogo({ id }: { id: string }) {
  switch (id) {
    case "next":
      return (
        <svg viewBox="0 0 180 180" className="h-6 w-6" aria-hidden="true">
          <circle cx="90" cy="90" r="90" fill="#0B0B0F" />
          <path d="M149 157L69 54H54V126H66V69L140 165C143 163 146 160 149 157Z" fill="#FFFFFF" />
          <rect x="115" y="54" width="12" height="72" fill="#FFFFFF" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true">
          <g fill="none" stroke="#00A8E8" strokeWidth="3.2">
            <ellipse cx="32" cy="32" rx="22" ry="9" />
            <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(60 32 32)" />
            <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(120 32 32)" />
          </g>
          <circle cx="32" cy="32" r="4.5" fill="#00A8E8" />
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true">
          <path d="M32 4L56.5 18.2V46.6L32 60.8L7.5 46.6V18.2L32 4Z" fill="#539E43" />
          <text x="32" y="37" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="800" fontFamily="system-ui, sans-serif">
            JS
          </text>
        </svg>
      );
    case "ai":
      return (
        <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true">
          <rect width="64" height="64" rx="16" fill="#0B0B0F" />
          <g fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
            <path d="M32 14a9 9 0 0 1 8.6 6.3 9 9 0 0 1 5.9 12.2 9 9 0 0 1-3.1 13.3 9 9 0 0 1-11.4 3.9A9 9 0 0 1 20 44a9 9 0 0 1-2.5-12.5 9 9 0 0 1 5.9-12.2A9 9 0 0 1 32 14Z" />
            <circle cx="32" cy="32" r="6" />
          </g>
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true">
          <rect width="64" height="64" rx="16" fill="#232F3E" />
          <text x="32" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="17" fontWeight="800" fontFamily="system-ui, sans-serif">
            aws
          </text>
          <path d="M16 43C24 48 39 48 48 42" fill="none" stroke="#FF9900" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "shopify":
    default:
      return (
        <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true">
          <path d="M44.5 21.5C44.4 21 44 20.7 43.5 20.7H39.6L36.5 17.6C36.2 17.3 35.6 17.4 35.4 17.5L33.8 18C33.2 16.2 31.8 14.6 29.7 14.6C28.5 14 27.8 13.7 27.1 13.7C23.5 13.7 21.8 18.2 21.2 20.5L17.4 21.7C16.2 22.1 16.2 22.1 16 23.3L13 46.5L38.3 51L51 48.2L44.5 21.5Z" fill="#95BF47" />
          <text x="29" y="40" textAnchor="middle" fill="#FFFFFF" fontSize="19" fontWeight="800" fontFamily="system-ui, sans-serif">
            S
          </text>
        </svg>
      );
  }
}

export function InteractiveGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // Scene & Centered Camera (full globe framed with generous margins on all 4 sides)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.24;
    container.appendChild(renderer.domElement);

    // Bright Daylight Studio Lighting
    scene.add(new THREE.AmbientLight(0xeef9ff, 1.65));

    const hemiLight = new THREE.HemisphereLight(0xd8f3ff, 0x38bdf8, 0.95);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 2.3);
    keyLight.position.set(4.5, 3.8, 5.2);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    rimLight.position.set(-4.5, -1.5, -3.5);
    scene.add(rimLight);

    // Root Globe Group
    const globeGroup = new THREE.Group();
    globeGroup.rotation.z = 0.12;
    globeGroup.rotation.y = -1.75;
    scene.add(globeGroup);

    // Load local 2K Earth textures
    const loader = new THREE.TextureLoader();
    const dayTex = loader.load("/images/textures/earth-day.jpg");
    dayTex.colorSpace = THREE.SRGBColorSpace;
    const normalTex = loader.load("/images/textures/earth-normal.jpg");
    const specTex = loader.load("/images/textures/earth-specular.jpg");
    const cloudTex = loader.load("/images/textures/earth-clouds.png");

    // 1. Main Full 3D Earth Sphere
    const EARTH_RADIUS = 1.44;
    const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 96, 96);
    const earthMat = new THREE.MeshPhongMaterial({
      map: dayTex,
      normalMap: normalTex,
      normalScale: new THREE.Vector2(1.4, 1.4),
      specularMap: specTex,
      specular: new THREE.Color(0x67e8f9),
      shininess: 35,
      emissive: new THREE.Color(0x0c5b75),
      emissiveIntensity: 0.28,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // 2. Soft Atmospheric Cloud Layer
    const cloudGeo = new THREE.SphereGeometry(EARTH_RADIUS + 0.022, 64, 64);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTex,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      roughness: 0.85,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    globeGroup.add(cloudMesh);

    // 3. Soft Cyan Atmospheric Rim Glow
    const atmosGeo = new THREE.SphereGeometry(EARTH_RADIUS + 0.12, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.60 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(0.22, 0.74, 0.97, 0.6) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(atmosGeo, atmosMat));

    // 4. Sculpted White 3D Clouds
    const cloudCoords: [number, number, number][] = [
      [34, -30, 0.95],
      [-18, 22, 0.9],
      [46, 68, 0.85],
      [12, 125, 0.88],
      [-28, -75, 0.85],
    ];
    const floatingClouds: {
      obj: THREE.Group;
      baseR: number;
      lat: number;
      lng: number;
      phase: number;
    }[] = [];

    cloudCoords.forEach(([lat, lng, scale], idx) => {
      const cloud = createSculptedCloud();
      cloud.scale.setScalar(scale);
      const r = EARTH_RADIUS + 0.14;
      cloud.position.copy(latLngToVector3(lat, lng, r));
      cloud.lookAt(0, 0, 0);
      globeGroup.add(cloud);
      floatingClouds.push({ obj: cloud, baseR: r, lat, lng, phase: idx * 1.2 });
    });

    // 5. Global Delivery Hub Pins & Network Arcs
    const hubs: [number, number][] = [
      [40.7, -74.0], // US East
      [51.5, -0.1],  // EU / London
      [23.8, 90.4],  // Dhaka HQ
      [1.35, 103.8], // APAC / Singapore
      [37.7, -122.4], // US West
    ];

    const pinGeo = new THREE.SphereGeometry(0.038, 16, 16);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xf0523d,
      emissive: 0xf0523d,
      emissiveIntensity: 0.45,
      roughness: 0.25,
    });

    hubs.forEach(([lat, lng]) => {
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(latLngToVector3(lat, lng, EARTH_RADIUS + 0.02));
      globeGroup.add(pin);
    });

    const arcPairs: [number, number][] = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ];

    arcPairs.forEach(([a, b]) => {
      const start = latLngToVector3(hubs[a][0], hubs[a][1], EARTH_RADIUS + 0.02);
      const end = latLngToVector3(hubs[b][0], hubs[b][1], EARTH_RADIUS + 0.02);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(EARTH_RADIUS + 0.34);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const tubeGeo = new THREE.TubeGeometry(curve, 36, 0.008, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.78,
      });
      globeGroup.add(new THREE.Mesh(tubeGeo, tubeMat));
    });

    // 6. Beautiful Animated 3D Airliners with Glowing Orbital Flight Rings
    const orbiters: { pivot: THREE.Group; speed: number }[] = [];
    const planeTracks = [
      { tiltX: 0.38, tiltZ: 0.26, speed: 0.85, radius: EARTH_RADIUS + 0.26, color: 0xf0523d },
      { tiltX: -0.52, tiltZ: -0.34, speed: -0.72, radius: EARTH_RADIUS + 0.31, color: 0x8b5cf6 },
      { tiltX: 0.14, tiltZ: -0.68, speed: 0.78, radius: EARTH_RADIUS + 0.24, color: 0x0ea5e9 },
    ];

    planeTracks.forEach((cfg, idx) => {
      const trackGroup = new THREE.Group();
      trackGroup.rotation.set(cfg.tiltX, idx * 2.1, cfg.tiltZ);

      // Thin orbital flight trail ring
      const ringGeo = new THREE.TorusGeometry(cfg.radius, 0.0055, 8, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.35,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      trackGroup.add(ringMesh);

      // Rotating pivot carrying the sleek 3D airliner tangential to the orbit
      const pivot = new THREE.Group();
      const plane = createSleekAirliner(cfg.color);
      plane.position.set(cfg.radius, 0, 0);
      // Point plane nose tangent to orbital direction & slight bank inward
      plane.rotation.y = cfg.speed > 0 ? Math.PI : 0;
      plane.rotation.z = cfg.speed > 0 ? 0.25 : -0.25;
      pivot.add(plane);

      trackGroup.add(pivot);
      scene.add(trackGroup);
      orbiters.push({ pivot, speed: cfg.speed });
    });

    // Pointer Drag Interaction with smooth inertia
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let velY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      velX = dx * 0.0055;
      velY = dy * 0.004;
      globeGroup.rotation.y += velX;
      globeGroup.rotation.x = Math.max(
        -0.7,
        Math.min(0.7, globeGroup.rotation.x + velY)
      );
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    container.style.cursor = "grab";
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // Animation Loop
    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        if (!reducedMotion) {
          globeGroup.rotation.y += 0.0032 + velX;
          globeGroup.rotation.x = Math.max(
            -0.7,
            Math.min(0.7, globeGroup.rotation.x + velY)
          );
        }
        velX *= 0.94;
        velY *= 0.94;
      }

      if (!reducedMotion) {
        cloudMesh.rotation.y += 0.0007;

        floatingClouds.forEach((c) => {
          const r = c.baseR + Math.sin(elapsed * 1.4 + c.phase) * 0.02;
          c.obj.position.copy(latLngToVector3(c.lat, c.lng, r));
        });

        orbiters.forEach((o) => {
          o.pivot.rotation.y += o.speed * 0.012;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      dayTex.dispose();
      normalTex.dispose();
      specTex.dispose();
      cloudTex.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative flex h-[380px] w-full max-w-[520px] items-center justify-center sm:h-[480px] lg:h-[520px]">
      {/* Soft cyan/violet studio halo behind the full globe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[66%] w-[66%] rounded-full bg-gradient-to-tr from-[#38BDF8]/20 via-[#8B5CF6]/10 to-[#10B981]/15 blur-3xl"
      />

      {/* Rounding Tech Stack Logo Orbit Ring around the Globe */}
      <motion.div
        aria-hidden="true"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute z-20 h-[330px] w-[330px] rounded-full border border-dashed border-[#8B5CF6]/20 sm:h-[430px] sm:w-[430px] lg:h-[465px] lg:w-[465px]"
      >
        {orbitingTechBadges.map((badge) => {
          const rad = (badge.angle * Math.PI) / 180;
          const xPct = 50 + Math.cos(rad) * 50;
          const yPct = 50 + Math.sin(rad) * 50;

          return (
            <div
              key={badge.id}
              style={{ left: `${xPct}%`, top: `${yPct}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              {/* Counter-rotate so every tech logo stays upright while orbiting */}
              <motion.div
                animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E5E7EB]/90 bg-white/95 shadow-[0_12px_28px_-8px_rgba(11,11,15,0.16)] backdrop-blur-sm sm:h-12 sm:w-12"
                title={badge.label}
              >
                <OrbitTechLogo id={badge.id} />
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Full WebGL 3D Globe Canvas */}
      <div
        ref={mountRef}
        aria-label="Interactive 3D rotating Earth globe"
        className="relative z-10 h-full w-full touch-none select-none"
      />
    </div>
  );
}
