import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MindMap = ({ data, zoomLevel, width, height }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // Clear previous rendering

    const root = d3.hierarchy(data);

    const treeLayout = d3.tree().size([height, width]);

    treeLayout(root);

    // root.x = 100;

    const linkGenerator = d3.linkHorizontal()
      // .x(d => d.y)
      .x(d => d.y)
      .y(d => d.x-300);

    const g = svg.append('g');

    g.append('g')
      .selectAll('path')
      .data(root.links())
      .enter()
      .append('path')
      .attr('d', linkGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#555');

    g.append('g')
      .selectAll('circle')
      .data(root.descendants())
      .enter()
      .append('circle')
      .attr('cx', d => d.y)
      .attr('cy', d => d.x-300)
      .attr('r', 5)
      .attr('fill', '#999');

    g.append('g')
      .selectAll('text')
      .data(root.descendants())
      .enter()
      .append('text')
      .attr('x', d => d.y + 10)
      .attr('y', d => d.x + 4 - 300)
      .text(d => d.data.name)
      .attr('font-size', '12px')
      .attr('fill', '#333')
      .attr('stroke', '#fff')        // Add white stroke for the halo effect
      .attr('stroke-width', 3)       // Set the width of the stroke (halo)
      .attr('paint-order', 'stroke') // Ensure the stroke is painted first to appear behind the text;

    // Compute the bounds of the tree layout
    const x0 = d3.min(root.descendants(), d => d.x);
    const x1 = d3.max(root.descendants(), d => d.x);
    const y0 = d3.min(root.descendants(), d => d.y);
    const y1 = d3.max(root.descendants(), d => d.y);

    // Calculate the initial scale and translation to center the tree
    const initialScale = Math.min(width / (y1 - y0), height / (x1 - x0)) * 0.8; // Scale to fit
    const initialTranslate = [
      1, 
      0.1
    ];
    // const initialTranslate = [
    //   (width - (y1 - y0) * initialScale) / 2, 
    //   (height - (x1 - x0) * initialScale) / 2
    // ];

    // Apply initial translation and scale to center the tree
    g.attr('transform', `translate(${initialTranslate[0]},${initialTranslate[1]}) scale(${initialScale})`);

    // Apply zoom behavior to the SVG element
    const zoom = d3.zoom().on('zoom', (event) => {
      g.attr('transform', event.transform);
    });

    svg.call(zoom).transition().duration(300).call(zoom.scaleTo, zoomLevel);
  }, [data, zoomLevel, width, height]);

  return <svg ref={ref} width={"100%"} height={"100%"}></svg>;
};

export default MindMap;
