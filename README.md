Forked the original because ChatGPT is crap.
But the basic framework was in place.
Made many algoithm updates.

### How to run:
- Open Chrome and go to your X profile (https://x.com/USERNAME/with_replies)
- Open Chrome Developer Console. Copy/Paste the code:

```js

const deleteAllTweets = async () => {
  const sendESC = async () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {altKey: false,code: "Escape",
        ctrlKey: false, isComposing: false, key: "Escape", location: 0, metaKey: false,
        repeat: false, shiftKey: false, which: 27, charCode: 0,keyCode: 27,
      })
    );
    await delay(500+Math.random()*100);
  };

  const processedButtons = new Set();
  const getDeleteButtons = () => Array.from(document.querySelectorAll('[data-testid="tweet"] [data-testid="caret"]'));
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  while (true) {
    await sendESC();
    await sendESC();
    await sendESC();
    await sendESC();
    let deleteButtons = getDeleteButtons().filter(button => !processedButtons.has(button));
    if (deleteButtons.length === 0) {
      window.scrollTo(0, document.body.scrollHeight);
      await delay(1500+Math.random()*100);
      deleteButtons = getDeleteButtons().filter(button => !processedButtons.has(button));
      let i = 0;
      // wait for things to resolve for 30 minutes
      while (deleteButtons.length === 0 && i < 1000) {
        await sendESC();
        i++;
        await delay(1000*(1+Math.random()*100*i)); // wait scaled by the number of retries
        window.scrollTo(0, 0);
        await delay(500+Math.random()*100);
        window.scrollTo(0, document.body.scrollHeight);
        await delay(500+Math.random()*100);
        deleteButtons = getDeleteButtons().filter(button => !processedButtons.has(button));
      }
      // if not resolved go back to the top ofthe loop.
      if  (deleteButtons.length === 0)  continue;
    }
    for (const button of deleteButtons) {
      await sendESC();
      await delay(1500+Math.random()*100);
      processedButtons.add(button);
      button.click();
      await delay(750+Math.random()*100);

      const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
      const deleteOption = menuItems.find(item => item.textContent === 'Delete');

      if (deleteOption) {
        deleteOption.click();
        await delay(750+Math.random()*100);
        document.querySelector('[data-testid="confirmationSheetConfirm"]')?.click();
        await sendESC();
        await sendESC();
        await sendESC();
      } else {
        const tweetContainer = button.closest('[data-testid="tweet"]');
        const unretweetButton = tweetContainer?.querySelector('[data-testid="unretweet"]');

        if (unretweetButton) {
          unretweetButton.click();
          await delay(750+Math.random()*100);
          document.querySelector('[data-testid="unretweetConfirm"]')?.click();
          await sendESC();
          await sendESC();
          await sendESC();
        }
      }
    }
  }

  console.log('All tweets deleted successfully!');
};

deleteAllTweets();

```
<img width="813" alt="Screenshot 2023-12-31 at 7 18 45 PM" src="https://github.com/techleadhd/XDelete/assets/61847557/473165c5-9b7c-4065-98fd-5856fcbfb3a8">
