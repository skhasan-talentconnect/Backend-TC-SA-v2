export const getEntryPage = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Synzy Server</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #FFD600, #FFEA00);
          color: #444;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100vh;
          margin: 0;
          text-align: center;
        }
        h1 {
          font-size: 3.2em;
          font-weight: 700;
          margin-bottom: 0.3em;
          color: #fff;
          letter-spacing: 1px;
        }
        p {
          font-size: 1.2em;
          opacity: 0.9;
        }
      </style>
    </head>
    <body>
      <h1>🚀 Synzy is Live</h1>
      <p>Synzy server is running successfully.</p>
    </body>
    </html>
  `;
};