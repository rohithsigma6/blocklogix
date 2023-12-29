import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';

extend({ OrbitControls });

const CameraControls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  useFrame(() => orbitRef.current.update());
  return <orbitControls ref={orbitRef} args={[camera, gl.domElement]} />;
};

const App = () => {
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleAddButtonClick = () => setDisplayText(text);

  return (
    <div className="app-container">
      <Canvas camera={{ position: [0, 0, 5] }} className="canvas-container">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <CameraControls />
        <Text
          color="white"
          fontSize={1.5}
          maxWidth={300}
          lineHeight={1.5}
          letterSpacing={0.02}
          textAlign="center"
          position={[0, 0, 0]}
          onPointerOut={(e) => e.object.material.color.set('black')}
        >
          {displayText}
        </Text>
      </Canvas>
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />
        <button onClick={handleAddButtonClick}>Add</button>
      </div>
    </div>
  );
};

export default App;
