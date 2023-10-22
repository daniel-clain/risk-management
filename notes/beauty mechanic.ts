/* 
when you give people an opportunity in game to express their creativity and uniquness, they take it, but its hard to design for.
  - i think the key way to make beaty/design/creativity/original-thinking a true mechanic, is if other players are the judge, as opposed an algorithm. 
    ~ for this reason maybe leave the beauty mechanic for a later iteration
*/

interface ObjectProperties {
  symmetry: number;
  harmony: number;
  colorfulness: number;
  complexity: number;
}

function assessBeauty(object: ObjectProperties): string {
  const symmetryScore = object.symmetry;
  const harmonyScore = object.harmony;
  const colorfulnessScore = object.colorfulness;
  const complexityScore = object.complexity;

  // Define thresholds for beauty and ugliness
  const beautyThreshold = 0.6; // Adjust as needed
  const uglinessThreshold = 0.4; // Adjust as needed

  // Calculate an overall beauty score based on the properties
  const overallBeautyScore =
    (symmetryScore + harmonyScore + colorfulnessScore) / 3;

  if (overallBeautyScore >= beautyThreshold) {
    return "Beautiful and Harmonious";
  } else if (overallBeautyScore <= uglinessThreshold) {
    return "Ugly and Dissonant";
  } else {
    return "Somewhere in between";
  }
}

// Example object properties
const object1: ObjectProperties = {
  symmetry: 0.8,
  harmony: 0.7,
  colorfulness: 0.6,
  complexity: 0.5,
};

const object2: ObjectProperties = {
  symmetry: 0.3,
  harmony: 0.4,
  colorfulness: 0.2,
  complexity: 0.8,
};

console.log("Object 1 is:", assessBeauty(object1));
console.log("Object 2 is:", assessBeauty(object2));
