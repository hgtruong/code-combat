// Function to randomize with option to return integer in multiple of X
const randomizer = (min, max, multiple) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return multiple * Math.floor(Math.random() * (max - min) + min); 
}
export default randomizer;