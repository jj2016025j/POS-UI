
import React from 'react';

interface HeaderProps {
  title: string;
}
const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <React.Fragment>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/css/page.css" /> */}
      <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.2.0/uicons-bold-straight/css/uicons-bold-straight.css'>
        {/**for icon https://www.flaticon.com/uicons/get-started*/}
      </link><script src="https://unpkg.com/scrollreveal"></script>
    </React.Fragment >
  );
}

export default Header;
