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

    const linkGenerator = d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x);

    const g = svg.append('g')
      .attr('transform', `scale(${zoomLevel})`);

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
      .attr('cy', d => d.x)
      .attr('r', 5)
      .attr('fill', '#999');

    g.append('g')
      .selectAll('text')
      .data(root.descendants())
      .enter()
      .append('text')
      .attr('x', d => d.y + 10)
      .attr('y', d => d.x + 5)
      .text(d => d.data.name)
      .attr('font-size', '12px')
      .attr('fill', '#333');

    // Apply zoom behavior to the SVG element
    const zoom = d3.zoom().on('zoom', (event) => {
      g.attr('transform', event.transform);
    });

    svg.call(zoom).transition().duration(300).call(zoom.scaleTo, zoomLevel);
  }, [data, zoomLevel, width, height]);

  return <svg ref={ref} width={width} height={height}></svg>;
};

export default MindMap;
