import React, { useRef, useMemo, Suspense, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles, Float, Text, Cloud } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ---- Sky Dome ---- */
const AnimatedSky = memo(function AnimatedSky() {
  const ref = useRef();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uC1: { value: new THREE.Color('#FFECD2') },
    uC2: { value: new THREE.Color('#FCB69F') },
    uC3: { value: new THREE.Color('#C3CFE2') },
  }), []);
  useFrame((_, d) => { uniforms.uTime.value += d * 0.04; });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[120, 32, 32]} />
      <shaderMaterial side={THREE.BackSide} uniforms={uniforms}
        vertexShader={`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
        fragmentShader={`uniform float uTime;uniform vec3 uC1,uC2,uC3;varying vec2 vUv;
          void main(){float t=vUv.y+sin(uTime)*0.03;vec3 c=mix(uC1,uC2,smoothstep(0.,0.45,t));c=mix(c,uC3,smoothstep(0.4,1.,t));gl_FragColor=vec4(c,1.);}`}
      />
    </mesh>
  );
});

/* ---- Ground ---- */
const Ground = memo(function Ground() {
  return (
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-2,0]} receiveShadow>
      <planeGeometry args={[200,200]} />
      <meshStandardMaterial color="#7EC850" roughness={0.9} />
    </mesh>
  );
});

/* ---- Path ---- */
const Pathway = memo(function Pathway() {
  return (
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.97,8]}>
      <planeGeometry args={[3.5,30]} />
      <meshStandardMaterial color="#D4B896" roughness={0.95} />
    </mesh>
  );
});

/* ---- Taj Mahal ---- */
const TajMahal = memo(function TajMahal() {
  const g = useRef();
  useFrame(s => { g.current.position.y = Math.sin(s.clock.elapsedTime*0.3)*0.25; });
  return (
    <group ref={g} position={[0,0,-70]} scale={1.2}>
      <mesh position={[0,0.5,0]}><boxGeometry args={[10,1,6]}/><meshStandardMaterial color="#F0E6D4"/></mesh>
      <mesh position={[0,3,0]}><boxGeometry args={[6,4,4]}/><meshStandardMaterial color="#F5F0E8" emissive="#FFF5E1" emissiveIntensity={0.05}/></mesh>
      <mesh position={[0,6.5,0]}><sphereGeometry args={[2.2,24,24,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color="#F5F0E8" emissive="#FFF8E1" emissiveIntensity={0.1}/></mesh>
      <mesh position={[0,8.8,0]}><cylinderGeometry args={[0.05,0.12,1,8]}/><meshStandardMaterial color="#D4A574"/></mesh>
      {[[-4.5,3,2.5],[4.5,3,2.5],[-4.5,3,-2.5],[4.5,3,-2.5]].map((p,i)=>(
        <group key={i} position={p}>
          <mesh><cylinderGeometry args={[0.2,0.25,6,12]}/><meshStandardMaterial color="#F5F0E8"/></mesh>
          <mesh position={[0,3.2,0]}><sphereGeometry args={[0.35,12,12,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color="#F5F0E8"/></mesh>
        </group>
      ))}
      <mesh position={[0,2,2.01]}><planeGeometry args={[2,3]}/><meshStandardMaterial color="#8B7355"/></mesh>
      <pointLight position={[0,7,0]} intensity={0.6} color="#FFD700" distance={15}/>
    </group>
  );
});

/* ---- India Gate ---- */
const IndiaGate = memo(function IndiaGate() {
  const g = useRef();
  useFrame(s => { g.current.scale.setScalar(0.8+Math.sin(s.clock.elapsedTime*0.5)*0.01); });
  return (
    <group ref={g} position={[-30,0,-60]} scale={0.8}>
      <mesh position={[-2,2.5,0]}><boxGeometry args={[1.2,5,1.2]}/><meshStandardMaterial color="#D4A574" emissive="#D4A574" emissiveIntensity={0.05}/></mesh>
      <mesh position={[2,2.5,0]}><boxGeometry args={[1.2,5,1.2]}/><meshStandardMaterial color="#D4A574" emissive="#D4A574" emissiveIntensity={0.05}/></mesh>
      <mesh position={[0,5.5,0]}><boxGeometry args={[5.5,1,1.5]}/><meshStandardMaterial color="#D4A574"/></mesh>
      <mesh position={[0,6.5,0]}><sphereGeometry args={[0.8,12,12,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color="#C4956A"/></mesh>
      <pointLight position={[0,3,1]} intensity={0.3} color="#FF8C00" distance={8}/>
    </group>
  );
});

/* ---- Qutub Minar ---- */
const QutubMinar = memo(function QutubMinar() {
  const r = useRef();
  useFrame((_,d) => { r.current.rotation.y += d*0.02; });
  return (
    <group ref={r} position={[-50,0,-75]} scale={0.7}>
      <mesh position={[0,3.5,0]}><cylinderGeometry args={[0.4,0.9,7,12]}/><meshStandardMaterial color="#C4956A" emissive="#C4956A" emissiveIntensity={0.05}/></mesh>
      {[1.5,3,4.5].map((y,i)=>(<mesh key={i} position={[0,y,0]}><torusGeometry args={[0.75-i*0.1,0.06,8,24]}/><meshStandardMaterial color="#A07855"/></mesh>))}
      <mesh position={[0,7.2,0]}><coneGeometry args={[0.4,0.8,8]}/><meshStandardMaterial color="#8B6B4A"/></mesh>
    </group>
  );
});

/* ---- Gateway of India ---- */
const GatewayOfIndia = memo(function GatewayOfIndia() {
  const r = useRef();
  useFrame(s => { r.current.rotation.z = Math.sin(s.clock.elapsedTime*0.4)*0.008; });
  return (
    <group ref={r} position={[30,0,-60]} scale={0.8}>
      <mesh position={[-2.5,2.5,0]}><boxGeometry args={[1.5,5,1.5]}/><meshStandardMaterial color="#E8D5B7"/></mesh>
      <mesh position={[2.5,2.5,0]}><boxGeometry args={[1.5,5,1.5]}/><meshStandardMaterial color="#E8D5B7"/></mesh>
      <mesh position={[0,5.5,0]}><boxGeometry args={[6.5,1,2]}/><meshStandardMaterial color="#E8D5B7"/></mesh>
      <mesh position={[0,6.5,0]}><sphereGeometry args={[1,12,12,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color="#E8D5B7"/></mesh>
      {[-4,4].map((x,i)=>(<group key={i} position={[x,2,0]}><mesh><cylinderGeometry args={[0.4,0.4,4,8]}/><meshStandardMaterial color="#DCC8A8"/></mesh><mesh position={[0,2.3,0]}><sphereGeometry args={[0.5,8,8,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color="#DCC8A8"/></mesh></group>))}
    </group>
  );
});

/* ---- Hawa Mahal ---- */
const HawaMahal = memo(function HawaMahal() {
  const ws = useRef([]);
  useFrame(s => {
    ws.current.forEach((w,i) => {
      if(w) w.material.emissiveIntensity = 0.1+Math.sin(s.clock.elapsedTime*2+i*0.5)*0.15;
    });
  });
  return (
    <group position={[50,0,-65]} scale={0.7}>
      <mesh><boxGeometry args={[5,7,0.5]}/><meshStandardMaterial color="#E88B7A" emissive="#E88B7A" emissiveIntensity={0.05}/></mesh>
      {Array.from({length:20},(_, i)=>{
        const row=Math.floor(i/4), col=i%4;
        return <mesh key={i} ref={el=>ws.current[i]=el} position={[-1.2+col*0.8, -2+row*1.2, 0.26]}>
          <torusGeometry args={[0.2,0.06,8,12,Math.PI]}/><meshStandardMaterial color="#F5A090" emissive="#FFD700" emissiveIntensity={0.1}/>
        </mesh>;
      })}
    </group>
  );
});

/* ---- School Building ---- */
const SchoolBuilding = memo(function SchoolBuilding() {
  const flagRef = useRef();
  useFrame(s => { if(flagRef.current) flagRef.current.rotation.z = Math.sin(s.clock.elapsedTime*2.5)*0.2; });
  return (
    <group position={[0,0,-12]}>
      <mesh position={[0,3,0]} castShadow><boxGeometry args={[16,6,9]}/><meshStandardMaterial color="#FFF8E7"/></mesh>
      <mesh position={[0,7,0]}><coneGeometry args={[10,2.5,4]}/><meshStandardMaterial color="#D35400"/></mesh>
      <mesh position={[0,1.5,4.51]}><planeGeometry args={[2.5,3]}/><meshStandardMaterial color="#2D3142"/></mesh>
      {[[-5,4],[-2.5,4],[2.5,4],[5,4],[-5,2],[-2.5,2],[2.5,2],[5,2]].map(([x,y],i)=>(
        <mesh key={i} position={[x,y,4.51]}><planeGeometry args={[1.2,1.4]}/><meshStandardMaterial color="#FFE4B5" emissive="#FFD700" emissiveIntensity={0.3+Math.sin(i)*0.15}/></mesh>
      ))}
      <mesh position={[0,5.2,4.51]}><planeGeometry args={[6,0.7]}/><meshStandardMaterial color="#2D3142"/></mesh>
      <mesh position={[6.5,8,0]}><cylinderGeometry args={[0.04,0.04,3,6]}/><meshStandardMaterial color="#666"/></mesh>
      <mesh ref={flagRef} position={[7.3,9.2,0]}><planeGeometry args={[1.4,0.7]}/><meshStandardMaterial color="#FF6B35" side={THREE.DoubleSide}/></mesh>
      <pointLight position={[0,2,5]} intensity={0.4} color="#FFD700" distance={8}/>
    </group>
  );
});

/* ---- Tree ---- */
const Tree = memo(function Tree({position, s=1}) {
  const ref = useRef();
  useFrame(st => { ref.current.rotation.z = Math.sin(st.clock.elapsedTime*0.5+position[0])*0.03; });
  return (
    <group position={position} scale={s}>
      <mesh position={[0,1.5,0]}><cylinderGeometry args={[0.2,0.3,3,6]}/><meshStandardMaterial color="#8B6F47"/></mesh>
      <group ref={ref}>
        <mesh position={[0,3.5,0]}><sphereGeometry args={[1.6,10,10]}/><meshStandardMaterial color="#388E3C"/></mesh>
        <mesh position={[0.8,3,0.4]}><sphereGeometry args={[1.1,8,8]}/><meshStandardMaterial color="#4CAF50"/></mesh>
        <mesh position={[-0.6,3.2,-0.3]}><sphereGeometry args={[1.2,8,8]}/><meshStandardMaterial color="#2E7D32"/></mesh>
      </group>
    </group>
  );
});

/* ---- Student Character ---- */
const StudentChar = memo(function StudentChar({position, color, action}) {
  const body = useRef(), arm = useRef(), eyeL = useRef(), eyeR = useRef();
  useFrame(s => {
    const t = s.clock.elapsedTime;
    body.current.scale.y = 1+Math.sin(t*2)*0.02;
    // Blink
    const blink = Math.sin(t*1.2+position[0])>0.97 ? 0.1 : 1;
    if(eyeL.current) eyeL.current.scale.y = blink;
    if(eyeR.current) eyeR.current.scale.y = blink;
    if(action==='hand_up' && arm.current) arm.current.rotation.z = -1.5+Math.sin(t*2)*0.2;
    else if(action==='writing' && arm.current) arm.current.rotation.z = -0.3+Math.sin(t*5)*0.12;
    else if(action==='sleeping' && arm.current) arm.current.rotation.z = -0.1;
  });
  return (
    <group position={position}>
      <mesh position={[0,0.45,0]}><boxGeometry args={[1.2,0.08,0.8]}/><meshStandardMaterial color="#8B6F47"/></mesh>
      <group ref={body}>
        <mesh position={[0,0.95,0]}><cylinderGeometry args={[0.28,0.32,0.7,8]}/><meshStandardMaterial color={color}/></mesh>
        <mesh position={[0,1.65,0]}><sphereGeometry args={[0.35,12,12]}/><meshStandardMaterial color="#F5D0A9"/></mesh>
        <mesh ref={eyeL} position={[-0.12,1.72,0.3]}><sphereGeometry args={[0.06,6,6]}/><meshStandardMaterial color="#2D3142"/></mesh>
        <mesh ref={eyeR} position={[0.12,1.72,0.3]}><sphereGeometry args={[0.06,6,6]}/><meshStandardMaterial color="#2D3142"/></mesh>
        <mesh ref={arm} position={[0.35,1.1,0]} rotation={[0,0,-0.3]}><cylinderGeometry args={[0.06,0.06,0.5,6]}/><meshStandardMaterial color={color}/></mesh>
      </group>
      {action==='sleeping' && <Float speed={2} floatIntensity={0.3}><Text position={[0.5,2,0]} fontSize={0.25} color="#7A7D8B" fillOpacity={0.6}>Z</Text></Float>}
    </group>
  );
});

/* ---- Teacher ---- */
const TeacherChar = memo(function TeacherChar() {
  const r = useRef();
  useFrame(s => {
    const t = s.clock.elapsedTime;
    r.current.position.x = -3+Math.sin(t*0.3)*2.5;
    r.current.rotation.y = Math.sin(t*0.3)>0?0.3:-0.3;
  });
  return (
    <group ref={r} position={[-3,-2,-6]}>
      <mesh position={[0,1.3,0]}><cylinderGeometry args={[0.32,0.38,1.3,8]}/><meshStandardMaterial color="#2D3142"/></mesh>
      <mesh position={[0,2.3,0]}><sphereGeometry args={[0.38,12,12]}/><meshStandardMaterial color="#D2A679"/></mesh>
      <mesh position={[0.15,2.35,0.35]}><torusGeometry args={[0.09,0.018,8,12]}/><meshStandardMaterial color="#333"/></mesh>
      <mesh position={[-0.15,2.35,0.35]}><torusGeometry args={[0.09,0.018,8,12]}/><meshStandardMaterial color="#333"/></mesh>
      <mesh position={[0.45,1.6,0]} rotation={[0,0,-0.8]}><cylinderGeometry args={[0.02,0.02,1.1,6]}/><meshStandardMaterial color="#8B4513"/></mesh>
      <mesh position={[0.2,2.65,0]}><sphereGeometry args={[0.22,8,8]}/><meshStandardMaterial color="#1A1A2E"/></mesh>
    </group>
  );
});

/* ---- Birds V-Formation ---- */
const Birds = memo(function Birds() {
  const g = useRef();
  useFrame(s => { const t=s.clock.elapsedTime; g.current.position.x=-50+((t*2.5)%100); g.current.position.y=16+Math.sin(t*0.5)*2; });
  return (
    <group ref={g} position={[-50,16,-35]}>
      {[0,1,2,3,4].map(i=>{
        const ox=i===0?0:(i%2?1:-1)*Math.ceil(i/2)*2;
        const oy=-Math.ceil(i/2)*0.6;
        return <BirdMesh key={i} position={[ox,oy,-Math.ceil(i/2)*0.5]}/>;
      })}
    </group>
  );
});
function BirdMesh({position}) {
  const w = useRef();
  useFrame(s => { if(w.current) w.current.rotation.z=Math.sin(s.clock.elapsedTime*10)*0.5; });
  return (
    <group position={position}>
      <mesh><sphereGeometry args={[0.1,6,6]}/><meshStandardMaterial color="#2D3142"/></mesh>
      <group ref={w}>
        <mesh position={[-0.25,0,0]} rotation={[0,0,0.3]}><planeGeometry args={[0.5,0.12]}/><meshStandardMaterial color="#2D3142" side={THREE.DoubleSide}/></mesh>
        <mesh position={[0.25,0,0]} rotation={[0,0,-0.3]}><planeGeometry args={[0.5,0.12]}/><meshStandardMaterial color="#2D3142" side={THREE.DoubleSide}/></mesh>
      </group>
    </group>
  );
}

/* ---- Butterfly ---- */
function Butterfly({color, delay}) {
  const r = useRef(), w = useRef();
  useFrame(s => {
    const t=s.clock.elapsedTime+delay;
    r.current.position.set(-18+((t*1.2)%36), 1.5+Math.sin(t*1.5)*2, -3+Math.sin(t*0.7)*4);
    if(w.current) w.current.rotation.y=Math.sin(t*12)*0.7;
  });
  return (
    <group ref={r}><group ref={w}>
      <mesh position={[-0.14,0,0]}><planeGeometry args={[0.28,0.18]}/><meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.8}/></mesh>
      <mesh position={[0.14,0,0]}><planeGeometry args={[0.28,0.18]}/><meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.8}/></mesh>
    </group></group>
  );
}

/* ---- Floating Elements ---- */
const FloatingElements = memo(function FloatingElements() {
  const items = useMemo(() => {
    const chars = ['π','∑','∞','Δ','√','∫','α','β','+','=','%','E=mc²'];
    return chars.map((c,i) => ({ c, x:(Math.random()-0.5)*35, z:(Math.random()-0.5)*25, y:Math.random()*14, spd:0.003+Math.random()*0.008 }));
  }, []);
  return items.map((s,i) => (
    <Float key={i} speed={1+Math.random()*2} floatIntensity={0.8} rotationIntensity={0.4}>
      <Text position={[s.x,s.y+2,s.z]} fontSize={0.5} color="#2D3142" fillOpacity={0.15}
        font="https://fonts.gstatic.com/s/spacemono/v13/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2">{s.c}</Text>
    </Float>
  ));
});

/* ---- Mouse Parallax ---- */
function MouseParallax() {
  const {camera} = useThree();
  const mouse = useRef({x:0,y:0});
  React.useEffect(() => {
    const h = e => { mouse.current.x=(e.clientX/window.innerWidth-0.5)*2; mouse.current.y=(e.clientY/window.innerHeight-0.5)*2; };
    window.addEventListener('mousemove',h);
    return ()=>window.removeEventListener('mousemove',h);
  },[]);
  useFrame(()=>{
    camera.position.x=THREE.MathUtils.lerp(camera.position.x, mouse.current.x*3, 0.03);
    camera.position.y=THREE.MathUtils.lerp(camera.position.y, 6+mouse.current.y*-1.5, 0.03);
    camera.lookAt(0,2,-5);
  });
  return null;
}

/* ---- MAIN SCENE ---- */
export default function LoginScene3D() {
  return (
    <Canvas
      shadows
      camera={{position:[0,6,25], fov:55, near:0.1, far:200}}
      style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',zIndex:0}}
      gl={{antialias:true}}
      onCreated={({scene})=>{scene.background=new THREE.Color('#FCB69F');}}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} color="#FFE8D6"/>
        <directionalLight position={[15,20,10]} intensity={1.5} color="#FFF5E1" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}/>
        <pointLight position={[-8,10,-5]} intensity={0.6} color="#FF6B35"/>
        <pointLight position={[0,3,0]} intensity={0.3} color="#FFD700"/>
        <hemisphereLight args={['#C3CFE2','#FCB69F',0.4]}/>
        <fog attach="fog" args={['#FFECD2',30,120]}/>

        <AnimatedSky/>
        <Ground/>
        <Pathway/>

        <TajMahal/>
        <IndiaGate/>
        <QutubMinar/>
        <GatewayOfIndia/>
        <HawaMahal/>

        <SchoolBuilding/>

        <Tree position={[-10,-2,-3]} s={1.3}/>
        <Tree position={[-16,-2,-10]} s={1}/>
        <Tree position={[10,-2,-4]} s={1.1}/>
        <Tree position={[14,-2,-12]} s={0.9}/>
        <Tree position={[-8,-2,4]} s={1.2}/>
        <Tree position={[16,-2,2]} s={1}/>

        <StudentChar position={[-3,-2,-6]} color="#FF6B35" action="writing"/>
        <StudentChar position={[-1,-2,-7]} color="#2EC4B6" action="hand_up"/>
        <StudentChar position={[1,-2,-6]} color="#F4A261" action="reading"/>
        <StudentChar position={[3,-2,-7]} color="#E71D73" action="sleeping"/>
        <TeacherChar/>

        <Birds/>
        <Butterfly color="#FF6B35" delay={0}/>
        <Butterfly color="#E71D73" delay={4}/>
        <Butterfly color="#F4A261" delay={8}/>
        <Butterfly color="#9B59B6" delay={12}/>

        <FloatingElements/>

        <Sparkles count={200} scale={[50,25,50]} size={3} speed={0.3} color="#FFD700" opacity={0.5}/>
        <Sparkles count={120} scale={[40,20,40]} size={2} speed={0.2} color="#FFFFFF" opacity={0.4}/>

        <Cloud position={[-18,16,-30]} speed={0.2} opacity={0.5} width={12} depth={2}/>
        <Cloud position={[12,20,-40]} speed={0.15} opacity={0.4} width={10} depth={1.5}/>
        <Cloud position={[28,14,-25]} speed={0.25} opacity={0.45} width={14} depth={2}/>
        <Cloud position={[-8,22,-50]} speed={0.1} opacity={0.35} width={8} depth={1.5}/>

        <MouseParallax/>

        <EffectComposer>
          <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.9} intensity={0.5} radius={0.4}/>
          <Vignette eskil={false} offset={0.1} darkness={0.35}/>
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
