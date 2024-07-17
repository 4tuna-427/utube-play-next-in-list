"use strict";

const regexpPlayPage = new RegExp(".*://.*\\.youtube\\.com/watch\\?.*");
if (regexpPlayPage.test(location.href)) {

    const isPlaylistInDOM = () => {
        return document.querySelector("#playlist");
    }

    const isPlaybackFinished = () => {
        try {
            const playButton = document.querySelector(".ytp-play-button.ytp-button");
            if (!playButton) throw new Error("再生ボタンが存在しません。");

            const titleText = playButton.getAttribute("title");
            if (!titleText) throw new Error("再生ボタンから必要な属性を取得できませんでした。");

            const timeCurrentElement = document.querySelector(".ytp-time-current");
            if (!timeCurrentElement) throw new Error("再生位置が取得できませんでした。");
            const timeCurrent = timeCurrentElement.innerText;

            const timeDurationElement = document.querySelector(".ytp-time-duration");
            if (!timeDurationElement) throw new Error("再生時間が取得できませんでした。");
            const timeDuration = timeDurationElement.innerText;

            return titleText === "もう一回見る" && timeCurrent !== "0:00" && timeCurrent === timeDuration;
        } catch (error) {
            return false;
        }
    }

    const clickNextButton = () => {
        const button = document.querySelector(".ytp-next-button.ytp-button");
        if (button) {
            button.click();
        }
    }

    const observer = new MutationObserver(() => {
        if (isPlaylistInDOM() && isPlaybackFinished()) {
            clickNextButton();
        }
    });

    // 監視処理を開始
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
