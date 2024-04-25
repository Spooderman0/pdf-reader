import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const WordCloud = ({ words }) => {
  const wordCloudRef = useRef();
  const maxWordsToShow = 30; // Limita el número máximo de palabras a mostrar
  const minimumWordFrequency = 3; // Muestra solo palabras con una frecuencia mayor a este valor

  useEffect(() => {
    if (words.length && wordCloudRef.current) {
      const filteredWords = words
        .filter(word => word.value >= minimumWordFrequency)
        .sort((a, b) => b.value - a.value)
        .slice(0, maxWordsToShow);

      const layout = cloud()
        .size([
          wordCloudRef.current.parentElement.offsetWidth,
          wordCloudRef.current.parentElement.offsetHeight
        ])
        .words(filteredWords.map(word => ({ text: word.text, size: word.value })))
        .padding(5)
        .rotate(0)
        .fontSize(d => d.size * 2) // Puedes ajustar el factor de escala según sea necesario
        .on('end', draw);

      layout.start();

      function draw(words) {
        d3.select(wordCloudRef.current).selectAll('*').remove(); // Limpia el SVG anterior
        const group = d3.select(wordCloudRef.current)
          .append('g')
          .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`);

        group.selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('fill', () => `hsl(${Math.random() * 360},100%,50%)`)
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
          .text(d => d.text);
      }
    }
  }, [words]);

  return (
    <svg ref={wordCloudRef} style={{ width: '100%', height: '100%' }} />
  );
};


export default WordCloud;