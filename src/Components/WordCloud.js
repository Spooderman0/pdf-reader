import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import seedrandom from 'seedrandom';

const WordCloud = ({ words, width = 700, height = 500, maxWordsToShow = 50, seed = 'your-seed-value', scale = 3 }) => {
  const wordCloudRef = useRef();

  useEffect(() => {
    if (words.length && wordCloudRef.current) {
      const filteredWords = words
        .sort((a, b) => b.value - a.value)
        .slice(0, maxWordsToShow);

      // Seed the random number generator
      const rng = seedrandom(seed);

      const layout = cloud()
        .size([width, height])
        .words(filteredWords.map((word, index) => ({ text: word.text, size: (0.9999 - word.value[0]) * 35 - index })))
        .padding(3)
        .rotate(() => 0) // or use rng() to add randomness with the seeded generator
        .fontSize(d => d.size )
        .random(() => rng()) // Use the seeded random number generator
        .spiral('archimedean')
        .on('end', draw);

      layout.start();

      function draw(words) {
        d3.select(wordCloudRef.current).selectAll('*').remove(); // Clear previous SVG content

        const svg = d3.select(wordCloudRef.current)
          .attr('width', width)
          .attr('height', height);

        const group = svg.append('g')
          .attr('transform', `translate(${width / 2},${height / 2})`);

        group.selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('fill', () => `hsl(${Math.random() * 60 + 200},100%,${Math.random() * 60 + 20}%)`)
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
          .text(d => d.text);
      }
    }
  }, [words, width, height, maxWordsToShow, seed]);

  return (
      <svg
        ref={wordCloudRef}
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${scale})`,
          transformOrigin: 'center'
        }}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      />
  );
};

export default WordCloud;
