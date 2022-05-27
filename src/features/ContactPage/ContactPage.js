import { useEffect } from 'react';
import './style.scss';
import logo from './../../logo.svg';
import UserContact from './Segment';
import portraitAlex from '../../assets/images/portrait_alex.jpg';
import portraitElo from '../../assets/images/portrait_elo.jpg';
import portraitLogan from '../../assets/images/portrait_logan.jpg';
import portraitRobin from '../../assets/images/portrait_robin.png';
import portraitMathieu from '../../assets/images/portrait_mathieu.jpg';
import { Link } from 'react-router-dom';

function ContactPage() {
  useEffect(() => {
    document.title = `Circle - Contact`;
  }, []);
  return (
    <div className='container-page-contact overflow-scroll h-[100vh] scrollbar-hide'>
      <Link to='/dashboard'>
        <img
          src={logo}
          alt='Logo Circles'
          className='circle-logo cursor-pointer'
        />
      </Link>
      <h1 className='title'>Contact</h1>
      <div className='container-contacts h-full scrollbar-hide'>
        <UserContact
          sx={{ cursor: 'pointer' }}
          name='Alexandre CREVEL'
          desc='Product Owner'
          portrait={portraitAlex}
          email='alexandre.crevel@outlook.com'
        />
        <UserContact
          name='Elodie BUSTIN'
          desc='Lead Dev Front'
          portrait={portraitElo}
          email='elodie.bustin@lilo.org'
        />
        <UserContact
          name='Logan WILLAUMEZ'
          desc='Git Master of the entire world'
          portrait={portraitLogan}
          email='logan.willaumez@gmail.com'
        />
        <UserContact
          name='Robin POPPEL'
          desc='SCRUM Master'
          portrait={portraitRobin}
          email='poppelrobin@gmail.com'
        />
        <UserContact
          name='Mathieu TOURTE'
          desc='Lead Dev Back'
          portrait={portraitMathieu}
          email='tourte.m@gmail.com'
        />
      </div>
    </div>
  );
}

export default ContactPage;
