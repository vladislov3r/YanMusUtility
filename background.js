chrome.commands.onCommand.addListener((command) => {
  console.log("Получена команда:", command);

  chrome.tabs.query({ url: "https://next.music.yandex.ru/*" }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;

      chrome.scripting.executeScript({
        target: { tabId },
        func: (cmd) => {
          const selectors = {
            next_track: '.SonataControlsDesktop_sonataButton__FTykq[aria-label="Следующая песня"]',  
            previous_track: '.SonataControlsDesktop_sonataButton__FTykq[aria-label="Предыдущая песня"]'
          };

          const button = document.querySelector(selectors[cmd]);
          if (button) {
            button.click();
            console.log(`Кнопка ${cmd} нажата.`);
          } else {
            console.log(`Кнопка ${cmd} не найдена.`);
          }
        },
        args: [command],
      });
    } else {
      console.log("Вкладка с Яндекс.Музыкой не найдена.");
    }
  });
});
