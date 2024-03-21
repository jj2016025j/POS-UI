import React from 'react';
import ReactDOM from 'react-dom/client';

class DisplayArea extends React.Component {
  render() {
    return (
      <div>
        <Display/>
        <Display/>
        <Display/>
      </div>
    );
  }
}

function Display() {
    return (
      <div>
        <h1>我是作品標題</h1>
        <p>我是作品描述</p>
      </div>
    );
  }

  let root = ReactDOM.createRoot(document.getElementById('nav'));
root.render(<DisplayArea />);
export default DisplayArea;