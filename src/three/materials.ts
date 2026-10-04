import * as THREE from 'three'

export const STONE = new THREE.Color('#e8e5dc')
export const GRAPHITE = new THREE.Color('#35372f')
export const GREEN_LIGHT = new THREE.Color('#0f7b35')
export const GREEN_DARK = new THREE.Color('#1a9c47')

export const shellMat = new THREE.MeshStandardMaterial({
  color: GRAPHITE.clone(),
  roughness: 0.62,
  metalness: 0.06,
  transparent: true,
  opacity: 1,
})

export const jointMat = new THREE.MeshStandardMaterial({
  color: '#17180f',
  roughness: 0.5,
  metalness: 0.2,
  transparent: true,
  opacity: 1,
})

export const discMat = new THREE.MeshStandardMaterial({
  color: GREEN_LIGHT.clone(),
  roughness: 0.45,
  metalness: 0.1,
  transparent: true,
  opacity: 1,
})

export const mMat = new THREE.MeshStandardMaterial({
  color: '#f4f1ea',
  roughness: 0.55,
  metalness: 0,
  transparent: true,
  opacity: 1,
})

export const layerMat = new THREE.MeshStandardMaterial({
  color: GRAPHITE.clone(),
  roughness: 0.58,
  metalness: 0.08,
  transparent: true,
  opacity: 0,
})

export const netLineMat = new THREE.LineBasicMaterial({
  color: '#9a9c93',
  transparent: true,
  opacity: 0,
})

export const netPointMat = new THREE.PointsMaterial({
  color: '#f0eee7',
  size: 0.05,
  transparent: true,
  opacity: 0,
  sizeAttenuation: true,
})

export const pulseMat = new THREE.MeshBasicMaterial({
  color: '#5ed489',
  transparent: true,
  opacity: 0,
})
