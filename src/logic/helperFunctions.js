const randomNumberGenerator = (min, max, amount, recurring = false) => {
  const draw = [];
  if (recurring) {
    while (draw.length < amount) {
      draw.push(min + Math.round(Math.random() * (max - min)));
    }
  } else {
    while (draw.length < amount) {
      let num = min + Math.round(Math.random() * (max - min));
      if (draw.indexOf(num) < 0) draw.push(num);
    }
  }
  return draw;
};

const difference = (setA, setB) => {
  var _difference = new Set(setA);
  for (var elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
};

module.exports = {
  randomNumberGenerator,
  difference
};
