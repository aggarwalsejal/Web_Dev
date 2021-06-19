const puppeteer = require("puppeteer");
const id = "neforar346@0ranges.com";
const pw = "123456789";
let solutions = require("./solutions");
let tab;
let browser;
// puppeteer functions => promisifed functions

// open a browser

let browserOpenPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
});

browserOpenPromise
  .then(function (browserInstance) {
    browser = browserInstance;
    let pagesPromise = browserInstance.pages();
    return pagesPromise; // Promise<Pending>
  })
  .then(function (pages) {
    let page = pages[0];
    tab = page;

    let gotoPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return gotoPromise;
  })
  .then(function () {
    let idTypePromise = tab.type("#input-1", id);
    return idTypePromise;
  })
  .then(function () {
    let pwTypePromise = tab.type("#input-2", pw);
    return pwTypePromise;
  })
  .then(function () {
    let loginPromise = tab.click(".ui-btn.ui-btn-large");
    return loginPromise;
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick("#base-card-1-link", tab);
    return waitAndClickPromise;
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick('a[data-attr1="warmup"]', tab);
    return waitAndClickPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector(
      ".js-track-click.challenge-list-item"
    );
    return waitPromise;
  })
  .then(function () {
    let allATagsPromise = tab.$$(".js-track-click.challenge-list-item");
    return allATagsPromise;
  })
  .then(function (allATags) {
    //[<a href=""></a> , <a ></a> , <a></a> , <a></a> ];
    let allQuesLinksPromise = [];
    for (let i = 0; i < allATags.length; i++) {
      let quesLinkPromise = tab.evaluate(function (elem) {
        return elem.getAttribute("href");
      }, allATags[i]);
      allQuesLinksPromise.push(quesLinkPromise);
    }
    //   allQuesLinkPromise = [ Promise<Pending> , Promise<Pending> , Promise<Pending> , Promise<Pending> ];
    let combinedPromise = Promise.all(allQuesLinksPromise);
    return combinedPromise; //Promise<Pending>
  })
  .then(function(allQuesLinks) {
    let oneQuesSolvePromise = solveQuestion(allQuesLinks[0]);

    for (let i = 1; i < allQuesLinks.length; i++) {
      oneQuesSolvePromise = oneQuesSolvePromise.then(function () {
        let nextQuesSolvePromise = solveQuestion(allQuesLinks[i]);
        return nextQuesSolvePromise;
      });
    }

    return oneQuesSolvePromise;
  })
  .then(function () {
    console.log("All Questions Solved !!");
  })
  .catch(function (err) {
    console.log("Inside catch");
    console.log(err);
  });

function waitAndClick(selector, tab) {
  return new Promise(function (scb, fcb) {
    let waitPromise = tab.waitForSelector(selector, { visible: true });
    waitPromise
      .then(function () {
        let clickPromise = tab.click(selector);
        return clickPromise;
      })
      .then(function () {
        scb();
      })
      .catch(function (error) {
        fcb();
      });
  });
}

function solveQuestion(quesLink) {
  return new Promise(function (scb, fcb) {
    let completeLink = "https://www.hackerrank.com" + quesLink;
    let tab;
    let code;
    let newTabPromise = browser.newPage();
    newTabPromise
      .then(function (newTab) {
        tab = newTab;
        let gotoQuesPromise = tab.goto(completeLink);
        return gotoQuesPromise;
      })
      .then(function () {
        let quesNamePromise = tab.$(".ui-icon-label.page-label");
        return quesNamePromise;
      })
      .then(function (quesNameH1Tag) {
        let quesPromise = tab.evaluate(function (elem) {
          return elem.textContent;
        }, quesNameH1Tag);
        return quesPromise;
      })
      .then(function (quesName) {
        console.log(quesName);
        for (let i = 0; i < solutions.length; i++) {
          if (solutions[i].name == quesName) {
            code = solutions[i].sol;
            break;
          }
        }
        let clickPromise = waitAndClick(".checkbox-input", tab);
        return clickPromise;
      })
      .then(function () {
        let waitPromise = tab.waitForTimeout(1000);
        return waitPromise;
      })
      .then(function () {
        let codeTypePromise = tab.type("#input-1", code);
        return codeTypePromise;
      })
      .then(function () {
        let ctrlKeyDown = tab.keyboard.down("Control");
        return ctrlKeyDown;
      })
      .then(function () {
        let aKeyPress = tab.keyboard.press("a");
        return aKeyPress;
      })
      .then(function () {
        let xkeyPress = tab.keyboard.press("x");
        return xkeyPress;
      })
      .then(function () {
        let codeBoxClickedPromise = tab.click(
          ".monaco-scrollable-element.editor-scrollable.vs"
        );
        return codeBoxClickedPromise;
      })
      .then(function () {
        let aKeyPress = tab.keyboard.press("a");
        return aKeyPress;
      })
      .then(function () {
        let vkeyPress = tab.keyboard.press("v");
        return vkeyPress;
      })
      .then(function () {
        let ctrlKeyUp = tab.keyboard.up("Control");
        return ctrlKeyUp;
      })
      .then(function () {
        let submitBtnClicked = tab.click(
          ".ui-btn.ui-btn-normal.hr-monaco-submit"
        );
        return submitBtnClicked;
      })
      .then(function(){
        return tab.waitForTimeout("5000");
      })
      .then(function () {
        return tab.close();
      })
      .then(function () {
        scb();
      })
      .catch(function (err) {
        fcb(err);
      });
  });
}