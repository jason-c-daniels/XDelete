Script to delete all X / Twitter tweets. (Credits go to ChatGPT, I didn't write any of this code)

### How to run:
- Open Chrome and go to your X profile (https://x.com/USERNAME/with_replies)
- Open Chrome Developer Console. Copy/Paste the code:

```
const deleteAllTweets = async () => {
  const processedButtons = new Set();
  const getDeleteButtons = () => Array.from(document.querySelectorAll('[data-testid="tweet"] [data-testid="caret"]'));
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  while (true) {
    await delay(750);
    let deleteButtons = getDeleteButtons().filter(button => !processedButtons.has(button));
    if (deleteButtons.length === 0) {
      window.scrollTo(0, document.body.scrollHeight);
      await delay(1500);
      deleteButtons = getDeleteButtons().filter(button => !processedButtons.has(button));
      let i = 0;
      // wait for things to resolve for 30 minutes
      while (deleteButtons.length === 0 && i < 300) {
        i++;
        await delay(1000*10); // wait 10 seconds
        window.scrollTo(0, document.body.scrollHeight);
        await delay(0);
        window.scrollTo(0, document.body.scrollHeight);
        await delay(500);
        deleteButtons = getDeleteButtons().filter(button => !processedButtons.has(button));
      }
      // if not resolved go back to the top ofthe loop.
      if  (deleteButtons.length === 0)  continue;
    }
    for (const button of deleteButtons) {
      await delay(1500);
      processedButtons.add(button);
      button.click();
      await delay(750);

      const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
      const deleteOption = menuItems.find(item => item.textContent === 'Delete');

      if (deleteOption) {
        deleteOption.click();
        await delay(750);
        document.querySelector('[data-testid="confirmationSheetConfirm"]')?.click();
      } else {
        const tweetContainer = button.closest('[data-testid="tweet"]');
        const unretweetButton = tweetContainer?.querySelector('[data-testid="unretweet"]');

        if (unretweetButton) {
          unretweetButton.click();
          await delay(750);
          document.querySelector('[data-testid="unretweetConfirm"]')?.click();
        }
      }
    }
  }

  console.log('All tweets deleted successfully!');
};

deleteAllTweets();
```
<img width="813" alt="Screenshot 2023-12-31 at 7 18 45 PM" src="https://github.com/techleadhd/XDelete/assets/61847557/473165c5-9b7c-4065-98fd-5856fcbfb3a8">
