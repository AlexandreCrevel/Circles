import './style.scss';

function UserContact({ name, desc, portrait, email }) {
  return (
    <div className='contact '>
      <img
        src={portrait}
        alt={'Photo de profil de ' + name}
        className='contact--portrait'
      />
      <h2 className='contact--name'>{name}</h2>
      <p className='contact--desc'>{desc}</p>
      <a className='contact--button cursor-pointer' href={'mailto:' + email}>
        Contacter par mail
      </a>
    </div>
  );
}

export default UserContact;
