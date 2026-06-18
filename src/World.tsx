import { Text } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { SpawnPoint } from '@xrift/world-components'
import { EntryLogBoard } from './components/EntryLogBoard'
import { Skybox } from './components/Skybox'
import { WORLD_CONFIG } from './constants'

type Vector3Tuple = [number, number, number]

export interface WorldProps {
  position?: Vector3Tuple
  scale?: number
}

interface StaticBlockProps {
  position: Vector3Tuple
  size: Vector3Tuple
  color: string
  rotation?: Vector3Tuple
  castShadow?: boolean
  receiveShadow?: boolean
  opacity?: number
}

interface SignBoardProps {
  position: Vector3Tuple
  label: string
  width?: number
  height?: number
  rotation?: Vector3Tuple
  boardColor?: string
  textColor?: string
}

interface ChairProps {
  position: Vector3Tuple
  rotation?: number
}

interface TableSetProps {
  position: Vector3Tuple
}

const TABLE_POSITIONS: Vector3Tuple[] = [
  [-8.4, 0, 7.6],
  [-2.8, 0, 7.6],
  [2.8, 0, 7.6],
  [8.4, 0, 7.6],
  [-8.4, 0, 2.2],
  [-2.8, 0, 2.2],
  [2.8, 0, 2.2],
  [8.4, 0, 2.2],
  [-8.4, 0, -3.2],
  [-2.8, 0, -3.2],
  [2.8, 0, -3.2],
  [8.4, 0, -3.2],
]

const StaticBlock: React.FC<StaticBlockProps> = ({
  position,
  size,
  color,
  rotation = [0, 0, 0],
  castShadow = false,
  receiveShadow = false,
  opacity = 1,
}) => (
  <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={1}>
    <mesh position={position} rotation={rotation} castShadow={castShadow} receiveShadow={receiveShadow}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent={opacity < 1} opacity={opacity} />
    </mesh>
  </RigidBody>
)

const FloorAccent: React.FC<{ position: Vector3Tuple, size: Vector3Tuple, color: string }> = ({ position, size, color }) => (
  <mesh position={position} receiveShadow>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} />
  </mesh>
)

const SignBoard: React.FC<SignBoardProps> = ({
  position,
  label,
  width = 2.8,
  height = 0.9,
  rotation = [0, 0, 0],
  boardColor = '#7a1f1f',
  textColor = '#fff5d6',
}) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <boxGeometry args={[width, height, 0.14]} />
      <meshStandardMaterial color={boardColor} />
    </mesh>
    <Text position={[0, 0, 0.08]} fontSize={0.28} color={textColor} anchorX="center" anchorY="middle">
      {label}
    </Text>
  </group>
)

const Lantern: React.FC<{ position: Vector3Tuple }> = ({ position }) => (
  <group position={position}>
    <mesh castShadow>
      <cylinderGeometry args={[0.35, 0.35, 0.7, 20]} />
      <meshStandardMaterial color="#c93a2f" emissive="#401010" />
    </mesh>
    <mesh position={[0, 0.42, 0]}>
      <cylinderGeometry args={[0.18, 0.18, 0.08, 20]} />
      <meshStandardMaterial color="#1f1f1f" />
    </mesh>
    <mesh position={[0, -0.42, 0]}>
      <cylinderGeometry args={[0.18, 0.18, 0.08, 20]} />
      <meshStandardMaterial color="#1f1f1f" />
    </mesh>
  </group>
)

const CeilingLight: React.FC<{ position: Vector3Tuple, size?: Vector3Tuple }> = ({ position, size = [3.6, 0.12, 0.8] }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#f5f1da" emissive="#fff5c0" emissiveIntensity={0.95} />
    </mesh>
    <mesh position={[0, -0.1, 0]}>
      <boxGeometry args={[size[0] * 0.78, 0.04, size[2] * 0.72]} />
      <meshStandardMaterial
        color="#fff5d6"
        emissive="#fff1b0"
        emissiveIntensity={1.6}
        transparent
        opacity={0.9}
      />
    </mesh>
  </group>
)

const TABLE_SEAT_OFFSETS: Vector3Tuple[] = [
  [-0.7, 0, 0.35],
  [0.7, 0, 0.35],
  [-0.7, 0, -0.35],
  [0.7, 0, -0.35],
]

const TableTopItems: React.FC = () => (
  <group>
    {TABLE_SEAT_OFFSETS.map(([x, , z], i) => (
      <group key={i}>
        {/* 繝薙・繝ｫ */}
        <group position={[x, 0.84, z]}>
          <mesh>
            <cylinderGeometry args={[0.06, 0.06, 0.28, 16]} />
            <meshStandardMaterial color="#d59c1a" roughness={0.25} metalness={0.05} />
          </mesh>
          <mesh position={[0, 0.14, 0]}>
            <cylinderGeometry args={[0.0625, 0.0625, 0.05, 16]} />
            <meshStandardMaterial color="#fff4dc" />
          </mesh>
        </group>
        {/* 邂ｸ */}
        <group position={[x + 0.18, 0.83, z]} rotation={[0, 0.24, 0]}>
          <mesh position={[0.03, 0.01, 0]}>
            <boxGeometry args={[0.02, 0.02, 0.32]} />
            <meshStandardMaterial color="#d6bf8c" />
          </mesh>
          <mesh position={[-0.03, 0.01, 0]}>
            <boxGeometry args={[0.02, 0.02, 0.32]} />
            <meshStandardMaterial color="#ceb57a" />
          </mesh>
          <mesh position={[0.08, -0.005, 0.13]}>
            <boxGeometry args={[0.08, 0.02, 0.05]} />
            <meshStandardMaterial color="#f6f1eb" />
          </mesh>
        </group>
      </group>
    ))}
  </group>
)

const Chair: React.FC<ChairProps> = ({ position, rotation = 0 }) => (
  <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.46, 0]}>
        <boxGeometry args={[0.56, 0.08, 0.56]} />
        <meshStandardMaterial color="#7a1919" />
      </mesh>
      <mesh position={[0, 0.8, -0.24]}>
        <boxGeometry args={[0.56, 0.6, 0.08]} />
        <meshStandardMaterial color="#7a1919" />
      </mesh>
      {[
        [-0.2, 0.21, -0.2],
        [0.2, 0.21, -0.2],
        [-0.2, 0.21, 0.2],
        [0.2, 0.21, 0.2],
      ].map((leg, index) => (
        <mesh key={index} position={leg as Vector3Tuple}>
          <boxGeometry args={[0.08, 0.42, 0.08]} />
          <meshStandardMaterial color="#4d2c17" />
        </mesh>
      ))}
    </group>
)

const TableSet: React.FC<TableSetProps> = ({ position }) => (
  <group position={position}>
    <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={1}>
      <group>
        <mesh position={[0, 0.78, 0]} castShadow>
          <boxGeometry args={[2.625, 0.1, 1.15]} />
          <meshStandardMaterial color="#b4723a" />
        </mesh>
        {[
          [-0.93, 0.39, -0.37],
          [0.93, 0.39, -0.37],
          [-0.93, 0.39, 0.37],
          [0.93, 0.39, 0.37],
        ].map((leg, index) => (
          <mesh key={index} position={leg as Vector3Tuple}>
            <boxGeometry args={[0.12, 0.78, 0.12]} />
            <meshStandardMaterial color="#5f3416" />
          </mesh>
        ))}
      </group>
    </RigidBody>

    <TableTopItems />

    <Chair position={[-0.7, 0, 1.06]} rotation={Math.PI} />
    <Chair position={[0.7, 0, 1.06]} rotation={Math.PI} />
    <Chair position={[-0.7, 0, -1.06]} rotation={0} />
    <Chair position={[0.7, 0, -1.06]} rotation={0} />
  </group>
)

export const World: React.FC<WorldProps> = ({ position = [0, 0, 0], scale = 1 }) => {
  const worldWidth = 26
  const worldDepth = WORLD_CONFIG.size
  const wallHeight = WORLD_CONFIG.wallHeight
  const wallThickness = WORLD_CONFIG.wallThickness
  const halfWidth = worldWidth / 2
  const halfDepth = worldDepth / 2
  const ceilingY = wallHeight - 0.15
  const entranceHalfWidth = 3.2
  const entranceHeaderWidth = 6.8
  const frontWallSectionWidth = halfWidth - entranceHalfWidth
  const frontWallSectionX = (halfWidth + entranceHalfWidth) / 2

  const roomX = {
    sideBeam: 8.8,
    sideCeilingLight: 10.4,
    leftFloorAccent: -10.4,
    rightFloorAccent: 10.7,
    leftCounter: -10.1,
    leftShelf: -11.65,
    leftRegister: -8.55,
    leftPartition: -11.95,
    leftSign: -9.35,
    leftLantern: -11.1,
    rightBoothCenter: 11.05,
    rightBoothWall: 12.55,
    rightBoothInner: 9.62,
    rightBench: 11.45,
    rightStand: 10.3,
    rightSign: 9.95,
    rightLantern: 11.65,
    kitchenLowerShelf: 10.95,
    kitchenUpperShelf: 7.8,
  } as const

  return (
    <group position={position} scale={scale}>
      <Skybox radius={500} />

      <ambientLight intensity={0.72} />
      <directionalLight
        position={[0, 14, 10]}
        intensity={0.75}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-far={60}
        shadow-camera-left={-24}
        shadow-camera-right={24}
        shadow-camera-top={24}
        shadow-camera-bottom={-24}
      />

      <CeilingLight position={[0, 4.45, 11]} />
      <CeilingLight position={[0, 4.45, 3]} />
      <CeilingLight position={[0, 4.45, -5]} />
      <CeilingLight position={[0, 4.45, -13]} />
      <CeilingLight position={[-roomX.sideCeilingLight, 4.45, 14]} size={[2.4, 0.12, 0.8]} />
      <CeilingLight position={[roomX.sideCeilingLight, 4.45, 14]} size={[2.4, 0.12, 0.8]} />

      <StaticBlock position={[0, -0.1, 0]} size={[worldWidth, 0.2, worldDepth]} color="#c69355" receiveShadow />
      <FloorAccent position={[0, 0.03, 15.4]} size={[6.6, 0.04, 3]} color="#3d3d3d" />
      <FloorAccent position={[0, 0.02, 1.2]} size={[4.4, 0.02, 22]} color="#7f5a30" />
      <FloorAccent position={[roomX.leftFloorAccent, 0.02, 13.6]} size={[4.6, 0.02, 5]} color="#6a4023" />
      <FloorAccent position={[roomX.rightFloorAccent, 0.02, 14.7]} size={[4.8, 0.02, 7.5]} color="#cfd5db" />
      <FloorAccent position={[0, 0.02, -15.3]} size={[22, 0.02, 8.8]} color="#c8ced4" />

      <StaticBlock position={[-halfWidth, wallHeight / 2, 0]} size={[wallThickness, wallHeight, worldDepth]} color="#9b5e30" castShadow />
      <StaticBlock position={[halfWidth, wallHeight / 2, 0]} size={[wallThickness, wallHeight, worldDepth]} color="#9b5e30" castShadow />
      <StaticBlock position={[0, wallHeight / 2, -halfDepth]} size={[worldWidth, wallHeight, wallThickness]} color="#9b5e30" castShadow />
      <StaticBlock position={[-frontWallSectionX, wallHeight / 2, halfDepth]} size={[frontWallSectionWidth, wallHeight, wallThickness]} color="#9b5e30" castShadow />
      <StaticBlock position={[frontWallSectionX, wallHeight / 2, halfDepth]} size={[frontWallSectionWidth, wallHeight, wallThickness]} color="#9b5e30" castShadow />
      <StaticBlock position={[0, wallHeight - 0.5, halfDepth]} size={[entranceHeaderWidth, 1, wallThickness]} color="#6e3d1e" castShadow />
      <StaticBlock position={[-entranceHalfWidth, 1.8, halfDepth]} size={[0.32, 3.6, wallThickness]} color="#55301b" castShadow />
      <StaticBlock position={[entranceHalfWidth, 1.8, halfDepth]} size={[0.32, 3.6, wallThickness]} color="#55301b" castShadow />

      <StaticBlock position={[0, ceilingY, 0]} size={[worldWidth, 0.3, worldDepth]} color="#f3e5c2" receiveShadow />
      <StaticBlock position={[0, 4.55, 0]} size={[0.22, 0.28, worldDepth - 1.4]} color="#8e5a2c" castShadow />
      <StaticBlock position={[-roomX.sideBeam, 4.55, 0]} size={[0.18, 0.24, worldDepth - 1.4]} color="#8e5a2c" castShadow />
      <StaticBlock position={[roomX.sideBeam, 4.55, 0]} size={[0.18, 0.24, worldDepth - 1.4]} color="#8e5a2c" castShadow />

      <group position={[0, 3.15, 19.55]}>
        {[-1.85, 0, 1.85].map((panelX) => (
          <mesh key={panelX} position={[panelX, 0, 0]}>
            <boxGeometry args={[1.55, 1.25, 0.06]} />
            <meshStandardMaterial color="#7c1d1d" />
          </mesh>
        ))}
      </group>
      <SignBoard position={[0, 4.18, 19.2]} label="IZAKAYA" width={3.8} height={0.95} />

      <StaticBlock position={[roomX.leftCounter, 1, 13.5]} size={[4.2, 2, 1.6]} color="#6e3e1f" castShadow />
      <StaticBlock position={[roomX.leftShelf, 1, 10.7]} size={[1.4, 2, 5.8]} color="#6e3e1f" castShadow />
      <StaticBlock position={[roomX.leftRegister, 2.18, 13.45]} size={[0.8, 0.42, 0.58]} color="#2f2f35" castShadow />
      <StaticBlock position={[roomX.leftPartition, 2.8, 12.2]} size={[0.35, 1.8, 5]} color="#4a2d1b" castShadow />
      <SignBoard position={[roomX.leftSign, 3.05, 12.45]} label="REGI" width={2.4} height={0.75} rotation={[0, Math.PI / 2, 0]} />
      <Lantern position={[roomX.leftLantern, 3.6, 15.8]} />

      <StaticBlock position={[roomX.rightBoothCenter, 1.5, 11]} size={[3, 3, 0.24]} color="#d9e3ea" opacity={0.55} />
      <StaticBlock position={[roomX.rightBoothCenter, 1.5, 18.35]} size={[3, 3, 0.24]} color="#d9e3ea" opacity={0.55} />
      <StaticBlock position={[roomX.rightBoothWall, 1.5, 14.7]} size={[0.24, 3, 7.4]} color="#d9e3ea" opacity={0.55} />
      <StaticBlock position={[roomX.rightBoothInner, 1.5, 12.6]} size={[0.18, 3, 2.6]} color="#d9e3ea" opacity={0.55} />
      <StaticBlock position={[roomX.rightBoothInner, 1.5, 16.8]} size={[0.18, 3, 2.4]} color="#d9e3ea" opacity={0.55} />
      <StaticBlock position={[roomX.rightBench, 0.58, 14.75]} size={[1.9, 1.16, 0.48]} color="#6e4728" castShadow />
      <StaticBlock position={[roomX.rightStand, 0.7, 14.7]} size={[0.4, 1.4, 0.4]} color="#8e959c" castShadow />
      <SignBoard position={[roomX.rightSign, 3.05, 15.15]} label="SMOKING" width={2.8} height={0.72} rotation={[0, -Math.PI / 2, 0]} boardColor="#3a4d66" />
      <Lantern position={[roomX.rightLantern, 3.55, 18.3]} />

      <StaticBlock position={[0, 0.475, -12.7]} size={[24, 0.95, 2.2]} color="#727a82" castShadow />
      <StaticBlock position={[0, 1.95, -18]} size={[24, 2.3, 1.1]} color="#c9d0d6" castShadow />
      <StaticBlock position={[0, 4.1, -15.5]} size={[9.5, 0.7, 1.3]} color="#858b92" castShadow />
      <StaticBlock position={[-roomX.kitchenLowerShelf, 0.85, -15.8]} size={[3.2, 1.7, 1.4]} color="#8e959c" castShadow />
      <StaticBlock position={[roomX.kitchenLowerShelf, 0.85, -15.8]} size={[3.2, 1.7, 1.4]} color="#8e959c" castShadow />
      <StaticBlock position={[-roomX.kitchenUpperShelf, 2.8, -17.35]} size={[3.2, 0.3, 0.7]} color="#6a7077" castShadow />
      <StaticBlock position={[roomX.kitchenUpperShelf, 2.8, -17.35]} size={[3.2, 0.3, 0.7]} color="#6a7077" castShadow />
      <SignBoard position={[0, 3.25, -12.1]} label="KITCHEN" width={4.2} height={0.82} boardColor="#4b4f58" />

      {TABLE_POSITIONS.map((tablePosition, index) => (
        <TableSet key={index} position={tablePosition} />
      ))}

      <EntryLogBoard position={[-11.8, 1.5, 16]} rotation={[0, Math.PI / 2, 0]} scale={0.7} />
      <SpawnPoint position={[0, 0, 16.4]} />
      
    </group>
  )
}
