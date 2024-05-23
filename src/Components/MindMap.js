import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const MindMap = ({ terms = [], connections = [] }) => {
  const svgRef = useRef(null);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (terms.length && svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // Limpiar el SVG antes de dibujar

      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;

      const simulation = d3.forceSimulation(terms)
        .force('charge', d3.forceManyBody().strength(-200))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(50))
        .on('tick', () => {
          svg.selectAll('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

          svg.selectAll('text')
            .attr('x', d => d.x)
            .attr('y', d => d.y);

          svg.selectAll('line')
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

          const bbox = svg.node().getBBox();
          setSvgSize({ width: bbox.width, height: bbox.height });
        });

      const links = svg.selectAll('line')
        .data(connections)
        .enter()
        .append('line')
        .attr('stroke', '#ccc');

      const nodes = svg.selectAll('rectangule')
        .data(terms)
        .enter()
        .append('circle')
        .attr('r', 20)
        .attr('fill', '#69b3a2');

      const labels = svg.selectAll('text')
        .data(terms)
        .enter()
        .append('text')
        .text(d => d.text)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em');

      return () => {
        simulation.stop();
      };
    }
  }, [terms, connections]);

  return <svg ref={svgRef} width={svgSize.width} height={svgSize.height} />;
};

export default MindMap;
