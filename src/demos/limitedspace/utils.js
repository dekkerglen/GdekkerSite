const copyGrid = (grid) => {
  return [
    ...grid.map((row) => {
      return [...row];
    }),
  ];
};

module.exports = {
  copyGrid,
};
