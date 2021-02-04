import React, { useState, useEffect } from "react";

export default () => {
  // Set up audio context

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  let currentBuffer = null;

  const visualize = (audioBuffer) => {
    // draw(normalizeData(filterData(audioBuffer)))
    let normalizedData = normalizeData(filterData(audioBuffer));
    const { ctx, canvas } = draw(normalizedData);
    draw2(ctx, canvas, normalizedData, 100, 250, "#ef5125");
    // draw2(ctx, canvas, normalizedData, 50, 100)
  };
  const visualizeAudio = (url) => {
    fetch(url)
      .then((response) => {
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => {
        return audioContext.decodeAudioData(arrayBuffer);
      })
      .then((audioBuffer) => {
        return visualize(audioBuffer);
      });
  };

  const filterData = (audioBuffer, samples = 2000) => {
    const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
    // const samples; // Number of samples we want to have in our final data set
    const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      let blockStart = blockSize * i; // the location of the first sample in the block
      // let sum = 0;
      let min = 0;
      let min_counts = 0;
      let max = 0;
      let max_counts = 0;
      for (let j = 0; j < blockSize; j++) {
        if (rawData[blockStart + j] < 0) {
          min += rawData[blockStart + j];
          min_counts += 1;
        } else if (rawData[blockStart + j] > 0) {
          max += rawData[blockStart + j];
          max_counts += 1;
        }
        // sum = sum + Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
      }
      filteredData.push({ min: min / min_counts, max: max / max_counts }); // divide the sum by the block size to get the average
    }
    return filteredData;
  };

  const normalizeData = (filteredData) => {
    const multiplier = Math.pow(
      Math.max(
        ...filteredData.map((i) => i.max),
        ...filteredData.map((i) => -1 * i.min)
      ),
      -1
    );
    return filteredData.map((n) => {
      return { min: n.min * multiplier, max: n.max * multiplier };
    });
  };
  const draw = (normalizedData) => {
    // Set up the canvas
    const canvas = document.querySelector("canvas");
    const dpr = window.devicePixelRatio || 1;
    const padding = 20;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.translate(0, canvas.offsetHeight / 2 + padding); // Set Y = 0 to be in the middle of the canvas
    // draw the line segments
    const width = canvas.offsetWidth / normalizedData.length;
    for (let i = 0; i < normalizedData.length; i++) {
      const x = width * i;
      let min = normalizedData[i].min * canvas.offsetHeight + padding;
      let max = normalizedData[i].max * canvas.offsetHeight - padding;
      let color = normalizedData[i];
      drawLineSegment(ctx, x, min, max, width);
    }
    return { ctx, canvas };
  };
  const draw2 = (
    ctx,
    canvas,
    normalizedData,
    start,
    end,
    color = "#ffffff"
  ) => {
    // Set up the canvas

    const padding = 20;
    // draw the line segments
    const width = canvas.offsetWidth / normalizedData.length;

    // clear old lines
    ctx.clearRect(
      (start - 0.5) * width,
      -1 * canvas.offsetHeight,
      (end - start) * width,
      2 * canvas.offsetHeight
    );

    for (let i = start; i < end; i++) {
      const x = width * i;
      let min = normalizedData[i].min * canvas.offsetHeight + padding;
      let max = normalizedData[i].max * canvas.offsetHeight - padding;
      drawLineSegment(ctx, x, min, max, width, color);
    }
  };

  const drawLineSegment = (ctx, x, y1, y2, width, color = "#ffffff") => {
    width = width * 1.01;
    ctx.fillStyle = color;
    ctx.fillRect(x - width / 2, y1, width, y2 - y1);

    // ctx.lineWidth = 1; // how thick the line is
    // ctx.lineWidth = width * 1
    // ctx.strokeStyle = color; // what color our line is
    // ctx.beginPath();
    // ctx.moveTo(x, y1);
    // ctx.lineTo(x, y2);
    // ctx.stroke();
  };

  useEffect(() => {
    //visualizeAudio(`/test.mp3`)
    visualizeAudio("test2.mp3");
  }, []);
  const playAudio = () => {
    let audio = new Audio("test2.mp3");
    audio.play();
  };

  return (
    <div>
      <p>this is a dyna 2</p>
      <canvas></canvas>
      <button onClick={playAudio}>Play</button>
    </div>
  );
};
