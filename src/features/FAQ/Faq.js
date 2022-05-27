import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './faq.scss';
import Logo from './../../logo.svg';
import { useEffect, useState } from 'react';

export default function FAQ() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

useEffect(() => {document.title = `Circle - FAQ`}, []);

  return (
    <div className='container-faq'>
      <img src={Logo} alt='logo Circles' className='circle-logo'></img>

      <p className='container-faq__text'>FAQ</p>

      <div className='container-faq__accordion'>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Typography sx={{ width: '100%', flexShrink: 0 }}>
              Qu'est-ce que Circles ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Viens me le dire de profil si t'es un homme !
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2bh-content'
            id='panel2bh-header'
          >
            <Typography sx={{ width: '100%', flexShrink: 0 }}>
              C'est bien Circles ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nul ne peut bafouer l'empire romain ! Quand on l'attaque, l'empire
              contre-attaque !
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel3bh-content'
            id='panel3bh-header'
          >
            <Typography sx={{ width: '100%', flexShrink: 0 }}>
              Oskour, mamie Georgette veut nous rejoindre !
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              - Nouvelle technique : on passe pour des cons, les autres se
              marrent, et on frappe. C’est nouveau. <br />
              - Et les autres font ça aussi ?<br />- Ah non, ça c’est que nous.
              Parce qu’il faut être capable de passer pour des cons en un temps
              record. Ah non, là-dessus on a une avance considérable.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel4bh-content'
            id='panel4bh-header'
          >
            <Typography sx={{ width: '100%', flexShrink: 0 }}>Bonus</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Vous savez, moi je ne crois pas qu'il y ait de bonne ou de
              mauvaise situation. Moi, si je devais résumer ma vie aujourd'hui
              avec vous, je dirais que c'est d'abord des rencontres. Des gens
              qui m'ont tendu la main, peut-être à un moment où je ne pouvais
              pas, où j'étais seul chez moi. Et c'est assez curieux de se dire
              que les hasards, les rencontres forgent une destinée. Parce que
              quand on a le goût de la chose, quand on a le goût de la chose
              bien faite, le beau geste, parfois on ne trouve pas
              l'interlocuteur en face je dirais, le miroir qui vous aide à
              avancer. Alors ça n'est pas mon cas, comme je disais là, puisque
              moi au contraire, j'ai pu : et je dis merci à la vie, je lui dis
              merci, je chante la vie, je danse la vie, je ne suis qu'amour. Et
              finalement, quand beaucoup de gens aujourd'hui me disent « mais
              comment fais-tu pour avoir cette humanité ? », et bien je leur
              réponds très simplement, je leur dis que c'est ce
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

