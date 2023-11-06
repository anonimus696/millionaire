import { useEffect, useState } from "react"
import useSound from "use-sound";
import play from '../sounds/src_sounds_play.mp3'
import correct from '../sounds/src_sounds_correct.mp3'
import win from '../sounds/win.mp3'

export default function Quiz({
    data,
    setStop,
    questionNumber,
    setQuestionNumber
}) {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState('answer');
    const [isAnswerDisabled, setIsAnswerDisabled] = useState(false);//!

    const [correctAnswer] = useSound(correct);
    const [letsPlay] = useSound(play);
    const [letswin] = useSound(win);



    useEffect(() => {
        letsPlay();
    }, [letsPlay])



    useEffect(() => {
        setQuestion(data[questionNumber - 1])
        setIsAnswerDisabled(false);//!
    }, [data, questionNumber])

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    }

    const handleClick = (a) => {
        if (!isAnswerDisabled) {
            setSelectedAnswer(a);
            setClassName('answer active');
            setIsAnswerDisabled(true); // Заблокувати варіанти відповідей після кліку

            delay(1000, () =>
                setClassName(a.correct ? "answer correct" : "answer wrong")
            );

            delay(3000, () => {
                if (a.correct) {
                    questionNumber === data.length ? letswin() : correctAnswer();
                    delay(1000, () => {
                        setQuestionNumber((p) => p + 1);
                        setSelectedAnswer(null);
                        setIsAnswerDisabled(false); // Розблокувати варіанти відповідей після відповіді
                    });
                } else {
                    delay(1000, () => {
                        setStop(true);
                    });
                }
            });
        }
    };

    return (
        <div className="quiz">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((a) => (
                    <div className={selectedAnswer === a ? className : "answer"}
                        onClick={() => handleClick(a)} >
                        {a.text}
                    </div>
                ))}

            </div>
        </div >
    )
}
