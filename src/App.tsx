import Close from 'layout/Close/Close';
import Footer from 'layout/Footer/Footer';
import Header from 'layout/Header/Header';
import Loader from 'layout/Loader/Loader';
import Reasons from 'layout/Reasons/Reasons';
import DefaultStep from 'pages/DefaultStep/DefaultStep';
import React from 'react';
import 'scss/style.scss';
import axios from 'axios';

function App() {

  const [isVisible, setVisibility] = React.useState(true);
  const [loaderVisibility, setLoaderVisibility] = React.useState(true);
  const [step, setStep] = React.useState(0);

  const [numberOfUses, setNumberOfUses] = React.useState(0);
  const [booksData, setBooksData] = React.useState('');
  const [multipierData, setMultipierData] = React.useState('');
  const [deviceAndSkillData, setDeviceAndSkillData] = React.useState('');
  const [infoAboutDisciplines, setInfoAboutDisciplines] = React.useState('');

  const stringParser = (string: string) => {
    return JSON.parse(string);
  }

  React.useEffect(() => {
    const getData = async () => {
      const comparisonData = await axios.get('https://najlepsibukmacherzy.pl/wp-json/wp/v2/polaspecjalne/8689/');
      const numberOfUsesDB = await axios.get('https://najlepsibukmacherzy.pl/wp-json/wp/v2/polaspecjalne/6324/');

      setNumberOfUses(Number(numberOfUsesDB.data.porownywarka_licznik));
      setBooksData(stringParser(comparisonData.data.dane_bukow));
      setMultipierData(stringParser(comparisonData.data.mnozniki_dodatkow));
      setDeviceAndSkillData(stringParser(comparisonData.data.urzadzenie_i_skill));
      setInfoAboutDisciplines(stringParser(comparisonData.data.dyscypliny_punkty));

      setLoaderVisibility(false);
    }

    getData();
  }, [])

  return (
    <div className="modal-comparison">
      <button className="warranty__button clicker b1" onClick={() => setVisibility(true)}>Odpal modal</button>
      {isVisible && <div className="comparison">
        <Loader 
          loaderVisibility={loaderVisibility}
        />
        <Close handleClose={() => setVisibility(false)}/>
        <Header />
        <Reasons />
        <DefaultStep step={step}/>
        <Footer />
      </div>}
    </div> 
  );
}

export default App;
