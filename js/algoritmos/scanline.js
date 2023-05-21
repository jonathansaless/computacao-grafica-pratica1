// Scanline Fill Algorithm with Critical Points

// Helper function to sort an array of objects based on a property
function sortByProperty(arr, prop) {
  return arr.sort((a, b) => a[prop] - b[prop]);
}

// Function to find the critical points
function findCriticalPoints(vertices) {
  const criticalPoints = [];

  // Iterate through each edge
  for (let i = 0; i < vertices.length; i++) {
    const currentVertex = vertices[i];
    const nextVertex = vertices[(i + 1) % vertices.length];

    // Check if the edge is horizontal
    if (currentVertex.y === nextVertex.y) {
      // Add both vertices as critical points
      criticalPoints.push(currentVertex, nextVertex);
    } else {
      // Calculate the x-coordinate of the edge's intersection with the scanline
      const x = (currentVertex.x * nextVertex.y - nextVertex.x * currentVertex.y) / (currentVertex.y - nextVertex.y);

      // Add the intersection point as a critical point
      criticalPoints.push({ x, y: currentVertex.y });
    }
  }

  // Sort the critical points by their y-coordinate
  return sortByProperty(criticalPoints, 'y');
}

// Function to fill the polygon using scanline algorithm with critical points
function scanlineFillWithCriticalPoints(vertices) {
  // Find the critical points
  const criticalPoints = findCriticalPoints(vertices);

  // Initialize the active edge table
  let activeEdges = [];

  // Iterate through each scanline
  for (let y = criticalPoints[0].y; y < criticalPoints[criticalPoints.length - 1].y; y++) {
    // Add edges from the critical points that are on the current scanline to the active edge table
    for (let i = 0; i < criticalPoints.length; i++) {
      if (criticalPoints[i].y === y) {
        const nextIndex = (i + 1) % criticalPoints.length;
        const edge = {
          ymax: Math.max(criticalPoints[i].y, criticalPoints[nextIndex].y),
          xofymin: criticalPoints[i].y === y ? criticalPoints[i].x : criticalPoints[nextIndex].x,
          slopeinverse: (criticalPoints[nextIndex].x - criticalPoints[i].x) / (criticalPoints[nextIndex].y - criticalPoints[i].y),
        };
        activeEdges.push(edge);
      }
    }

    // Sort the active edges by their x-coordinate
    activeEdges = sortByProperty(activeEdges, 'xofymin');

    // Fill the pixels between pairs of x-coordinates in the active edge table
    for (let i = 0; i < activeEdges.length; i += 2) {
      if (activeEdges[i + 1]) {
        const xStart = Math.ceil(activeEdges[i].xofymin);
        const xEnd = Math.floor(activeEdges[i + 1].xofymin);

        // Fill the pixels between xStart and xEnd on the current scanline
        for (let x = xStart; x <= xEnd; x++) {
          // Log the filled pixel (you can modify this part to perform other operations)
          console.log(`Filled pixel at (${x}, ${y})`);
        }
      }
    }

    // Update the x-coordinate of each active edge
    for (let i = 0; i < activeEdges.length; i++) {
      activeEdges[i].xofymin += activeEdges[i].slopeinverse;
    }

    // Remove edges with ymax = y from the active edge table
    activeEdges = activeEdges.filter(edge => edge.ymax > y);
  }
}

// Example usage:
const vertices = [
  { x: 50, y: 50 },
  { x: 150, y: 100 },
  { x: 200, y: 200 },
  { x: 100, y: 150 },
];

scanlineFillWithCriticalPoints(vertices);
