function x_intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    const num = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    return num / den;
  }
  
  function y_intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    const num = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    return num / den;
  }
  
  function clip(poly_points, poly_size, x1, y1, x2, y2) {
    const new_points = [];
    let new_poly_size = 0;
  
    for (let i = 0; i < poly_size; i++) {
      const k = (i + 1) % poly_size;
      const ix = poly_points[i][0];
      const iy = poly_points[i][1];
      const kx = poly_points[k][0];
      const ky = poly_points[k][1];
  
      const i_pos = (x2 - x1) * (iy - y1) - (y2 - y1) * (ix - x1);
      const k_pos = (x2 - x1) * (ky - y1) - (y2 - y1) * (kx - x1);
  
      if (i_pos < 0 && k_pos < 0) {
        new_points.push([kx, ky]);
        new_poly_size++;
      } else if (i_pos >= 0 && k_pos < 0) {
        const new_x = x_intersect(x1, y1, x2, y2, ix, iy, kx, ky);
        const new_y = y_intersect(x1, y1, x2, y2, ix, iy, kx, ky);
        new_points.push([new_x, new_y]);
        new_poly_size++;
        new_points.push([kx, ky]);
        new_poly_size++;
      } else if (i_pos < 0 && k_pos >= 0) {
        const new_x = x_intersect(x1, y1, x2, y2, ix, iy, kx, ky);
        const new_y = y_intersect(x1, y1, x2, y2, ix, iy, kx, ky);
        new_points.push([new_x, new_y]);
        new_poly_size++;
      }
    }
  
    poly_points.length = 0;
    for (let i = 0; i < new_poly_size; i++) {
      poly_points.push(new_points[i]);
    }
    poly_size = new_poly_size;
  
    return poly_points;
  }
  
  function suthHodgClip(poly_points, poly_size, clipper_points, clipper_size) {
    for (let i = 0; i < clipper_size; i++) {
      const k = (i + 1) % clipper_size;
      poly_points = clip(
        poly_points,
        poly_size,
        clipper_points[i][0],
        clipper_points[i][1],
        clipper_points[k][0],
        clipper_points[k][1]
      );
      poly_size = poly_points.length;
    }
  
    for (let i = 0; i < poly_size; i++) {
      console.log(`(${poly_points[i][0]}, ${poly_points[i][1]})`);
    }
  }
  
  function main() {
    const poly_points = [[100, 150], [200, 250], [300, 200]];
    const poly_size = poly_points.length;
  
    const clipper_points = [[150, 150], [150, 200], [200, 200], [200, 150]];
    const clipper_size = clipper_points.length;
  
    suthHodgClip(poly_points, poly_size, clipper_points, clipper_size);
  }
  
  main();
  