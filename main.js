const deleteAllTweets = async () => {
  const processedButtons = new Set();
  const getDeleteButtons = () => Array.from(document.querySelectorAll('[data-testid="tweet"] [data-testid="caret"]'));
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  while (true) {
    await delay(2000);
    let deleteButtons = getDeleteButtons().filter(button => !processedButtons.has(button));
    if (deleteButtons.length === 0) {
      window.scrollTo(0, document.body.scrollHeight);
      await delay(3000);
      deleteButtons = getDeleteButtons().filter(button => !processedButtons.has(button));
      if (deleteButtons.length === 0) {
        await delay(1000*30*60); // wait 30 minutes
        continue;
      }
    }
    for (const button of deleteButtons) {
      await delay(2000);
      processedButtons.add(button);
      button.click();
      await delay(1000);

      const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
      const deleteOption = menuItems.find(item => item.textContent === 'Delete');

      if (deleteOption) {
        deleteOption.click();
        await delay(2000);
        document.querySelector('[data-testid="confirmationSheetConfirm"]')?.click();
      } else {
        const tweetContainer = button.closest('[data-testid="tweet"]');
        const unretweetButton = tweetContainer?.querySelector('[data-testid="unretweet"]');

        if (unretweetButton) {
          unretweetButton.click();
          await delay(2000);
          document.querySelector('[data-testid="unretweetConfirm"]')?.click();
        }
      }
    }
  }

  console.log('All tweets deleted successfully!');
};

deleteAllTweets();
