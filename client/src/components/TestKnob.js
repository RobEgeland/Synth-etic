// can possibly use this for OSC slider???
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { fromEvent, merge } from "rxjs";
import { switchMap, takeUntil, map } from "rxjs/operators";

const VolumeWrapper = styled.div`
  position: relative;
  background: lightgray;
  height: 8px;
  width: 100px;
  border-radius: 5px;
`;

const Padding = styled.div`
  height: 20px;
  top: -5px;
  width: 100%;
  position: absolute;
`;

const Progress = styled.div`
  position: absolute;
  width: 100%;
  background-color: #0000cd;
  transform: scaleX(${props => props.value});
  transform-origin: 0 0;
  direction: ltr;
  left: 0;
  top: 0;
  height: 8px;
  border-radius: 5px;
`;

const Thumb = styled.span`
  position: absolute;
  left: -10px;
  width: 20px;
  height: 20px;
  background-color: white;
  top: -6px;
  box-shadow: 0 1px 2px 1px gray;
  border-radius: 50%;
  transform: translateX(${props => props.thumbPosition}px);
`;

const TestKnob = () => {
  const volumeRef = useRef(null);
  const [volume, setVolume] = useState(0);
  const [thumbPos, setThumPos] = useState(0);

  useEffect(() => {
    const { current: ref } = volumeRef;
    const end$ = merge(fromEvent(ref, "mouseup"), fromEvent(window, "mouseup"));
    const mousemove$ = fromEvent(ref, "mousemove").pipe(takeUntil(end$));
    const mouseDown$ = fromEvent(ref, "mousedown").pipe(
      switchMap(() => mousemove$),
      map(e => e.offsetX / ref.clientWidth),
      map(ratio => Math.min(Math.max(ratio, 0), 1))
    );
    const draggingSub = mouseDown$.subscribe(ratio => {
      setVolume(ratio);
      setThumPos(ratio * ref.clientWidth);
    });
    return () => {
      draggingSub.unsubscribe();
    };
  }, []);

  return (
    <VolumeWrapper>
        <Progress value={volume} />
        <Thumb  thumbPosition={thumbPos} />
        <Padding ref={volumeRef} />
    </VolumeWrapper>
  );
};

export default TestKnob