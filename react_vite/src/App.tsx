import React, { useEffect, useState, useMemo, createRef } from "react";
import "./App.css";

const response = await fetch(
	"https://corsproxy.io/?url=https://api.frontendexpert.io/api/fe/wordle-words"
)
	.then(async (res) => {
		const result = await res.json();
		return result;
	})
	.catch((error) => {
		console.error(error);
	});
function App() {
	const [tries, setTries] = useState<string>("");
	const [currentChar, setCurrentChar] = useState<number>(0);
	const [success, setSuccess] = useState<boolean>(false);

	const acceptedKeys = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
	];
	const [todayAnswer, setTodayAnswer] = useState<number>(0);

	useEffect(() => {
		setTodayAnswer(getRandomInt(response.length));
	}, []);

	const triesChars = useMemo(
		() => Array.from({ length: 25 }, () => createRef<HTMLDivElement>()),
		[]
	);

	function Entries() {
		return Array.from({ length: 5 }).map((__, rowIndex) => (
			<div key={rowIndex} className="game-container__entry-row">
				{Array.from({ length: 5 }).map((_, colIndex) => {
					const refIndex = rowIndex * 5 + colIndex;
					return (
						<div
							key={colIndex}
							ref={triesChars[refIndex]}
							className={
								cellState[refIndex] === "correct"
									? "game-container__win game-container__entry-block"
									: cellState[refIndex] === "missed"
									? "game-container__orange game-container__entry-block"
									: "game-container__entry-block"
							}
						>
							{tries[refIndex]}
						</div>
					);
				})}
			</div>
		));
	}

	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}

	const [cellState, setCellState] = useState<{ [index: number]: string }>({});

	// resets focus to last char
	useEffect(() => {
		setCurrentChar(tries.length);

		if (tries.length % 5 == 0) {
			//check if answer is correct
			let currentWord = tries.slice(currentChar - 4, currentChar + 1);
			if (currentWord.toUpperCase() == response[todayAnswer]) {
				setSuccess(true);
			}
			//check if any characters are correct in the wrong place
			const currentChars = currentWord.toUpperCase().split("");
			const answerChars = response[todayAnswer].toUpperCase().split("");
			let correctChars: { [key: string]: number } = {};
			for (let i = 0; i < currentChars.length; i++) {
				for (let j = 0; j < answerChars.length; j++) {
					if (currentChars[j] == answerChars[i]) {
						correctChars[i.toString()] = j;
					}
				}
			}

			const rowIndex = Math.floor((tries.length - 1) / 5);
			const rowStartIndex = rowIndex * 5;

			for (const [key, val] of Object.entries(correctChars)) {
				const k = Number(key) + rowStartIndex;
				const v = Number(val) + rowStartIndex;

				if (Number(key) === val) {
					setCellState((prev) => ({
						...prev,
						[k]: "correct",
					}));
				} else {
					setCellState((prev) => ({
						...prev,
						[v]: "missed",
					}));
				}
			}
		}

		response[todayAnswer].split("").map((c: string) => {});
	}, [tries]);

	window.onkeydown = (e: KeyboardEvent) => {
		if (success) return;
		if (e.key == "Backspace") {
			if (tries.length < 25) setTries(tries.slice(0, tries.length - 1));
		}
		if (tries.length < 25) {
			if (acceptedKeys.includes(e.key)) {
				setTries(tries + e.key.toUpperCase());
			}
		} else {
			const refresh = window.confirm("Game Over, try again " + response[todayAnswer]);
			if (refresh) {
				window.location.reload();
			}
		}
	};

	const [toggleHint, setToggleHint] = useState<boolean>(false);

	function requestNewWord() {
		window.location.reload();
	}

	return (
		<>
			<h1>Wordle</h1>
			<div className="words-list">
				<button
					type="button"
					className="game_btn"
					onClick={() => requestNewWord()}
				>
					🔄
				</button>
				<button
					type="button"
					className="game_btn"
					onClick={() => setToggleHint(!toggleHint)}
				>
					👁️
				</button>
				{response ? "" : "Loading..."}{" "}
				{success ? " - " + response[todayAnswer] : ""}
				{!success && toggleHint
					? response[todayAnswer].slice(0, 3)
					: ""}
			</div>
			<hr />
			<div className="game-container">
				<div className="game-container__entry">
					<Entries />
				</div>
				{success && (
					<>
						<hr className="win_hr" />
						<p></p>
						<div className="game-container__entry">
							<div className="game-container__entry-row">
								{response[todayAnswer]
									.split("")
									.map((c: string, x: number) => (
										<div
											key={x}
											className="game-container__entry-block game-container__win"
										>
											{c}
										</div>
									))}
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default App;
