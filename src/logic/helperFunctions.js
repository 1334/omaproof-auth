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

module.exports = {
  randomNumberGenerator
};
