import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Navigate as navigate } from 'react-big-calendar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function ViewNamesGroup({ views: viewNames, view, messages, onView }) {
  return viewNames.map((name) => (
    <button
      type='button'
      key={name}
      className={clsx({ 'rbc-active': view === name })}
      onClick={() => onView(name)}
    >
      {messages[name]}
    </button>
  ));
}
ViewNamesGroup.propTypes = {
  messages: PropTypes.object,
  onView: PropTypes.func,
  view: PropTypes.string,
  views: PropTypes.array,
};


export default function CustomToolbar({
  // date, // available, but not used here
  label,
  localizer: { messages },
  onNavigate,
  onView,
  view,
  views,
}) {
  return (
    <div className="rbc-toolbar"
    style={{padding:'1rem',
    
}}>

      <span className="rbc-btn-group" style={{
        display:'flex',
        justifyContent:'space-around',
        width:'100%'
      }}>
        <button
          type='button'
          onClick={() => onNavigate(navigate.PREVIOUS)}
          aria-label={messages.previous}
          style={{
            border:'none'
          }}
        >

          <ChevronLeftIcon sx={{fontSize: '2rem'}}/>
        </button>

        <span className="rbc-toolbar-label" style={{
          fontSize:'1.8rem',
          fontWeight:'bold'
        }}>{label}</span>
        
        <button
          type='button'
          onClick={() => onNavigate(navigate.NEXT)}
          aria-label={messages.next}
          style={{
            border:'none',
          }}
        >
          <ChevronRightIcon sx={{fontSize: '2rem'}}/>
        </button>
      </span>
    </div>
  );
}
CustomToolbar.propTypes = {
  date: PropTypes.instanceOf(Date),
  label: PropTypes.string,
  localizer: PropTypes.object,
  messages: PropTypes.object,
  onNavigate: PropTypes.func,
  onView: PropTypes.func,
  view: PropTypes.string,
  views: PropTypes.array,
};
