import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { THREE_SCENE_MODES, ThreeSceneMode } from '../data/articleData';
import { Layers, Eye, EyeOff, RotateCcw, Compass,Maximize2 } from 'lucide-react';

interface CadThreeVisualizerProps {
  activeMode: ThreeSceneMode['id'];
  onSelectMode: (mode: ThreeSceneMode['id']) => void;
}

// Pre-allocated module-scope scratch objects (Zero GC in render loop)
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3(0, 1.1, 0);
const _dummyObj = new THREE.Object3D();

function createBlueprintCanvasTexture(maxAnisotropy: number, variant: 'grid' | 'monitor' | 'diff'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Deep CAD navy base
  ctx.fillStyle = variant === 'monitor' ? '#071426' : '#060d1a';
  ctx.fillRect(0, 0, 512, 512);

  // Minor grid lines
  ctx.strokeStyle = variant === 'monitor' ? 'rgba(56, 189, 248, 0.16)' : 'rgba(56, 189, 248, 0.11)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 512; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  // Major grid lines
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.32)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i <= 512; i += 128) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  if (variant === 'monitor') {
    // Draw technical room plan + orthographic views on the monitor screen
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.strokeRect(72, 84, 240, 180);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(60, 72, 264, 204);

    // Centerlines
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(192, 45);
    ctx.lineTo(192, 300);
    ctx.moveTo(40, 174);
    ctx.lineTo(350, 174);
    ctx.stroke();
    ctx.setLineDash([]);

    // Dimension callout lines
    ctx.strokeStyle = '#10b981';
    ctx.strokeRect(356, 72, 110, 204);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('DWG: 5000x4000', 72, 340);
    ctx.fillStyle = '#10b981';
    ctx.fillText('WALL: 230MM ISO', 72, 370);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('REV-C VERIFIED', 72, 400);
  } else if (variant === 'diff') {
    // Revision comparison overlay markings
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.strokeRect(96, 96, 320, 320);
    ctx.strokeStyle = '#ef4444';
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(140, 140, 120, 120);
    ctx.setLineDash([]);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = maxAnisotropy;
  return texture;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(128, 128, 16, 128, 128, 120);
  grad.addColorStop(0, 'rgba(2, 6, 14, 0.72)');
  grad.addColorStop(0.55, 'rgba(2, 6, 14, 0.32)');
  grad.addColorStop(1, 'rgba(2, 6, 14, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

export const CadThreeVisualizer: React.FC<CadThreeVisualizerProps> = ({
  activeMode,
  onSelectMode,
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [explodeFactor, setExplodeFactor] = useState<number>(0.35);
  const [cameraPreset, setCameraPreset] = useState<'iso' | 'top' | 'front'>('iso');
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);

  // Refs synced into the Three.js loop without re-initializing WebGLRenderer
  const activeModeRef = useRef<ThreeSceneMode['id']>(activeMode);
  const explodeRef = useRef<number>(explodeFactor);
  const presetRef = useRef<'iso' | 'top' | 'front'>(cameraPreset);
  const userInteractingRef = useRef<boolean>(false);

  useEffect(() => {
    activeModeRef.current = activeMode;
    userInteractingRef.current = false;
  }, [activeMode]);

  useEffect(() => {
    explodeRef.current = explodeFactor;
  }, [explodeFactor]);

  useEffect(() => {
    presetRef.current = cameraPreset;
    userInteractingRef.current = false;
  }, [cameraPreset]);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Software WebGL detection guard (Three.js Skill Section 2.1)
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 960;
    const height = container.clientHeight || 520;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060b16);
    scene.fog = new THREE.FogExp2(0x060b16, 0.032);

    // 2. Studio Environment Reflection via RoomEnvironment + PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 120);
    camera.position.set(6.8, 4.8, 7.6);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.minDistance = 3.2;
    controls.maxDistance = 18;
    controls.target.set(0, 1.1, 0);

    const onControlStart = () => {
      userInteractingRef.current = true;
    };
    controls.addEventListener('start', onControlStart);

    // 3. Balanced 3-Point Studio Lighting Rig (Warm Key + Cool Hemisphere Fill + Rim)
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x091326, 0.85);
    hemiLight.position.set(0, 12, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff2dd, 2.2);
    keyLight.position.set(6, 9, 5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    const d = 7;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.35);
    rimLight.position.set(-7, 5, -6);
    scene.add(rimLight);

    // 4. Shared Textures & PBR Materials (Varied roughness/metalness >= 0.25 across adjacent parts)
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const gridTex = createBlueprintCanvasTexture(maxAniso, 'grid');
    gridTex.repeat.set(4, 4);
    const monitorTex = createBlueprintCanvasTexture(maxAniso, 'monitor');
    const diffTex = createBlueprintCanvasTexture(maxAniso, 'diff');
    const shadowTex = createContactShadowTexture();

    const matDarkSlate = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.78,
      metalness: 0.18,
    });
    const matBrushedAlum = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.26,
      metalness: 0.88,
    });
    const matAnodizedChassis = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.42,
      metalness: 0.65,
    });
    const matElectricBlue = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.45,
      roughness: 0.22,
      metalness: 0.5,
    });
    const matEmeraldApprove = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.4,
      roughness: 0.28,
      metalness: 0.4,
    });
    const matAmberWarn = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.42,
      roughness: 0.3,
      metalness: 0.45,
    });
    const matCrimsonDelete = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xb91c1c,
      emissiveIntensity: 0.45,
      roughness: 0.35,
      metalness: 0.3,
      wireframe: true,
    });
    const matMonitorScreen = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: monitorTex,
      emissive: 0x0c4a6e,
      emissiveIntensity: 0.35,
      roughness: 0.15,
      metalness: 0.1,
    });
    const matHologramPlane = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      map: diffTex,
      transparent: true,
      opacity: 0.62,
      roughness: 0.18,
      metalness: 0.2,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // 5. Ground Blueprint Platform + Contact Shadow + InstancedMesh Coordinate Markers (81 instances)
    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: gridTex,
      roughness: 0.85,
      metalness: 0.1,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const contactShadowGeo = new THREE.CircleGeometry(4.8, 32);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.015;
    scene.add(contactShadow);

    // InstancedMesh for 81 precision coordinate datum pins (> 20 identical items requirement)
    const pinGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.04, 8);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.3,
      metalness: 0.8,
    });
    const datumPins = new THREE.InstancedMesh(pinGeo, pinMat, 81);
    let idx = 0;
    for (let gx = -4; gx <= 4; gx++) {
      for (let gz = -4; gz <= 4; gz++) {
        _dummyObj.position.set(gx * 1.5, 0.02, gz * 1.5);
        _dummyObj.scale.setScalar(gx === 0 && gz === 0 ? 1.6 : 1.0);
        _dummyObj.updateMatrix();
        datumPins.setMatrixAt(idx, _dummyObj.matrix);
        datumPins.setColorAt(
          idx,
          new THREE.Color(gx === 0 || gz === 0 ? 0x38bdf8 : 0x1e3a8a)
        );
        idx++;
      }
    }
    datumPins.instanceMatrix.needsUpdate = true;
    if (datumPins.instanceColor) datumPins.instanceColor.needsUpdate = true;
    datumPins.computeBoundingSphere();
    scene.add(datumPins);

    // =========================================================================
    // GROUP 1: 3D CAD WORKSTATION ILLUSTRATION (10-part composite THREE.Group)
    // =========================================================================
    const workstationGroup = new THREE.Group();
    scene.add(workstationGroup);

    // Part 1: Beveled architectural desk surface (ExtrudeGeometry with bevels)
    const deskShape = new THREE.Shape();
    deskShape.moveTo(-2.6, -1.1);
    deskShape.lineTo(2.6, -1.1);
    deskShape.lineTo(2.6, 1.1);
    deskShape.lineTo(-2.6, 1.1);
    deskShape.closePath();
    const deskGeo = new THREE.ExtrudeGeometry(deskShape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3,
    });
    deskGeo.rotateX(Math.PI / 2);
    const deskTop = new THREE.Mesh(deskGeo, matDarkSlate);
    deskTop.position.set(0, 1.15, 0);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    workstationGroup.add(deskTop);

    // Part 2 & 3: Heavy steel structural legs + crossbar
    const legGeo = new THREE.BoxGeometry(0.14, 1.12, 1.8);
    const leftLeg = new THREE.Mesh(legGeo, matAnodizedChassis);
    leftLeg.position.set(-2.2, 0.56, 0);
    leftLeg.castShadow = true;
    const rightLeg = new THREE.Mesh(legGeo, matAnodizedChassis);
    rightLeg.position.set(2.2, 0.56, 0);
    rightLeg.castShadow = true;
    const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(4.3, 0.1, 0.12), matBrushedAlum);
    crossBeam.position.set(0, 0.45, -0.5);
    workstationGroup.add(leftLeg, rightLeg, crossBeam);

    // Part 4: Dual Articulated Monitor Arms (TubeGeometry)
    const armCurveLeft = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.18, -0.75),
      new THREE.Vector3(-0.45, 1.65, -0.82),
      new THREE.Vector3(-0.85, 2.05, -0.55),
    ]);
    const armCurveRight = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.18, -0.75),
      new THREE.Vector3(0.55, 1.65, -0.82),
      new THREE.Vector3(1.15, 2.0, -0.45),
    ]);
    const armLeftMesh = new THREE.Mesh(
      new THREE.TubeGeometry(armCurveLeft, 20, 0.045, 12, false),
      matBrushedAlum
    );
    const armRightMesh = new THREE.Mesh(
      new THREE.TubeGeometry(armCurveRight, 20, 0.045, 12, false),
      matBrushedAlum
    );
    workstationGroup.add(armLeftMesh, armRightMesh);

    // Part 5: Primary Ultrawide CAD Monitor Chassis + Screen
    const mainMonitorGroup = new THREE.Group();
    mainMonitorGroup.position.set(-0.65, 2.12, -0.48);
    mainMonitorGroup.rotation.y = 0.12;
    const monitorChassis = new THREE.Mesh(
      new THREE.BoxGeometry(2.35, 1.22, 0.08),
      matAnodizedChassis
    );
    monitorChassis.castShadow = true;
    const monitorScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(2.22, 1.1),
      matMonitorScreen
    );
    monitorScreen.position.z = 0.045;
    mainMonitorGroup.add(monitorChassis, monitorScreen);
    workstationGroup.add(mainMonitorGroup);

    // Part 6: Secondary Vertical DWG Layer & Spec Display
    const sideMonitorGroup = new THREE.Group();
    sideMonitorGroup.position.set(1.25, 2.08, -0.32);
    sideMonitorGroup.rotation.y = -0.32;
    const sideChassis = new THREE.Mesh(
      new THREE.BoxGeometry(1.05, 1.45, 0.07),
      matAnodizedChassis
    );
    const sideScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.95, 1.35),
      matMonitorScreen
    );
    sideScreen.position.z = 0.04;
    sideMonitorGroup.add(sideChassis, sideScreen);
    workstationGroup.add(sideMonitorGroup);

    // Part 7: 6-DOF CAD SpaceMouse Controller (LatheGeometry profile)
    const spaceMousePoints = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.18, 0),
      new THREE.Vector2(0.16, 0.05),
      new THREE.Vector2(0.11, 0.06),
      new THREE.Vector2(0.12, 0.14),
      new THREE.Vector2(0, 0.15),
    ];
    const spaceMouseMesh = new THREE.Mesh(
      new THREE.LatheGeometry(spaceMousePoints, 24),
      matBrushedAlum
    );
    spaceMouseMesh.position.set(-1.35, 1.15, 0.35);
    const spaceMouseRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.13, 0.012, 12, 24),
      matElectricBlue
    );
    spaceMouseRing.rotation.x = Math.PI / 2;
    spaceMouseRing.position.set(-1.35, 1.21, 0.35);
    workstationGroup.add(spaceMouseMesh, spaceMouseRing);

    // Part 8: Mechanical CAD Keyboard & Precision Mouse
    const keyboardMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.04, 0.38),
      matAnodizedChassis
    );
    keyboardMesh.position.set(-0.35, 1.17, 0.38);
    const cadMouseMesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.07, 0.1, 8, 16),
      matBrushedAlum
    );
    cadMouseMesh.rotation.x = Math.PI / 2;
    cadMouseMesh.position.set(0.55, 1.17, 0.38);
    workstationGroup.add(keyboardMesh, cadMouseMesh);

    // Part 9: Articulated Architect Task Lamp
    const lampStemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.1, 1.15, -0.65),
      new THREE.Vector3(-2.25, 2.35, -0.45),
      new THREE.Vector3(-1.65, 2.85, 0.05),
    ]);
    const lampStem = new THREE.Mesh(
      new THREE.TubeGeometry(lampStemCurve, 20, 0.03, 10, false),
      matBrushedAlum
    );
    const lampHead = new THREE.Mesh(
      new THREE.ConeGeometry(0.22, 0.32, 20, 1, true),
      matAnodizedChassis
    );
    lampHead.position.set(-1.62, 2.78, 0.08);
    lampHead.rotation.z = -0.4;
    workstationGroup.add(lampStem, lampHead);

    // Part 10: Floating Holographic DWG Layer Stack on right side of desk
    const holoStackGroup = new THREE.Group();
    holoStackGroup.position.set(1.45, 1.42, 0.42);
    const layerPlanes: THREE.Mesh[] = [];
    for (let l = 0; l < 3; l++) {
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1.15, 0.82),
        matHologramPlane
      );
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = l * 0.22;
      plane.renderOrder = 10 + l;
      holoStackGroup.add(plane);
      layerPlanes.push(plane);
    }
    workstationGroup.add(holoStackGroup);

    // =========================================================================
    // GROUP 2: MANUAL VS AI-ASSISTED CAD WORKFLOW COMPARISON
    // =========================================================================
    const comparisonGroup = new THREE.Group();
    comparisonGroup.visible = false;
    scene.add(comparisonGroup);

    // Left Pedestal: Manual 50-Revision Fragmented Chain
    const manualPedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.65, 1.8, 0.24, 32),
      matDarkSlate
    );
    manualPedestal.position.set(-2.35, 0.12, 0);
    comparisonGroup.add(manualPedestal);

    const manualNodes: THREE.Mesh[] = [];
    const manualPoints: THREE.Vector3[] = [];
    for (let m = 0; m < 12; m++) {
      const angle = m * 0.95;
      const radius = 0.55 + (m % 3) * 0.32;
      const pt = new THREE.Vector3(
        -2.35 + Math.cos(angle) * radius,
        0.45 + m * 0.21,
        Math.sin(angle) * radius
      );
      manualPoints.push(pt);
      const node = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.13, 0),
        m % 3 === 0 ? matCrimsonDelete : matAmberWarn
      );
      node.position.copy(pt);
      comparisonGroup.add(node);
      manualNodes.push(node);
    }
    const tangledCurve = new THREE.CatmullRomCurve3(manualPoints);
    const tangledTube = new THREE.Mesh(
      new THREE.TubeGeometry(tangledCurve, 48, 0.025, 8, false),
      matAmberWarn
    );
    comparisonGroup.add(tangledTube);

    // Right Pedestal: Supervised AI Pipeline + Human Approval Gate
    const aiPedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.65, 1.8, 0.24, 32),
      matDarkSlate
    );
    aiPedestal.position.set(2.35, 0.12, 0);
    comparisonGroup.add(aiPedestal);

    const aiCoreTower = new THREE.Group();
    aiCoreTower.position.set(2.35, 0.24, 0);
    const solverRings: THREE.Mesh[] = [];
    for (let r = 0; r < 4; r++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.95 - r * 0.14, 0.045, 16, 40),
        r === 3 ? matEmeraldApprove : matElectricBlue
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.35 + r * 0.52;
      aiCoreTower.add(ring);
      solverRings.push(ring);
    }
    const verifiedBuildingBlock = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.95, 0.95),
      matEmeraldApprove
    );
    verifiedBuildingBlock.position.y = 2.45;
    aiCoreTower.add(verifiedBuildingBlock);
    comparisonGroup.add(aiCoreTower);

    // Bridge connecting Manual Input to Supervised AI
    const bridgeArc = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.2, 1.2, 0),
      new THREE.Vector3(0, 2.2, 0),
      new THREE.Vector3(1.2, 1.2, 0),
    ]);
    const bridgeMesh = new THREE.Mesh(
      new THREE.TubeGeometry(bridgeArc, 28, 0.04, 12, false),
      matElectricBlue
    );
    comparisonGroup.add(bridgeMesh);

    // =========================================================================
    // GROUP 3: CONCEPTUAL 9-STAGE AI-POWERED CAD ARCHITECTURE DIAGRAM
    // =========================================================================
    const architectureGroup = new THREE.Group();
    architectureGroup.visible = false;
    scene.add(architectureGroup);

    const archStageNodes: THREE.Group[] = [];
    const archCurvePoints: THREE.Vector3[] = [];
    for (let s = 0; s < 9; s++) {
      const t = s / 8;
      const arcAngle = (t - 0.5) * Math.PI * 1.25;
      const x = Math.sin(arcAngle) * 3.8;
      const z = Math.cos(arcAngle) * 2.2 - 0.6;
      const y = 0.65 + Math.sin(t * Math.PI) * 1.35;
      const pos = new THREE.Vector3(x, y, z);
      archCurvePoints.push(pos);

      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(pos);

      const isApprovalStage = s === 6; // Stage 7: Preview & User Approval
      const isValidationStage = s === 4 || s === 8;

      const basePillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.09, y, 12),
        matAnodizedChassis
      );
      basePillar.position.y = -y / 2;
      nodeGroup.add(basePillar);

      const coreNode = new THREE.Mesh(
        isApprovalStage
          ? new THREE.OctahedronGeometry(0.34, 1)
          : new THREE.BoxGeometry(0.46, 0.32, 0.46),
        isApprovalStage
          ? matEmeraldApprove
          : isValidationStage
          ? matAmberWarn
          : matElectricBlue
      );
      nodeGroup.add(coreNode);

      const haloRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.42, 0.02, 12, 28),
        matBrushedAlum
      );
      haloRing.rotation.x = Math.PI / 2;
      nodeGroup.add(haloRing);

      architectureGroup.add(nodeGroup);
      archStageNodes.push(nodeGroup);
    }

    const archPipelineCurve = new THREE.CatmullRomCurve3(archCurvePoints);
    const archConduit = new THREE.Mesh(
      new THREE.TubeGeometry(archPipelineCurve, 64, 0.045, 12, false),
      matBrushedAlum
    );
    architectureGroup.add(archConduit);

    const pulsePacket = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 16, 16),
      matEmeraldApprove
    );
    architectureGroup.add(pulsePacket);

    // =========================================================================
    // GROUP 4: FUTURISTIC AI ASSISTANT INTERACTING WITH A TECHNICAL DRAWING
    // (5000mm x 4000mm Room with 230mm thick walls + AI Optical Scanner Drone)
    // =========================================================================
    const assistantGroup = new THREE.Group();
    assistantGroup.visible = false;
    scene.add(assistantGroup);

    // Scale 1000mm = 1.0 world unit -> 5.0m x 4.0m room with 0.23m walls
    const outerRoomShape = new THREE.Shape();
    outerRoomShape.moveTo(-2.73, -2.23);
    outerRoomShape.lineTo(2.73, -2.23);
    outerRoomShape.lineTo(2.73, 2.23);
    outerRoomShape.lineTo(-2.73, 2.23);
    outerRoomShape.closePath();

    const innerRoomHole = new THREE.Path();
    innerRoomHole.moveTo(-2.5, -2.0);
    innerRoomHole.lineTo(2.5, -2.0);
    innerRoomHole.lineTo(2.5, 2.0);
    innerRoomHole.lineTo(-2.5, 2.0);
    innerRoomHole.closePath();
    outerRoomShape.holes.push(innerRoomHole);

    const wallExtrudeGeo = new THREE.ExtrudeGeometry(outerRoomShape, {
      depth: 0.85,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    });
    wallExtrudeGeo.rotateX(-Math.PI / 2);
    const roomWallsMesh = new THREE.Mesh(wallExtrudeGeo, matBrushedAlum);
    roomWallsMesh.position.y = 0.02;
    roomWallsMesh.castShadow = true;
    roomWallsMesh.receiveShadow = true;
    assistantGroup.add(roomWallsMesh);

    // Dimension Callout Guides around the 5000x4000 room
    const dimBarNorth = new THREE.Mesh(
      new THREE.BoxGeometry(5.0, 0.04, 0.04),
      matElectricBlue
    );
    dimBarNorth.position.set(0, 0.15, -2.65);
    const dimBarEast = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.04, 4.0),
      matEmeraldApprove
    );
    dimBarEast.position.set(3.15, 0.15, 0);
    assistantGroup.add(dimBarNorth, dimBarEast);

    // Composite 7-Part AI Optical Scanner Core hovering over the room
    const aiScannerRig = new THREE.Group();
    aiScannerRig.position.set(0, 2.65, 0);
    const scannerCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.42, 1),
      matElectricBlue
    );
    const gimbalOuter = new THREE.Mesh(
      new THREE.TorusGeometry(0.78, 0.04, 16, 40),
      matBrushedAlum
    );
    const gimbalInner = new THREE.Mesh(
      new THREE.TorusGeometry(0.58, 0.03, 16, 32),
      matEmeraldApprove
    );
    gimbalInner.rotation.y = Math.PI / 2;
    const scanConeGeo = new THREE.ConeGeometry(2.4, 2.4, 32, 1, true);
    const scanConeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const scanCone = new THREE.Mesh(scanConeGeo, scanConeMat);
    scanCone.position.y = -1.25;
    aiScannerRig.add(scannerCore, gimbalOuter, gimbalInner, scanCone);
    assistantGroup.add(aiScannerRig);

    // =========================================================================
    // GROUP 5: DWG DRAWING REVISION COMPARISON ILLUSTRATION (Rev A vs Rev B)
    // =========================================================================
    const revisionGroup = new THREE.Group();
    revisionGroup.visible = false;
    scene.add(revisionGroup);

    // Tier 1: Baseline Rev. A Sheet
    const revABaseLayer = new THREE.Group();
    revABaseLayer.position.y = 0.25;
    const revAPlate = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 0.08, 3.8),
      matDarkSlate
    );
    const revAWall1 = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 0.25, 0.18),
      matBrushedAlum
    );
    revAWall1.position.set(0, 0.16, -1.2);
    revABaseLayer.add(revAPlate, revAWall1);
    revisionGroup.add(revABaseLayer);

    // Tier 2: Semantic Diff Delta Layer (Deleted in Crimson Wireframe, Added in Emerald)
    const revDiffLayer = new THREE.Group();
    revDiffLayer.position.y = 1.25;
    const diffPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 3.8),
      matHologramPlane
    );
    diffPlane.rotation.x = -Math.PI / 2;
    const deletedObject = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 0.45, 20),
      matCrimsonDelete
    );
    deletedObject.position.set(-1.35, 0.25, 0.3);
    const addedStructuralBay = new THREE.Mesh(
      new THREE.BoxGeometry(1.45, 0.42, 1.15),
      matEmeraldApprove
    );
    addedStructuralBay.position.set(1.25, 0.24, -0.25);
    const modifiedDimRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.75, 0.04, 16, 32),
      matAmberWarn
    );
    modifiedDimRing.rotation.x = Math.PI / 2;
    modifiedDimRing.position.set(1.25, 0.48, -0.25);
    revDiffLayer.add(diffPlane, deletedObject, addedStructuralBay, modifiedDimRing);
    revisionGroup.add(revDiffLayer);

    // Tier 3: Approved Rev. B Master Overlay
    const revBTopLayer = new THREE.Group();
    revBTopLayer.position.y = 2.25;
    const revBFrame = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 0.05, 3.8),
      matElectricBlue
    );
    revBFrame.material = matElectricBlue.clone();
    (revBFrame.material as THREE.MeshStandardMaterial).wireframe = true;
    revBTopLayer.add(revBFrame);
    revisionGroup.add(revBTopLayer);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 6. Paced Animation Loop (60fps on GPU; afterDraw fenceSync + 80ms pause on Software WebGL)
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      gl.flush();
      const poll = () => {
        if (!sync) {
          frameId = window.setTimeout(cb, 80);
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      const mode = activeModeRef.current;
      const explode = explodeRef.current;

      // Toggle visibility of the 5 3D visual scenes
      workstationGroup.visible = mode === 'workstation';
      comparisonGroup.visible = mode === 'comparison';
      architectureGroup.visible = mode === 'architecture';
      assistantGroup.visible = mode === 'assistant';
      revisionGroup.visible = mode === 'revision';

      // Smooth exponential damping for exploded layer separation and subtle motion
      if (mode === 'workstation') {
        layerPlanes.forEach((plane, idx) => {
          const targetY = idx * (0.14 + explode * 0.36) + Math.sin(elapsed * 1.5 + idx) * 0.02;
          plane.position.y = THREE.MathUtils.damp(plane.position.y, targetY, 6, delta);
        });
        spaceMouseRing.rotation.z = elapsed * 0.6;
      } else if (mode === 'comparison') {
        manualNodes.forEach((n, idx) => {
          n.rotation.y = elapsed * 0.8 + idx;
          n.position.y =
            0.42 + idx * (0.14 + explode * 0.15) + Math.sin(elapsed * 2 + idx) * 0.03;
        });
        solverRings.forEach((ring, idx) => {
          ring.rotation.z = elapsed * (idx % 2 === 0 ? 0.7 : -0.7);
          ring.position.y = THREE.MathUtils.damp(
            ring.position.y,
            0.35 + idx * (0.38 + explode * 0.35),
            6,
            delta
          );
        });
        verifiedBuildingBlock.rotation.y = elapsed * 0.45;
      } else if (mode === 'architecture') {
        const u = (elapsed * 0.14) % 1;
        archPipelineCurve.getPointAt(u, pulsePacket.position);
        archStageNodes.forEach((nodeGrp, idx) => {
          nodeGrp.children[1].rotation.y = elapsed * 0.5 + idx * 0.4;
        });
      } else if (mode === 'assistant') {
        aiScannerRig.position.x = Math.sin(elapsed * 0.7) * 1.15;
        aiScannerRig.position.z = Math.cos(elapsed * 0.5) * 0.85;
        aiScannerRig.position.y = THREE.MathUtils.damp(
          aiScannerRig.position.y,
          2.1 + explode * 1.4,
          5,
          delta
        );
        gimbalOuter.rotation.z = elapsed * 0.9;
        gimbalInner.rotation.x = elapsed * 1.2;
      } else if (mode === 'revision') {
        revDiffLayer.position.y = THREE.MathUtils.damp(
          revDiffLayer.position.y,
          0.95 + explode * 1.1,
          6,
          delta
        );
        revBTopLayer.position.y = THREE.MathUtils.damp(
          revBTopLayer.position.y,
          1.65 + explode * 2.1,
          6,
          delta
        );
        deletedObject.rotation.y = elapsed * 0.6;
        modifiedDimRing.rotation.z = -elapsed * 0.8;
      }

      // Smoothly damp camera toward preset unless user is actively orbiting
      if (!userInteractingRef.current) {
        const preset = presetRef.current;
        const isPortrait = camera.aspect < 0.85;
        const zoomScale = isPortrait ? 1.36 : 1.0;
        if (preset === 'iso') {
          _targetCamPos.set(6.4 * zoomScale, 4.5 * zoomScale, 6.9 * zoomScale);
          _targetLookAt.set(0, isPortrait ? 0.65 : 0.78, 0);
        } else if (preset === 'top') {
          _targetCamPos.set(0, 10.5 * zoomScale, 0.8);
          _targetLookAt.set(0, 0.5, 0);
        } else {
          _targetCamPos.set(0, 2.4 * zoomScale, 8.8 * zoomScale);
          _targetLookAt.set(0, 1.3, 0);
        }
        const dampAlpha = 1 - Math.exp(-4.5 * delta);
        camera.position.lerp(_targetCamPos, dampAlpha);
        _currentLookAt.lerp(_targetLookAt, dampAlpha);
        controls.target.copy(_currentLookAt);
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 960;
      const newH = container.clientHeight || 520;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      controls.removeEventListener('start', onControlStart);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  const currentSceneMeta =
    THREE_SCENE_MODES.find((m) => m.id === activeMode) || THREE_SCENE_MODES[0];

  return (
    <section
      aria-label="Interactive 3D CAD and AI Architecture Studio"
      className="relative w-full rounded-xl border border-slate-800/90 bg-[#050A14] overflow-hidden shadow-2xl"
    >
      {/* Top Minimal Spec Header (Unobstructed 3D Center) */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 px-4 sm:px-5 py-3 sm:py-3.5 border-b border-slate-800/80 bg-[#070E1C]">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
          <span className="font-mono text-[11px] sm:text-xs font-semibold text-sky-400 tracking-wider uppercase whitespace-nowrap shrink-0">
            3D Spatial Figure {currentSceneMeta.number} / 05
          </span>
          <span className="hidden sm:inline text-slate-600" aria-hidden="true">
            ·
          </span>
          <h3 className="text-xs sm:text-sm font-semibold text-slate-100 truncate">
            {currentSceneMeta.fullTitle}
          </h3>
        </div>
        <div className="hidden md:block text-xs text-slate-400 font-mono whitespace-nowrap shrink-0">
          Drag to orbit · Scroll to zoom · Select figure below
        </div>
      </div>

      {/* Isolated WebGL Canvas Viewport Container */}
      <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[540px]">
        <div
          ref={canvasMountRef}
          data-testid="cad-three-canvas-container"
          data-active-mode={activeMode}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Subtle Top-Left Figure Takeaway Readout (Compact on mobile, spacious on laptop) */}
        <div className="pointer-events-none absolute top-2.5 left-2.5 right-2.5 sm:right-auto sm:top-4 sm:left-4 sm:max-w-md rounded-lg border border-slate-800/90 bg-[#081021]/90 px-3 py-2 sm:px-4 sm:py-3">
          <p className="text-[11px] sm:text-xs leading-relaxed text-slate-300">
            <strong className="text-sky-300 font-medium">Engineering Insight: </strong>
            {currentSceneMeta.keyTakeaway}
          </p>
        </div>

        {/* Collapsible Unified Bottom Control Dock (Zero Side-Panel Clutter, No backdrop-filter over WebGL) */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 w-[96%] max-w-4xl z-10 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setDockCollapsed((prev) => !prev)}
            aria-expanded={!dockCollapsed}
            aria-label={dockCollapsed ? 'Show 3D Controls' : 'Hide 3D Controls'}
            className="mb-1.5 inline-flex items-center gap-1.5 rounded-md border border-slate-700/80 bg-[#0B1528] px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:border-sky-500/60 transition-colors whitespace-nowrap shrink-0"
          >
            {dockCollapsed ? (
              <>
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>▴ Show 3D Controls</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                <span>▾ Hide 3D Controls</span>
              </>
            )}
          </button>

          {!dockCollapsed && (
            <div className="w-full rounded-xl border border-slate-700/90 bg-[#091224]/95 px-3 py-2.5 sm:px-4 sm:py-3 shadow-xl">
              {/* Row 1: 5 Required 3D Visual Scene Switchers (Single-row horizontal swipe on mobile, wrapped on laptop) */}
              <div className="pb-2 mb-2 border-b border-slate-800">
                <div
                  role="tablist"
                  aria-label="3D Illustration Scenes"
                  className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 overflow-x-auto touch-scroll-x"
                >
                  {THREE_SCENE_MODES.map((m) => {
                    const isActive = m.id === activeMode;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onSelectMode(m.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm'
                            : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        {m.number}. {m.shortTitle}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: Layer Separation Slider & Camera View Presets */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4 text-xs">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <label
                    htmlFor="explode-slider"
                    className="inline-flex items-center gap-1.5 text-slate-300 font-medium whitespace-nowrap shrink-0"
                  >
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span>Layer Explode:</span>
                  </label>
                  <input
                    id="explode-slider"
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={explodeFactor}
                    onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
                    className="w-full sm:max-w-[180px] accent-sky-400 cursor-pointer"
                  />
                  <span className="font-mono text-sky-300 tabular-nums w-9 text-right shrink-0">
                    {Math.round(explodeFactor * 100)}%
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-1.5 overflow-x-auto touch-scroll-x">
                  <span className="text-slate-400 mr-1 hidden md:inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    Viewport:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {(['iso', 'top', 'front'] as const).map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setCameraPreset(preset)}
                        className={`px-2.5 py-1 rounded text-xs font-mono uppercase transition-colors whitespace-nowrap shrink-0 ${
                          cameraPreset === preset
                            ? 'bg-slate-800 text-sky-300 border border-sky-500/50'
                            : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
                        }`}
                      >
                        {preset === 'iso' ? 'Isometric' : preset === 'top' ? 'Top Plan' : 'Elevation'}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCameraPreset('iso');
                      setExplodeFactor(0.35);
                    }}
                    aria-label="Reset 3D View"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs text-slate-300 hover:text-white bg-slate-900/80 border border-slate-700/70 transition-colors whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editorial Figure Caption Footer */}
      <div className="px-4 sm:px-5 py-3 bg-[#070E1C] border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-xs text-slate-400 italic font-serif">
          {currentSceneMeta.caption}
        </p>
        <span className="text-xs font-mono text-slate-500 whitespace-nowrap shrink-0">
          Units: Millimeters (ISO 128)
        </span>
      </div>
    </section>
  );
};
