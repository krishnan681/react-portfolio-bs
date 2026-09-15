/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import cardGLB from "../../assets/lanyard/card.glb";
import lanyard from "../../assets/lanyard/lanyard.png";
import "./Lanyard.css";

extend({ MeshLineGeometry, MeshLineMaterial });

// ============================================================================
// 📏 ADJUST CARD & STRAP SETTINGS HERE:
// ============================================================================
// 1. CARD_SCALE: Adjust this number to make the 3D card bigger or smaller (e.g. 2.85, 3.0, 3.5)
const CARD_SCALE = 5;

// 2. STRAP_LENGTH: Length of the black strap (e.g. 0.8 to 1.5)
//    - Increase (e.g. 1.25, 1.4) -> Makes the black strap LONGER (comes down further)
//    - Decrease (e.g. 0.8, 1.0)  -> Makes the black strap SHORTER
const STRAP_LENGTH = 0.25;

// 3. STRAP_TOP_Y: Anchor height where the strap enters the top of the screen (default: 4.2)
//    ⚠️ NOTE: Keep this around 4.0 - 4.3 so the strap starts right at the top border of the canvas!
const STRAP_TOP_Y = 3.1;

// 4. CAMERA SETTINGS: Default camera position and FOV
const DEFAULT_CAMERA_POSITION = [0, 0, 18];
const DEFAULT_FOV = 25;
// ============================================================================

// UV coordinates on the card model texture atlas
// Front face = left half of atlas (0 to 0.5), Back face = right half of atlas (0.5 to 1.0)
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

// Proxy helper to bypass browser canvas CORS restrictions during development
function resolveCanvasImageUrl(url) {
  if (!url || typeof url !== "string") return url;
  if (import.meta.env.DEV && url.includes("r2.dev")) {
    try {
      const parsed = new URL(url);
      return `/r2-proxy${parsed.pathname}`;
    } catch {
      return url;
    }
  }
  return url;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1.2,
  strapLength = STRAP_LENGTH,
  strapTopY = STRAP_TOP_Y,
  cardScale = CARD_SCALE,
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();

  // High damping for stable, jitter-free physics
  const segmentProps = {
    type: "dynamic",
    canSleep: false,
    colliders: false,
    angularDamping: 6,
    linearDamping: 6,
  };

  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardImage || lanyard);

  // Safe image loading for front and back images without WebGL crashes
  const [loadedFront, setLoadedFront] = useState(null);
  const [loadedBack, setLoadedBack] = useState(null);

  useEffect(() => {
    if (!frontImage) {
      setLoadedFront(null);
      return;
    }
    let isCancelled = false;
    const resolvedSrc = resolveCanvasImageUrl(frontImage);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!isCancelled) setLoadedFront(img);
    };
    img.onerror = () => {
      console.warn("Could not load front image:", frontImage);
      if (!isCancelled) setLoadedFront(null);
    };
    img.src = resolvedSrc;
    return () => {
      isCancelled = true;
    };
  }, [frontImage]);

  useEffect(() => {
    if (!backImage) {
      setLoadedBack(null);
      return;
    }
    let isCancelled = false;
    const resolvedSrc = resolveCanvasImageUrl(backImage);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!isCancelled) setLoadedBack(img);
    };
    img.onerror = () => {
      console.warn("Could not load back image:", backImage);
      if (!isCancelled) setLoadedBack(null);
    };
    img.src = resolvedSrc;
    return () => {
      isCancelled = true;
    };
  }, [backImage]);

  // Composite images directly into the card texture atlas
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    const baseImg = baseMap?.image;
    const W = baseImg?.width || 2048;
    const H = baseImg?.height || 2048;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return baseMap;

    // Draw base card texture for edges/clips/clamp
    if (baseImg) {
      try {
        ctx.drawImage(baseImg, 0, 0, W, H);
      } catch {
        // fallback
      }
    }

    // 1. WIPE FRONT FACE (Removes all default reactbits artwork from front)
    const fx = FRONT_UV_RECT.x * W;
    const fy = FRONT_UV_RECT.y * H;
    const fw = FRONT_UV_RECT.w * W;
    const fh = FRONT_UV_RECT.h * H;
    ctx.save();
    ctx.beginPath();
    ctx.rect(fx, fy, fw, fh);
    ctx.clip();
    ctx.fillStyle = "#04193a";
    ctx.fillRect(fx, fy, fw, fh);
    ctx.restore();

    // 2. WIPE BACK FACE (Removes all default reactbits name & artwork from back)
    const bx = BACK_UV_RECT.x * W;
    const by = BACK_UV_RECT.y * H;
    const bw = BACK_UV_RECT.w * W;
    const bh = BACK_UV_RECT.h * H;
    ctx.save();
    ctx.beginPath();
    ctx.rect(bx, by, bw, bh);
    ctx.clip();
    ctx.fillStyle = "#04193a";
    ctx.fillRect(bx, by, bw, bh);
    ctx.restore();

    const drawFitted = (img, rect) => {
      if (!img || !img.width || !img.height) return;
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === "contain" ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      try {
        ctx.drawImage(img, dx, dy, dw, dh);
      } catch (err) {
        console.warn("Error drawing card image:", err);
      }
      ctx.restore();
    };

    if (loadedFront) drawFitted(loadedFront, FRONT_UV_RECT);
    if (loadedBack) drawFitted(loadedBack, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap?.flipY || false;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [loadedFront, loadedBack, imageFit, materials.base?.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // Dynamic clamp and collider dimensions calculated proportionally to cardScale geometry
  const { clampLocalY, colliderHalfW, colliderHalfH } = useMemo(() => {
    let topY = 1.08;
    let halfW = 0.4 * (cardScale / 2.25);
    let halfH = 1.125 * (cardScale / 2.25);

    if (nodes.clamp?.geometry) {
      nodes.clamp.geometry.computeBoundingBox();
      const b = nodes.clamp.geometry.boundingBox;
      // Exact slot/opening in clamp ring where the strap loops through
      topY = (b.max.y + b.min.y) / 2;
    }
    if (nodes.card?.geometry) {
      nodes.card.geometry.computeBoundingBox();
      const b = nodes.card.geometry.boundingBox;
      halfW = ((b.max.x - b.min.x) / 2) * cardScale;
      halfH = ((b.max.y - b.min.y) / 2) * cardScale;
    }
    return {
      clampLocalY: topY * cardScale,
      colliderHalfW: halfW,
      colliderHalfH: halfH,
    };
  }, [nodes.clamp, nodes.card, cardScale]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], strapLength]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], strapLength]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], strapLength]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, clampLocalY, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current && card.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation(),
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);

      // Extend top strap point upward past top of canvas
      const fixedPos = fixed.current.translation();
      curve.points[3].set(fixedPos.x, fixedPos.y + 4.0, fixedPos.z);
      if (band.current?.geometry) {
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());

      // Smooth velocity stabilization — stops jumping and jitter
      card.current.setAngvel({
        x: ang.x * 0.9,
        y: ang.y * 0.9 - rot.y * 0.15,
        z: ang.z * 0.9,
      });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      {/* Strap starts at top (strapTopY) and hangs down with pre-settled initial positions */}
      <group position={[0, strapTopY, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0, -strapLength, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody
          position={[0, -strapLength * 2, 0]}
          ref={j2}
          {...segmentProps}
        >
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody
          position={[0, -strapLength * 3, 0]}
          ref={j3}
          {...segmentProps}
        >
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody
          position={[0, -strapLength * 3 - clampLocalY, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          {/* Card Physical Collider automatically scaled with card */}
          <CuboidCollider args={[colliderHalfW, colliderHalfH, 0.015]} />

          {/* Card 3D Mesh Group — Suspended seamlessly with zero gap */}
          <group
            scale={cardScale}
            position={[0, 0, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (
              e.target.releasePointerCapture(e.pointerId),
              drag(false)
            )}
            onPointerDown={(e) => (
              e.target.setPointerCapture(e.pointerId),
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation())),
              )
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(cardGLB);

export default function Lanyard({
  position = DEFAULT_CAMERA_POSITION,
  gravity = [0, -40, 0],
  fov = DEFAULT_FOV,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1.2,
  strapLength = STRAP_LENGTH,
  strapTopY = STRAP_TOP_Y,
  cardScale = CARD_SCALE,
}) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics
            key={`${cardScale}-${strapLength}-${strapTopY}`}
            gravity={gravity}
            timeStep={isMobile ? 1 / 30 : 1 / 60}
          >
            <Band
              key={`${cardScale}-${strapLength}-${strapTopY}`}
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
              strapLength={strapLength}
              strapTopY={strapTopY}
              cardScale={cardScale}
            />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
