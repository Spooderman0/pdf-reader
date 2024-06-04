import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MindMap = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // Clear previous rendering

    const width = 500;
    const height = 500;

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([width, height]);

    treeLayout(root);

    const linkGenerator = d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x);

    svg.append('g')
      .selectAll('path')
      .data(root.links())
      .enter()
      .append('path')
      .attr('d', linkGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#555');

    svg.append('g')
      .selectAll('circle')
      .data(root.descendants())
      .enter()
      .append('circle')
      .attr('cx', d => d.y)
      .attr('cy', d => d.x)
      .attr('r', 5)
      .attr('fill', '#999');

    svg.append('g')
      .selectAll('text')
      .data(root.descendants())
      .enter()
      .append('text')
      .attr('x', d => d.y + 10)
      .attr('y', d => d.x + 5)
      .text(d => d.data.name)
      .attr('font-size', '12px')
      .attr('fill', '#333');
  }, [data]);

  return <svg ref={ref} width="500" height="500"></svg>;
};

export default MindMap;
