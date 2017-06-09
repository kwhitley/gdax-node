function determineProductIDs(productIDs) {
  if (!productIDs || !productIDs.length) {
    return ['BTC-USD'];
  }

  if (Array.isArray(productIDs)) {
    return productIDs;
  }

  // If we got this far, it means it's a string.
  // Return an array for backwards compatibility.
  return [productIDs];
}

let clock = (() => {
  const getTime = () => new Date

  return {
    getTime
  }
})()

module.exports = {
  determineProductIDs,
  clock
};
