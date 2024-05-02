import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const WordCloud = ({ words }) => {
  const wordCloudRef = useRef();
  const maxWordsToShow = 50; // Limita el número máximo de palabras a mostrar
  //const minimumWordFrequency = 3; // Muestra solo palabras con una frecuencia mayor a este valor
  //const minimumWordFrequency = 0.0001;
  //const colorScale = d3.scaleSequential().interpolator(d3.interpolateBlues).domain([0, 1]);
  


  useEffect(() => {
    if (words.length && wordCloudRef.current) {
      //const scale = Math.min(wordCloudRef.current.parentElement.offsetWidth, wordCloudRef.current.parentElement.offsetHeight) / 500;
      //console.log(scale)

      const filteredWords = words
        //.filter(word => word.value >= minimumWordFrequency)
        .sort((a, b) => b.value - a.value)
        .slice(0, maxWordsToShow);

      //console.log('las filtered words son', filteredWords)

      const layout = cloud()
        .size([
          wordCloudRef.current.parentElement.offsetWidth - 8,
          wordCloudRef.current.parentElement.offsetHeight -20
        ])
        .words(filteredWords.map(word => ({ text: word.text, size: (0.9999 - word.value[0]) * 25 })))
        //.words(filteredWords.map(word => ({ text: word.text, size: (0.9999 - word.value[0]) * 40 })))
        .padding(3)
        .rotate(0)
        .fontSize(d => (d.size) - 6)
        //.fontSize(d => (d.size) * scale)
        .spiral('archimedean')
        .on('end', draw);

      console.log('las words', layout.words())

      layout.start();

      function draw(words) {
        d3.select(wordCloudRef.current).selectAll('*').remove(); // Limpia el SVG anterior
        const group = d3.select(wordCloudRef.current)
          .append('g')
          //.attr('transform', `translate(${(layout.size()[0])/ 2},${(layout.size()[1]) / 2})`);
          .attr('transform', `translate(${(layout.size()[0] - 25)/ 2},${(layout.size()[1] - 10) / 2})`); //se ve un poco mejor segun yo

        group.selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('fill', () => `hsl(${Math.random() * 60 + 200},100%,${Math.random() * 60 + 20}%)`)
          //.style('text-shadow', '1px 1px 2px rgba(0,0,0,0.5)')
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