import { useEffect, useMemo, useState } from 'react';
import './app.css';
import Quiz from './components/Quiz';
import TImer from './components/Timer';
import Start from './components/Start';

import useSound from "use-sound";
import wait from './sounds/src_sounds_wait.mp3'
import wrong from './sounds/src_sounds_wrong.mp3'


function App() {
  const [waitAnswer, { pause }] = useSound(wait);
  const [wrongAnswer] = useSound(wrong);


  const stopWaitAnswer = () => {
    pause();
  }

  const [username, setUsername] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [stop, setStop] = useState(false)
  const [earned, setEarned] = useState('Nihya :)')
  const data = [
    {
      id: 1,
      question: "Що означає абревіатура 'HTML' у веб-розробці?",
      answers: [
        {
          text: "Високотехнологічна багатомовність",
          correct: false
        },
        {
          text: "Гіпертекстова мова розмітки",
          correct: true
        },
        {
          text: "Мова для тестування гіпертексту",
          correct: false
        },
        {
          text: "Домашній інструмент для ноутбуків",
          correct: false
        }
      ]
    },

    {
      id: 2,
      question: "Як називається культурна столиця України?",
      answers: [
        {
          text: "Київ",
          correct: false
        },
        {
          text: "Одеса",
          correct: false
        },
        {
          text: "Львів",
          correct: true
        },
        {
          text: "Харків",
          correct: false
        }
      ]
    },

    {
      id: 3,
      question: "Ти підар?",
      answers: [
        {
          text: "Так",
          correct: true
        },
        {
          text: "Звичайно",
          correct: true
        },
        {
          text: "100%",
          correct: true
        },
        {
          text: "Це і так всім відомо",
          correct: true
        }
      ]
    },

    {
      id: 4,
      question: "Що таке фотосинтез?",
      answers: [
        {
          text: "Метод фотографування в природному світлі",
          correct: false
        },
        {
          text: "Термін у медицині для зняття шкіри",
          correct: false
        },
        {
          text: "Перетворення рослинами сонячного світла, води і вуглекислого газу",
          correct: true
        },
        {
          text: "Спосіб розведення риби",
          correct: false
        }
      ]
    },

    {
      id: 5,
      question: "Яка річка є найдовшою в Україні?",
      answers: [

        {
          text: "Дунай",
          correct: false
        },
        {
          text: "Прип'ять",
          correct: false
        },
        {
          text: "Дніпро",
          correct: true
        },
        {
          text: "Тисмениця",
          correct: false
        }
      ]
    },

    {
      id: 6,
      question: "Що таке Python?",
      answers: [

        {
          text: "Мова програмування для створення веб-сайтів",
          correct: false
        },
        {
          text: "Високорівнева мова програмування",
          correct: true
        },
        {
          text: "Системний інструмент для вимірювання температури",
          correct: false
        },
        {
          text: "Мова програмування для створення ігор",
          correct: false
        }
      ]
    },

    {
      id: 7,
      question: "Хто є президентом України на момент завершення 2015 року?",
      answers: [
        {
          text: "Михайло Лебігович",
          correct: false
        },
        {
          text: "Це скарб",
          correct: true
        },
        {
          text: "Віктор Якубович",
          correct: false
        },
        {
          text: "Віктор Ющенко",
          correct: false
        }
      ]
    },

    {
      id: 8,
      question: "Молекула води складається з?",
      answers: [

        {
          text: "Трьох атомів водню і двох атомів кисню",
          correct: false
        },
        {
          text: "Двох атомів кисню і одного атома водню",
          correct: false
        },
        {
          text: "П'яти атомів водню і двох атомів кисню",
          correct: false
        },
        {
          text: "Двох атомів водню і одного атома кисню",
          correct: true
        },
      ]
    },

    {
      id: 9,
      question: "Як називається українська національна страва, зазвичай приготовлювана з борошна?",
      answers: [

        {
          text: "Пельмені",
          correct: false
        },
        {
          text: "Вареники",
          correct: true
        },
        {
          text: "Блинчики",
          correct: false
        },
        {
          text: "Млинці",
          correct: false
        }
      ]
    },

    {
      id: 10,
      question: " Що є одним з символів України?",
      answers: [

        {
          text: "Зубрівка",
          correct: false
        },
        {
          text: "Подорожник",
          correct: false
        },
        {
          text: "Тризуб",
          correct: true
        },
        {
          text: "Кропива",
          correct: false
        }
      ]
    },

    {
      id: 11,
      question: "Що таке гора Говерла і де вона знаходиться?",
      answers: [
        {
          text: "Найвища гора в Україні, в Карпатах",
          correct: true
        },
        {
          text: "Гора в Кримських горах",
          correct: false
        },
        {
          text: "Гора в Японських горах",
          correct: false
        },
        {
          text: "Гора в Гімалаях горах",
          correct: false
        }
      ]
    },

    {
      id: 12,
      question: "Яка країна має найбільшу площу серед європейських країн?",
      answers: [

        {
          text: "Франція",
          correct: false
        },
        {
          text: "Україна",
          correct: true
        },
        {
          text: "Іспанія",
          correct: false
        },
        {
          text: "Німеччина",
          correct: false
        }
      ]
    },

    {
      id: 13,
      question: "Коли сталася Чорнобильська катастрофа?",
      answers: [

        {
          text: "в 1987 році",
          correct: false
        },
        {
          text: "в 1981 році",
          correct: false
        },
        {
          text: "в 1984 році",
          correct: false
        },
        {
          text: "в 1986 році",
          correct: true
        },
      ]
    },

    {
      id: 14,
      question: "Хто є найвідомішим українським космонавтом та коли він здійснив свій перший космічний політ?",
      answers: [
        {
          text: "Леонід Каденюк, 1997 рік",
          correct: true
        },
        {
          text: "Валентин Глушко, 1957 рік",
          correct: false
        },
        {
          text: "Леонід Костюк, 1992 рік",
          correct: false
        },
        {
          text: "Леонід Кіндрацький, 1978 рік",
          correct: false
        }
      ]
    },

    {
      id: 15,
      question: "Яке місто є столицею країни Того?",
      answers: [
        {
          text: "Порто-Ново",
          correct: false
        },
        {
          text: "Ломе",
          correct: true
        },
        {
          text: "Котону",
          correct: false
        },
        {
          text: "Абомей-Калаві",
          correct: false
        }
      ]
    }




  ]
  const moneyPyramid = useMemo(() =>
    [
      { id: 1, amount: '$ 100' },
      { id: 2, amount: '$ 200' },
      { id: 3, amount: '$ 300' },
      { id: 4, amount: '$ 500' },
      { id: 5, amount: '$ 1000' },
      { id: 6, amount: '$ 2000' },
      { id: 7, amount: '$ 4000' },
      { id: 8, amount: '$ 8000' },
      { id: 9, amount: '$ 16000' },
      { id: 10, amount: '$ 32000' },
      { id: 11, amount: '$ 64000' },
      { id: 12, amount: '$ 125000' },
      { id: 13, amount: '$ 250000' },
      { id: 14, amount: '$ 500000' },
      { id: 15, amount: '$ 1000000' },
    ].reverse(),
    [])



  useEffect(() => {


    if (questionNumber > data.length) {
      setStop(true);
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount)
    } else {
      questionNumber > 1 && setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount)
    }


  }, [moneyPyramid, questionNumber])


  useEffect(() => {

    if (stop) {
      questionNumber <= data.length && wrongAnswer();
      stopWaitAnswer();
    } else {
      waitAnswer();
    }

  }, [username, questionNumber, stop])

  const resetGame = () => {
    setQuestionNumber(1);
    setStop(false);
    setEarned('Nihya :)');
  }

  return (

    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {stop ?
              (
                <div className="overcontainer">
                  {questionNumber > data.length
                    ?
                    <>
                      <h1 className="gameover">Вітаю {username}</h1>
                      <h2 className="gameover">Ти пройшов рівень для лохов</h2>
                      <h2 className="gameover">І виграв: {earned} </h2>
                    </>
                    :
                    <h1 className="gameover">Ти виграв: {earned} </h1>
                  }
                  <button onClick={resetGame} className="buttonGameover">Спробувати ще</button>
                </div>

              ) : (
                <>
                  <div className="top">
                    <div className="timer"><TImer setStop={setStop} questionNumber={questionNumber} /> </div>
                  </div>
                  <div className="bottom">
                    <Quiz
                      data={data}
                      stop={stop}
                      setStop={setStop}
                      questionNumber={questionNumber}
                      setQuestionNumber={setQuestionNumber}

                    />
                  </div>
                </>
              )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

    </div>
  );
}

export default App;
