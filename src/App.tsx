import { useEffect, useMemo } from "react";
import useStateRef from "react-usestateref";
import "./App.css";

function App() {
  const WORD = "astor";
  const KEYS = "qwertyuiopasdfghjklñzxcvbnm";

  const [words, setWords, wordsRef] = useStateRef([
    [
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
    ],
    [
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
    ],
    [
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
    ],
    [
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
    ],
    [
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
    ],
    [
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
      {
        letter: "",
        className: "",
      },
    ],
  ]);

  const [_, setActivePos, activePosRef] = useStateRef({
    word: 0,
    letter: 0,
  });

  const wordLength = useMemo(() => {
    return words[0].length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onKeyClick(e: any) {
    if (
      words[activePosRef.current.word].filter(({ letter }) => letter !== "")
        .length < wordLength
    ) {
      addLetterToWord(e.target.textContent);
    }
  }

  function onKeyDown(e: any) {
    if (e.key === "Backspace") {
      removeLetterFromWord();
      return;
    }

    if (!KEYS.includes(e.key)) return;

    if (
      words[activePosRef.current.word].filter(({ letter }) => letter !== "")
        .length < wordLength
    ) {
      addLetterToWord(e.key);
    }
  }

  function addLetterToWord(letter: string) {
    const _words = words;
    _words[activePosRef.current.word][activePosRef.current.letter].letter =
      letter;

    setWords(_words);
    setActivePos((_activePos) => ({
      ..._activePos,
      letter: Math.min(activePosRef.current.letter + 1, wordLength - 1),
    }));
  }

  function removeLetterFromWord() {
    const _words = words;
    _words[activePosRef.current.word][activePosRef.current.letter].letter = "";

    setWords(_words);
    setActivePos((_activePos) => ({
      ..._activePos,
      letter: Math.max(activePosRef.current.letter - 1, 0),
    }));
  }

  function submitWord() {
    const _currentWord = words[activePosRef.current.word]
      .map((word) => word.letter)
      .join("");

    // Verify each letter in word only if _currentWord length === wordLength
    if (_currentWord.length === wordLength) {
      const _words = words;

      _currentWord.split("").forEach((letter, index) => {
        // Letter is present in the WORD
        if (WORD.includes(letter)) {
          if (WORD[index] === letter) {
            // Letter is on the correct position in the word
            _words[activePosRef.current.word][index].className =
              "letter-correct";
          } else {
            // Letter is on the incorrect position in the word
            _words[activePosRef.current.word][index].className =
              "letter-present";
          }
        } else {
          // Letter is NOT present in the WORD
          _words[activePosRef.current.word][index].className = "letter-absent";
        }
      });

      setWords(_words);
      setActivePos((_activePos) => ({
        letter: 0,
        word: activePosRef.current.word + 1,
      }));
    }
  }

  return (
    <div className="App">
      <header className="header">
        <h1 className="header-title">Wordle Clone</h1>
      </header>

      <main className="container">
        <div className="words">
          {wordsRef.current.map((word, index) => (
            <div className="word" key={`word-${index}`}>
              {word.map(({ letter, className }, index) => (
                <div
                  className={`letter uppercase bold ${
                    letter ? "letter-active" : ""
                  } ${className}`}
                  key={`letter-${index}`}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="keyboard">
          <div className="keyboard-row">
            <div className="key uppercase bold" onClick={onKeyClick}>
              q
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              w
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              e
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              r
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              t
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              y
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              u
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              i
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              o
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              p
            </div>
          </div>
          <div className="keyboard-row">
            <div className="key uppercase bold" onClick={onKeyClick}>
              a
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              s
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              d
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              f
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              g
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              h
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              j
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              k
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              l
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              ñ
            </div>
          </div>
          <div className="keyboard-row">
            <div className="key uppercase bold" onClick={submitWord}>
              Enviar
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              z
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              x
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              c
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              v
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              b
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              n
            </div>
            <div className="key uppercase bold" onClick={onKeyClick}>
              m
            </div>
            <div className="key uppercase bold" onClick={removeLetterFromWord}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                width="28"
                height="28"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
