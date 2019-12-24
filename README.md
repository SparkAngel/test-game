# test-game
[https://sparkangel.github.io/test-game/] try online

```
const randomNumber = () => { 
    let number = _random(1, 100);

    if (randomNumbers.includes(number)) {
      return  randomNumber();
    } else {
      return setRandom(number),
      setRandomNumbers([...randomNumbers, number]);
    }
  };
```
cначало переделал на эту функцию а потом на ту что сейчас.
И вот я подумал что та что сейчас не смотря на меньший код она более трудозатратнее.
