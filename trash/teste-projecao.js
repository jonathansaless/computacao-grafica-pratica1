function projectPerspective(object, camera) {
    // Aplicar transformações de rotação, escala, etc., se necessário
  
    // Aplicar projeção perspectiva
    const projectedPoints = [];
    for (let i = 0; i < object.length; i++) {
      const point = object[i];
      const x = point.x;
      const y = point.y;
      const z = point.z;
  
      const projectedX = (camera.focalLength * x) / z;
      const projectedY = (camera.focalLength * y) / z;
  
      projectedPoints.push({ x: parseInt(projectedX), y: parseInt(projectedY) });
    }
    return projectedPoints;
  }


  function projectOrthographic(object) {
    // Aplicar transformações de rotação, escala, etc., se necessário
  
    // Aplicar projeção ortogonal
    const projectedPoints = [];
    for (let i = 0; i < object.length; i++) {
      const point = object[i];
      const x = point.x;
      const y = point.y;
      const z = point.z;
  
      const projectedX = x;
      const projectedY = y;
  
      projectedPoints.push({ x: projectedX, y: projectedY });
    }
  
    return projectedPoints;
  }
  
  
// Definir o objeto 3D
const object3D = [
    { x: 1, y: 2, z: 5 },
    { x: -3, y: 1, z: 4 },
    { x: 2, y: 4, z: 8 },
  ];
  
  // Definir a câmera
  const camera = {
    focalLength: 50,
  };
  
  // Aplicar projeção perspectiva
  const projectedPoints = projectPerspective(object3D, camera);
  
  console.log(projectedPoints);  