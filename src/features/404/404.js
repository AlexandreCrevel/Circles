import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './../../logo.svg';
import './404.scss';

export const ErrorPage = () => {
  return (
    <div>
      <img src={Logo} alt='logo Circles' className='circle-logo-404'></img>
      <div className='container-svg'>
        <svg
          viewBox='0 0 837 1045'
          width='100%'
          height='100vh'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          xmlnssketch='http://www.bohemiancoding.com/sketch/ns'
        >
          <g
            id='Page-1'
            stroke='none'
            strokeWidth='1'
            fill='none'
            fillRule='evenodd'
            sketchtype='MSPage'
          >
            <circle
              cx='290'
              cy='430'
              r='250'
              stroke='#EA8122' //orange
              id='Polygon-1'
              strokeWidth='6'
              sketchtype='MSShapeGroup'
            ></circle>
            <circle
              cx='650'
              cy='350'
              r='120'
              id='Polygon-2'
              stroke='#EF4A5B' //cercle rouge
              strokeWidth='6'
              sketchtype='MSShapeGroup'
            ></circle>
            <circle
              cx='336'
              cy='816'
              r='108'
              id='Polygon-4'
              stroke='#90C1E0' //bleu
              strokeWidth='6'
              sketchtype='MSShapeGroup'
            ></circle>
            <circle
              cx='350'
              cy='200'
              r='50'
              id='Polygon-3'
              stroke='#795D9C' //violet
              strokeWidth='6'
              sketchtype='MSShapeGroup'
            ></circle>

            <circle
              cx='194'
              cy='553'
              r='95'
              id='Polygon-5'
              stroke='#36B455' //vert
              strokeWidth='6'
              sketchtype='MSShapeGroup'
            ></circle>
            <circle
              cx='550'
              cy='711'
              r='143'
              id='Polygon-6'
              stroke='#FF00FF' //FOF, FOF everywhere
              strokeWidth='6'
              sketchtype='MSShapeGroup'
            ></circle>
          </g>
        </svg>
        <div className='message-box'>
          <h1>404</h1>
          <p>Page not found</p>
          <div className='buttons-con'>
            <div className='action-link-wrap'>
              <Link to='/' className='link-button'>
                Go to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
