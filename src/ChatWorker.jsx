self.addEventListener('message', (event) => {
  const getAnswer = (data) => {
    // Your logic here
    return "The answer is 42";
  }

  const { data } = event;
  const answer = getAnswer(data);
  self.postMessage(answer);
});
