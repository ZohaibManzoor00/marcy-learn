'use client'
import { Player } from '@lordicon/react';
import { useRef } from 'react';

const ICON = require('../assets/trash-bin.svg');

export default function AnimatedIcon() {    
  const playerRef = useRef<Player>(null);
  
  const onPlayPress = () => {
    playerRef.current?.playFromBeginning();
  }

  return (
    <Player 
      ref={playerRef} 
      icon={ ICON }
    />
  );
}