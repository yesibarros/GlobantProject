const orderByMatch = (matchArr, userProfile, areas, technologies) => {
  matchArr.forEach((candidate) => {
    candidate.score = 0;
    console.log(candidate)
    if (
      candidate.location._id.toString() == userProfile.location.toString()
    ) {
      candidate.score++;
    }
    for (let element in candidate.areas) {
      if (areas.includes(candidate.areas[element]._id.toString())) {
        candidate.score += 2;
        // candidate.score += candidate.areas[element].areaWeight;
      }
    }

    for (let element in candidate.technologies) {
      if (
        technologies.includes(candidate.technologies[element]._id.toString())
      ) {
        candidate.score++;
        // candidate.score += candidate.technologies[element].technologyWeight;
      }
    }
  });

  return matchArr.sort((a, b) => b.score - a.score);
};

module.exports = orderByMatch;
