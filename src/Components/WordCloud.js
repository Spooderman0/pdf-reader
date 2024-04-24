import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const WordCloud = ({ words }) => {
  const wordCloudRef = useRef();

  useEffect(() => {
    if (words.length && wordCloudRef.current) {
      const layout = cloud()
        .size([800, 400])
        .words(words.map(word => ({ text: word.text, size: word.value })))
        .padding(5)
        .rotate(0)
        .fontSize(d => d.size)
        .on('end', draw);

      layout.start();

      function draw(words) {
        const group = d3.select(wordCloudRef.current)
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .append('g')
          .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`);

        group.selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => d.size)
          .style('fill', () => `hsl(${Math.random() * 360},100%,50%)`)
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
          .text(d => d.text);
      }
    }
  }, [words]); // Dependencia del efecto, el arreglo de palabras

  return (
    <svg ref={wordCloudRef} />
  );
};

export default WordCloud;
