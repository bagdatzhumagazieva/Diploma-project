import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { playGame } from 'src/store/game/api';
import { LOCAL_STORAGE } from 'src/core/store/values';

function PlayGame() {

  const { id } = useParams();
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) || '';
  const [gameResponse, setGameResponse] = useState<string>();

  useEffect(() => {
    if (id && token) {
      playGame(+id, token).then(
        response => response.text(),
      ).then(
        html => setGameResponse(html),
      );
    }
  },        []);

  return (
    <div>
      {gameResponse && <div dangerouslySetInnerHTML={{ __html: gameResponse }} className="inner-html" />}
    </div>
  );
}

export default PlayGame;
