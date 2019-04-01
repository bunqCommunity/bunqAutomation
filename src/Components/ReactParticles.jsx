import React from "react";
import ParticleField from "react-particles-webgl";

export const particleConfig = {
    showCube: false,
    dimension: "3D",
    velocity: 0.4,
    boundaryType: "bounce",
    antialias: true,
    direction: {
        xMin: -0.7,
        xMax: 0.7,
        yMin: -0.7,
        yMax: 0.7,
        zMin: -0.7,
        zMax: 0.7
    },
    lines: {
        colorMode: "solid",
        color: "#009688",
        transparency: 0.9,
        limitConnections: true,
        maxConnections: 20,
        minDistance: 150,
        visible: true
    },
    particles: {
        colorMode: "solid",
        color: "#009688",
        transparency: 0.9,
        shape: "circle",
        boundingBox: "canvas",
        count: 350,
        minSize: 10,
        maxSize: 48,
        visible: true
    },
    cameraControls: {
        enabled: false,
        enableDamping: true,
        dampingFactor: 0.35,
        enableZoom: false,
        autoRotate: true,
        autoRotateSpeed: 0.1,
        resetCameraFlag: false
    }
};

export default props => (
    <div {...props}>
        <ParticleField config={particleConfig} />
    </div>
);
