const withTimeout = async (
  promise,
  ms = 500000
) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new Error("Collector timeout")
        );
      }, ms);
    }),
  ]);
};

export default withTimeout;