// This is a simple example Widget to get you started with Übersicht.
// For the full documentation please visit:
// https://github.com/felixhageloh/uebersicht

// You can modify this widget as you see fit, or simply delete this file to
// remove it.

// this is the shell command that gets executed every time this widget refreshes
import { run } from 'uebersicht'

export const command = "sh top-bar/battery-date-clock.sh";

// the refresh frequency in milliseconds
export const refreshFrequency = 100000;

// the CSS style for this widget, written using Emotion
// https://emotion.sh/
export const className = `
  font-family: "MesloLGS NF";
  font-weight: bold;
  box-sizing: border-box;
  color: rgb(167, 154, 132);
  font-size: 12px;

  .widget {
    width: 100vw;
  }

  .main-container {
    display: flex;
    justify-content: space-between;
    padding: 12px 12px;
  }

  .left {
    display: flex;
    gap: 15px;
  }

  .right,
  .left-nav {
    display: flex;
    gap: 30px;
    background-color: rgb(40, 40, 40);
    border-radius: 25px;
    transition: 0.5s;
  }

  .right {
    padding: 0 15px;
  }

  .left-nav {
    padding: 10px 15px;
  }

  .left .fa-2x {
    font-size: 1.6em;
  }

  .left-nav:hover {
    padding-right: 50px;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 10px;
    pointer-events: auto;
    transition: 0.3s;
  }

  .hoverable:hover {
    transform: scale(1.4);
    filter: saturate(2);
  }

  .music-player {
    background-color: rgb(200 160 80);
    border-radius: 25px;
    color: rgb(40, 40, 40);
    font-size: 1.2em;
    font-family: "Cascadia Code";
    font-weight: 900;
    padding: 12px 15px;
  }

  .green {
    color: rgb(55, 110, 85);
  }

  .purple {
    color: rgb(95, 100, 174);
  }

  .orange {
    color: rgb(200 160 80);
  }
`;

// render gets called after the shell command has executed. The command's output
// is passed in as a string.
export const render = ({ output }) => {
  const json = JSON.parse(output);

  let battery = json.battery;
  battery = battery.split("; ");
  const percentage = battery[0];
  const status = battery[1];

  const date = json.date_day + " " + json.date_month + "/" + json.date_number;
  const clock = json.clock;

  const song_name = json.song_name.split('-');
  console.log(song_name);
  const artist = song_name[0].trim();
  const song = song_name[1].trim();
  console.log(artist, song);
  

  const view = (
    <div className="widget"> 
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
        crossOrigin="anonymous"
      />

      <div className='main-container'>

        <div className="left">
          <div className="music-player">
            <div className="item">
              {'< ' + artist + ' != ' + song + ' >'}
            </div>
          </div>

          <div className="left-nav">
            <div className="item hoverable">
              <i className="fa fa-2x fa-solid fa-house-user orange" title="Home" onClick={
                () => { run('open ~') }
              }></i>
            </div>

            <div className="item hoverable">
              <i className="fa fa-2x fa-solid fa-code purple" onClick={ () => { run('open ~/Development/') } }></i>
            </div>

            <div className="item hoverable">
              <i className="fa fa-2x fa-solid fa-terminal green" onClick={ () => { run('open /Applications/Warp.app') } }></i>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="item">
            <i className="fa fa-2x fa-solid fa-car-battery green"></i>
            <p className="white">{percentage}</p>
          </div>

          <div className="item">
            <i className="fa fa-2x fa-regular fa-calendar purple"></i>
            <p className="white">{date}</p>
          </div>

          <div className="item">
            <i className="fa fa-2x fa-solid fa-clock orange"></i>
            <p className="white">{clock}</p>
          </div>
        </div>

      </div>
    </div>
  );

  return view;
};
