import React, { useState, useEffect } from 'react';

function typingEffect(texts, updateText, speed = 150, delay = 3000) {
  let count = 0;
  let index = 0;
  let currentText = '';
  let letter = '';

  (function type() {
    if (count === texts.length) {
      count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    updateText(letter);

    if (letter.length === currentText.length) {
      count++;
      index = 0;
      setTimeout(type, delay);
    } else {
      setTimeout(type, speed);
    }
  })();
}

function TypingEffect() {
  const [text, setText] = useState('');
  const texts = ['前端工程師', '後端工程師', '全端工程師', '遊戲開發者', '3D建模師', '人像攝影師'];

  useEffect(() => {
    typingEffect(texts, setText); // 调用纯JavaScript函数
  }, []);

  return <h1 className="note-sans-black fs-1 mt-5 pt-5" id="typing">{text}</h1>;
}

export default TypingEffect;
