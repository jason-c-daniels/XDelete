const deleteAllTweets = async () => {
    const clickRetry = () => {
        var aTags = document.getElementsByTagName("span");
        var searchText = "Retry";
        var found;

        for (var i = 0; i < aTags.length; i++) {
            if (aTags[i].textContent == searchText) {
                found = aTags[i];
                break;
            }
        }
        found?.click();
    }
    const sendESC = async () => {
        window.dispatchEvent(
            new KeyboardEvent("keydown", {altKey: false,code: "Escape",
                ctrlKey: false, isComposing: false, key: "Escape", location: 0, metaKey: false,
                repeat: false, shiftKey: false, which: 27, charCode: 0,keyCode: 27,
            })
        );
        await delay(500+Math.random()*100);
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const numStyle = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 6 });

    while (true) {
        const processedButtons = new Set();
        const getDeleteButtons = () => Array.from(document.querySelectorAll('[data-testid="tweet"] [data-testid="caret"]'));
        await sendESC();
        await sendESC();
        await sendESC();
        await sendESC();
        let deleteButtons = getDeleteButtons().filter(button => !processedButtons.has(button));
        if (deleteButtons.length === 0) {
            clickRetry();
            window.scrollTo(0, document.body.scrollHeight);
            await delay(1500+Math.random()*100);
            deleteButtons = getDeleteButtons().filter(button => !processedButtons.has(button));
            let i = 10;
            // wait for things to resolve for 30 minutes
            while (deleteButtons.length === 0 && i < 100000) {
                await sendESC();
                i++;
                let delayInMs=i*(1000+(Math.random()*100));
                console.log('Waiting ' + numStyle.format(delayInMs) + 'ms before retrying');
                await delay(delayInMs); // wait scaled by the number of retries
                await delay(500+Math.random()*100);
                window.scrollTo(0, document.body.scrollHeight);
                await delay(500+Math.random()*100);
                clickRetry();
                await delay(2000+Math.random()*100);
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
        window.scrollTo(0, document.body.scrollHeight);
    }

    console.log('All tweets deleted successfully!');
};

deleteAllTweets();
